

const getallshare = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;
        const { entity_id , key , value , sortOn ,sortDir} = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.ShareTranOeRegisterRaw.getAll(page, limit, entity_id, organisation_id, key, value, sortOn, sortDir);


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


const createSharecapital = async (req, res) => {


    try {


        const organisation_id = req.user.org_id;

        const Data = {
            ...req.body,
            organisation_id
        };

        const resData = await req.models.ShareTranOeRegisterRaw.create(Data);

        return res.status(201).json({ message: "created successfully", resData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const updateSharecapital = async (req, res) => {
    try {
        const organisation_id = req.user.org_id;

        const Data = {
            ...req.body,
            organisation_id
        };

        const updatedData = await req.models.ShareTranOeRegisterRaw.update(Data);

        return res.status(200).json({ message: "updated successfully", updatedData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteShareCaptial = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMapping = await req.models.ShareTranOeRegisterRaw.softDelete(id);

        if (!deletedMapping) {
            return res.status(404).json({ error: 'Mapping not found.' });
        }

        res.json({ message: 'Mapping deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllTypeOfshare = async (req, res) => {
    try {


        const result = await req.models.ShareTranOeRegisterRaw.getAllTypeOfshare();

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



const getAllClassOfShare = async (req, res) => {
    try {

        const { entity_id } = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.ShareTranOeRegisterRaw.getAllClassOfShare( entity_id, organisation_id);

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



const getAllModeOfIssues = async (req, res) => {
    try {


        const result = await req.models.ShareTranOeRegisterRaw.getAllModeOfIssues();

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



const getAllTypeofConsider = async (req, res) => {
    try {


        const result = await req.models.ShareTranOeRegisterRaw.getAllTypeofConsider();

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAlltypeofshareholder = async (req, res) => {
    try {


        const result = await req.models.ShareTranOeRegisterRaw.getAlltypeofshareholder();

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



const getAllParties = async (req, res) => {
    try {

        const { entity_id } = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.ShareTranOeRegisterRaw.getAllParties( entity_id, organisation_id);

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


  
module.exports = {
    getallshare,
    getAllTypeOfshare,
    getAllClassOfShare,
    getAllModeOfIssues,
    getAllTypeofConsider,
    getAlltypeofshareholder,
    getAllParties,
    createSharecapital,updateSharecapital,deleteShareCaptial

}