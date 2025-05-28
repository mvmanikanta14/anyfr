const { getSubdomain } = require('../../subdomainHelper');


const section = async (req, res) => {
    try {
        const { p_org_id, p_entity_id, p_period_id } = req.body;

        const entity = await req.models.SdStorageProcedureRaw.runSd_SP_section(
            p_org_id,
            p_entity_id,
            p_period_id
        );

        return res.status(201).json({ message: "Section add successfully", entity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const sectionQue = async (req, res) => {
    try {
        const { p_org_id, p_entity_id, p_period_id } = req.body;

        const entity = await req.models.SdStorageProcedureRaw.runSd_SP_section_que(
            p_org_id,
            p_entity_id,
            p_period_id
        );

        return res.status(201).json({ message: "Section question add successfully", entity });
    } catch (err) {
        res.status(500).json({ error: err.message });



    }

    
};


const sectionQueList = async (req, res) => {
    try {
        const { org_id, entity_id, period_id } = req.body;

        const entity = await req.models.SdStorageProcedureRaw.SP_section_que_list(
            org_id,
            entity_id,
            period_id
        );

        return res.status(201).json({ message: "Section question add successfully", entity });
    } catch (err) {
        res.status(500).json({ error: err.message });



    }

    

    
};


const sectionList = async (req, res) => {
    try {
        const { org_id, entity_id, period_id } = req.body;

        const entity = await req.models.SdStorageProcedureRaw.SP_section_list(
            org_id,
            entity_id,
            period_id
        );

        return res.status(201).json({ message: "Section list", entity });
    } catch (err) {
        res.status(500).json({ error: err.message });



    }

    

    
};

const section_que_res = async (req, res) => {
    try {
        if (!req.models || !req.models.SdStorageProcedureRaw) {
            throw new Error("Model SdStorageProcedureRaw is missing in req.models");
        }

        const { id } = req.params;
        const { user_response } = req.body;

        const queRes = req.models.SdStorageProcedureRaw;
        const result = await queRes.section_que_res(id, { user_response });

        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

 


 

module.exports = {

    section,
    sectionQue,
    sectionQueList,
    sectionList,
    section_que_res
};