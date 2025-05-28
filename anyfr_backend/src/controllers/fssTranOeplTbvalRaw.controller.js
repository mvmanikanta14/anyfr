

const getalltbval = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;

        const { entity_id, batch_id , period_id , key , value , sortOn ,sortDir} = req.body;

        const organisation_id = req.user.org_id;

       
        const result = await req.models.FssTranOeplTbvalRaw.getAllbybatch( page, limit, entity_id, batch_id, organisation_id, period_id,key, value, sortOn, sortDir);
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



const updatetbval = async (req, res) => {
    try {
        const organisation_id = req.user.org_id;

        const Data = {
            ...req.body,
            organisation_id
        };

        const updatedData = await req.models.FssTranOeplTbvalRaw.updateValue(Data);

        return res.status(200).json({ message: "updated successfully", updatedData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const createtbval = async (req, res) => {


    try {


        const organisation_id = req.user.org_id;

        const Data = {
            ...req.body,
            organisation_id
        };

        const resData = await req.models.FssTranOeplTbvalRaw.createValue(Data);

        return res.status(201).json({ message: "created successfully", resData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createtbval,
    updatetbval,
    getalltbval
}