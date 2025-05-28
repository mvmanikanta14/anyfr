const {getSubdomain} = require("../../subdomainHelper");


const createSubscriber = async (req, res) => {
        try {

            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({ error: "Name and email are required." });
            }
            if (!req.models || !req.models.SubscribersRaw) {
                throw new Error("Model ShareParamModeOfIssuesRaw is missing in req.models");
            }

            const SubscribersRaw = req.models.SubscribersRaw;

            const result = await SubscribersRaw.create({ name, email });

            res.json({ success: true, message: "Subscriber created successfully", data: result });
        } catch (err) {
            console.error("❌ Error creating subscriber:", err);
            res.status(500).json({ error: err.message });
        }
    }

const getAllSubscriber = async (req, res) => {
    try {
        

        if (!req.models || !req.models.SubscribersRaw) {
            throw new Error("Model ShareParamModeOfIssuesRaw is missing in req.models");
        }
        const SubscribersRaw = req.models.SubscribersRaw;
        const data = await SubscribersRaw.getAll();
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
    


module.exports = {
    createSubscriber,
    getAllSubscriber
     
};
