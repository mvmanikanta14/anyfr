const {getSubdomain} = require("../../subdomainHelper");


const createorganisation = async (req, res) => {
        try {

            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({ error: "Name and email are required." });
            }
            if (!req.models || !req.models.BasicParamorganisationRaw) {
                throw new Error("Model organisation is missing in req.models");
            }

            const basicParamorganisationRaw = req.models.BasicParamorganisationRaw;

            const result = await basicParamorganisationRaw.create({ name, email });

            res.json({ success: true, message: "organisation created successfully", data: result });
        } catch (err) {
            console.error("❌ Error creating organisation:", err);
            res.status(500).json({ error: err.message });
        }
    }

const getAllorganisation = async (req, res) => {
    try {
        

        if (!req.models || !req.models.BasicParamorganisationRaw) {
            throw new Error("Model organisation is missing in req.models");
        }
        const basicParamorganisationRaw = req.models.BasicParamorganisationRaw;
        const data = await basicParamorganisationRaw.getAll();
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
    


module.exports = {
    createorganisation,
    getAllorganisation
     
};
