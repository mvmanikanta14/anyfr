

const getalltbbatch = async (req, res) => {
    try {

        const { entity_id, location_id , period_id } = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.FssParamOeplTbBatchRaw.getAll(entity_id, organisation_id, period_id);
        res.json({
            success: true,
            message: "success",
            Page_name: "",
            ...result
        });
    } catch (err) {
        console.error("  Error in getAll:", err);
        res.status(500).json({ error: err.message });
    }
};

const getallinactivetbbatch = async (req, res) => {
    try {

        const { entity_id, location_id , period_id } = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.FssParamOeplTbBatchRaw.getAllInactive(entity_id, organisation_id, period_id);
        res.json({
            success: true,
            message: "success",
            Page_name: "",
            ...result
        });
    } catch (err) {
        console.error("  Error in getAll:", err);
        res.status(500).json({ error: err.message });
    }
};



const getlocbyentity = async (req, res) => {
    try {

        const { entity_id,  } = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.FssParamOeplTbBatchRaw.getlocbyentity(entity_id, organisation_id);
        res.json({
            success: true,
            message: "success",
            Page_name: "",
            ...result
        });
    } catch (err) {
        console.error("  Error in getAll:", err);
        res.status(500).json({ error: err.message });
    }
};



const updatetbbatch = async (req, res) => {
    try {
        const organisation_id = req.user.org_id;

        const Data = {
            ...req.body,
            organisation_id
        };

        const updatedData = await req.models.FssParamOeplTbBatchRaw.update(Data);

        return res.status(200).json({ message: "updated successfully", updatedData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const createbatch = async (req, res) => {


    try {


        const organisation_id = req.user.org_id;

        const Data = {
            ...req.body,
            organisation_id
        };

        const resData = await req.models.FssParamOeplTbBatchRaw.createBatch(Data);

        return res.status(201).json({ message: "created successfully", resData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createbatch,
    getalltbbatch,
    getlocbyentity,
    updatetbbatch,
    getallinactivetbbatch
}