

const getalloefsli = async (req, res) => {
    try {

        const { entity_id, framework_id } = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.FssParamOeFsliRaw.getAll(entity_id, framework_id, organisation_id);
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

const getalloefslipa = async (req, res) => {
    try {

        const organisation_id = req.user.org_id;

        const { entity_id, falling_under } = req.body;

        const result = await req.models.FssParamOeFsliRaw.getAllpa(entity_id, falling_under, organisation_id);
        res.json({
            success: true,
            message: "success",
            Page_name: "",
            ...result
        });
    } catch (err) {
        console.error("  Error in getAllpa:", err);
        res.status(500).json({ error: err.message });
    }
};



const updatefsli = async (req, res) => {
    try {
        const organisation_id = req.user.org_id;

        const Data = {
            ...req.body,
            organisation_id
        };

        const updatedData = await req.models.FssParamOeFsliRaw.update(Data);

        return res.status(200).json({ message: "updated successfully", updatedData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const createfsli = async (req, res) => {


    try {


        const organisation_id = req.user.org_id;

        const Data = {
            ...req.body,
            organisation_id
        };

        const resData = await req.models.FssParamOeFsliRaw.create(Data);

        return res.status(201).json({ message: "created successfully", resData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getalloefsli,
    createfsli,
    getalloefslipa,
    updatefsli
}