const getAllShareParamClassOfShare = async (req, res) => {
    try {
        if (!req.models || !req.models.ShareParamClassOfSharesRaw) {
            throw new Error("Model ShareParamClassOfSharesRaw is missing in req.models");
        }

        const { page = 1, limit = 10 } = req.query;

        const organisation_id = req.user.org_id;


        const { entity_id } = req.body;


        const data = await req.models.ShareParamClassOfSharesRaw.getAll(page,limit , entity_id,organisation_id);
        

        res.json({
            success: true,
            message: "success",
            Page_name: "",
            ...data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createShareParamClassOfShare = async (req, res) => {
    try {

        const organisation_id = req.user.org_id;

        

        if (!req.models || !req.models.ShareParamClassOfSharesRaw) {
            throw new Error("Model ShareParamClassOfSharesRaw is missing in req.models");
        }

        const { entity_id, type_of_share_id, class_of_share_name, created_by } = req.body;
        const newEntry = await req.models.ShareParamClassOfSharesRaw.create({ entity_id, type_of_share_id, class_of_share_name, created_by, organisation_id });
        res.json({ success: true, data: newEntry });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const editShareParamClassOfShare = async (req, res) => {
    try {
        if (!req.models || !req.models.ShareParamClassOfSharesRaw) {
            throw new Error("Model ShareParamClassOfSharesRaw is missing in req.models");
        }

        const { id } = req.params;
        const { class_of_share_name } = req.body;
        const updatedEntry = await req.models.ShareParamClassOfSharesRaw.edit(id, { class_of_share_name });
        res.json({ success: true, data: updatedEntry });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const deleteShareParamClassOfShare = async (req, res) => {
    try {
        if (!req.models || !req.models.ShareParamClassOfSharesRaw) {
            throw new Error("Model ShareParamClassOfSharesRaw is missing in req.models");
        }

        const { id } = req.params;
        const deletedEntry = await req.models.ShareParamClassOfSharesRaw.softDelete(id);
        res.json({ success: true, data: deletedEntry });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchShareParamClassOfShare = async (req, res) => {
    try {
        if (!req.models || !req.models.ShareParamClassOfSharesRaw) {
            throw new Error("Model ShareParamClassOfSharesRaw is missing in req.models");
        }

        const searchResults = await req.models.ShareParamClassOfSharesRaw.search(req.query.query);
        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = {
    getAllShareParamClassOfShare,
    createShareParamClassOfShare,
    editShareParamClassOfShare,
    deleteShareParamClassOfShare,
    searchShareParamClassOfShare,
};