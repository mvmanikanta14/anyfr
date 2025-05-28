// const xlsx = require('xlsx');

// const uploadexcel = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     if (!req.body.closing_balance) {
//       return res.status(400).json({ error: 'Column name for closing balance is required' });
//     }

//     const closingBalanceKey = req.body.closing_balance.trim(); // Example: 'CB'

//     // Read the uploaded Excel file
//     const workbook = xlsx.readFile(req.files[0].path);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];

//     const rawData = xlsx.utils.sheet_to_json(worksheet);

//     // Clean the data: trim keys for each row
//     const data = rawData.map(row => {
//       let newRow = {};
//       Object.keys(row).forEach(key => {
//         newRow[key.trim()] = row[key]; // Trim spaces around keys
//       });
//       return newRow;
//     });

//     // Calculate total for the specified closing balance column
//     let totalCB = data.reduce((sum, row) => {
//       const value = parseFloat(row[closingBalanceKey]) || 0;
//       return sum + value;
//     }, 0);

//     // Assuming 'OP' is always the opening balance key
//     let totalOP = data.reduce((sum, row) => {
//       const value = parseFloat(row['OP']) || 0;
//       return sum + value;
//     }, 0);

//     // Round totals to avoid floating point issues
//     totalCB = parseFloat(totalCB.toFixed(2));
//     totalOP = parseFloat(totalOP.toFixed(2));

//     // Check if both totals are zero
//     if (totalCB === 0 && totalOP === 0) {
//       res.json({ success: true, message: "Both CB and OP totals are zero", data });
//     } else {
//       res.json({ 
//         success: false, 
//         message: `Unmatched amounts - ${closingBalanceKey}: ${totalCB}, OP: ${totalOP}`, 
//         data 
//       });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = { uploadexcel };



const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const os = require('os');
const AWS = require('aws-sdk');

const uploadexcel = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        if (!req.body.closing_balance) {
            return res.status(400).json({ error: 'Column name for closing balance is required' });
        }


        entity_id = req.body.entity_id;

        const entity = await req.models.basicParamEntitiesRaw.getById(entity_id);

        if (!entity) {
            return res.status(404).json({ error: "Entity not found." });
        }

        const closingBalanceKey = req.body.closing_balance.trim(); // Example: 'CB'
       

        
        if (!req.user || !req.organisation_id) {
            return res.status(400).json({ error: "Subscriber ID missing in token." });
        }

        organisation_id = req.organisation_id;
        // Read the uploaded Excel file (using the first file in req.files)
        const file = req.files[0];
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const rawData = xlsx.utils.sheet_to_json(worksheet);

        // Clean the data: trim keys for each row so " CB " becomes "CB", " OB " becomes "OB", etc.
        const data = rawData.map(row => {
            let newRow = {};
            Object.keys(row).forEach(key => {
                newRow[key.trim()] = row[key];
            });
            return newRow;
        });



        if (rawData.length === 0) {
            return res.status(400).json({ error: 'The uploaded Excel file is empty' });
          }
      
          // Extract and clean column names from the first row
          const columnNames = Object.keys(rawData[0]).map(col => col.trim());
      
          // Check if the provided column exists in the Excel data
          if (!columnNames.includes(closingBalanceKey)) {
            return res.status(400).json({ error: `Column '${closingBalanceKey}' not found in the uploaded file. Available columns: ${columnNames.join(', ')}` });
          }

        // Calculate the total of the "CB" column (closing balance)
        let totalCB = data.reduce((sum, row) => {
            const value = parseFloat(row[closingBalanceKey]) || 0;
            return sum + value;
        }, 0);

        // Calculate the total of the "OB" column (opening balance)
        // let totalOP = data.reduce((sum, row) => {
        //   const value = parseFloat(row.OB) || 0;
        //   return sum + value;
        // }, 0);

        // Round totals to two decimal places
        totalCB = parseFloat(totalCB.toFixed(2));
        // totalOP = parseFloat(totalOP.toFixed(2));

        // If both totals are zero, upload the same original file to DigitalOcean Spaces
        if (totalCB === 0) {
            // Read bucket configuration from storage.json based on the environment
            const HOME_DIR = os.homedir();
            const S3_DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinstorage", "storage.json");
            const S3_PROD_CONFIG_PATH = "/usr/local/anyfinstorage/storage.json";
            //   let configPath = process.env.NODE_ENV === "development" ? S3_DEV_CONFIG_PATH : S3_PROD_CONFIG_PATH;
            let configPath = S3_DEV_CONFIG_PATH;

            if (!fs.existsSync(configPath)) {
                console.error(`Bucket config file not found: ${configPath}`);
                throw new Error("Bucket configuration file missing");
            }
            const bucketConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

            const spacesEndpoint = new AWS.Endpoint(bucketConfig.DO_SPACES_ENDPOINT); // e.g., 'nyc3.digitaloceanspaces.com'
            const s3 = new AWS.S3({
                endpoint: spacesEndpoint,
                accessKeyId: bucketConfig.DO_SPACES_KEY,
                secretAccessKey: bucketConfig.DO_SPACES_SECRET,
            });

            // Prepare the file stream for upload (using the original file)
            const fileStream = fs.createReadStream(file.path);

            // Create a unique key using the organisation_id as folder.
            // If the folder exists, the file is saved there.
            //   const s3Key = `uploads/${req.organisation_id}/${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`;

            const s3Key = `uploads/${organisation_id}/${entity_id}/${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`;


            const params = {
                Bucket: bucketConfig.DO_SPACES_BUCKET,
                Key: s3Key,
                Body: fileStream,
                ACL: 'public-read' // Make the file publicly accessible
            };

            // Upload the file to DigitalOcean Spaces
            s3.upload(params, (err, uploadData) => {
                if (err) {
                    console.error("Error uploading file:", err);
                    return res.status(500).json({ error: "Error uploading file to Spaces" });
                }
                return res.json({
                    success: true,
                    message: "Closing balance  totals are zero. File uploaded to DigitalOcean Spaces.",
                    url: uploadData.Location,
                    data
                });
            });
        } else {
            // If totals are not zero, return the unmatched amounts and the data
            res.json({
                success: false,
                message: `Unmatched amounts - CB: ${totalCB}`,
                data
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { uploadexcel };


