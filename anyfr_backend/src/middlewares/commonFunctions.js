const { QueryTypes } = require('sequelize');
const {sequelize} = require('../config/database');

async function checkActivityApprovers (req,res,next){
    try{
        const activityId = req.params.activityId;
        const [products] = sequelize.query("select * from products where category_id = ?",{
            replacements:[activityId],
            type:sequelize.QueryTypes.SELECT,
        });
        if (approvers.length === 0) {
            return res.status(404).json({ error: `No approvers found for activity ID ${activityId}` });
          }
      
        req.products = products; 
        next(); 

    }catch(error){
       console.log("Error in fetching approvers",error);
       res.status(500).json({error:'Internal server error'});
    }
}

async function insertFssClientLevel(client_id, fss_framework) {
    try {
        console.log("Client ID:", client_id);
        console.log("FSS Framework ID:", fss_framework);
        if (client_id && fss_framework) {
            // Check if fss_framework exists in fss_heads
            const [fssHead] = await sequelize.query(
                'SELECT * FROM fss_heads WHERE id = :fss_framework',
                {
                    replacements: { fss_framework },
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            if (!fssHead) {
                console.log("FSS Head not found.");
                return; // Exit if fss_head not found
            }

            console.log("FSS Head found:", fssHead);

            // Fetch related records from fss_masters
            const fssMasters = await sequelize.query(
                'SELECT * FROM fss_masters WHERE fss_head_id = :fss_framework',
                {
                    replacements: { fss_framework },
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            if (fssMasters.length === 0) {
                console.log("No related FSS Masters found.");
                return; // Exit if no fss_masters found
            }

            console.log("FSS Masters found:", fssMasters);

            // Insert records into fss_client_level
            for (const master of fssMasters) {
                const [existingRecord] = await sequelize.query(
                    `SELECT * FROM fss_client_level 
                    WHERE client_id = :client_id 
                    AND fss_head_id = :fss_head_id 
                    AND master_link_id = :master_link_id`,
                    {
                        replacements: {
                            client_id: client_id,
                            fss_head_id: fss_framework,
                            master_link_id: master.id
                        },
                        type: sequelize.QueryTypes.SELECT,
                    }
                );

                // If a record already exists, skip the insertion
                if (existingRecord) {
                    console.log("Record already exists, skipping insert for:", master.id);
                    continue; // Skip to the next iteration in the loop
                }
                await sequelize.query(
                    `INSERT INTO fss_client_level 
                    (fss_head_id, client_id, short_name, full_name, major_id, minor_id, polarity, node_level, node_sequence, node_code,master_link_id) 
                    VALUES (:fss_head_id, :client_id, :short_name, :full_name, :major_id, :minor_id, :polarity, :node_level, :node_sequence, :node_code,:master_link_id)`,
                    {
                        replacements: {
                            fss_head_id: fss_framework,
                            client_id: client_id,
                            short_name: master.short_name,
                            full_name: master.full_name,
                            major_id: master.major_id,
                            minor_id: master.minor_id,
                            polarity: master.polarity,
                            node_level: master.node_level,
                            node_sequence: master.node_sequence || null, // Handle missing values
                            node_code: master.node_code || null, // Handle missing values
                            master_link_id:master.id
                        },
                        type: sequelize.QueryTypes.INSERT,
                    }
                );
            }

            console.log("Records inserted into fss_client_level.");
        }
    } catch (error) {
        console.error("Error in insertFssClientLevel:", error);
    }
}

module.exports = {
    checkActivityApprovers,insertFssClientLevel
}