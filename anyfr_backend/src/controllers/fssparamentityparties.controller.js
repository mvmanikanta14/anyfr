const { getSubdomain } = require('../../subdomainHelper');

const getAllFssParamEntityParties = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityPartiesRaw) {
            throw new Error("Model FssParamEntityPartiesRaw is missing in req.models");
        }

        const FssParamEntityPartiesRawInstance = req.models.FssParamEntityPartiesRaw;

        const data = await FssParamEntityPartiesRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// router.post('/create', async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req);

//         if (!req.models || !req.models.FssParamEntityPartiesRaw) {
//             throw new Error("Model FssParamEntityPartiesRaw is missing in req.models");
//         }

//         const { entity_id, party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active, created_by } = req.body;
//         if (!entity_id || !party_name || !created_by) {
//             return res.status(400).json({ success: false, error: "Missing required fields" });
//         }

//         const FssParamEntityPartiesRawInstance = req.models.FssParamEntityPartiesRaw;
//         const newParty = await FssParamEntityPartiesRawInstance.create({ entity_id, party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active, created_by });

//         res.json({ success: true, data: newParty });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

const createFssParamEntityParties = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityPartiesRaw) {
            throw new Error("Model FssParamEntityPartiesRaw is missing in req.models");
        }

        let { entity_id, party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active, created_by } = req.body;
        if (!entity_id || !party_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        // 👇 Ensure gl_id is NULL if is_gl is false
        gl_id = is_gl ? gl_id : null; // Ensure gl_id is explicitly null when is_gl is false


        const FssParamEntityPartiesRawInstance = req.models.FssParamEntityPartiesRaw;
        const newParty = await FssParamEntityPartiesRawInstance.create({
            entity_id, party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active, created_by
        });

        res.json({ success: true, data: newParty });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


// 🔹 **Edit Party (PUT)**
// router.put('/edit/:id', async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req);

//         if (!req.models || !req.models.FssParamEntityPartiesRaw) {
//             throw new Error("Model FssParamEntityPartiesRaw is missing in req.models");
//         }

//         const { id } = req.params;
//         const { party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active } = req.body;

//         if (!party_name) {
//             return res.status(400).json({ success: false, error: "Missing required fields" });
//         }

//         const FssParamEntityPartiesRawInstance = req.models.FssParamEntityPartiesRaw;
//         const updatedParty = await FssParamEntityPartiesRawInstance.edit(id, { party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active });

//         res.json({ success: true, data: updatedParty });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

const editFssParamEntityParties = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityPartiesRaw) {
            throw new Error("Model FssParamEntityPartiesRaw is missing in req.models");
        }

        const { id } = req.params;
        let { party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active } = req.body;

        if (!party_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        // 👇 Ensure gl_id is NULL if is_gl is false
        gl_id = is_gl ? gl_id : null; // Ensure gl_id is explicitly null when is_gl is false

        const FssParamEntityPartiesRawInstance = req.models.FssParamEntityPartiesRaw;
        const updatedParty = await FssParamEntityPartiesRawInstance.edit(id, {
            party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active
        });

        res.json({ success: true, data: updatedParty });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


// 🔹 **Delete Party (Soft Delete)**
const deleteFssParamEntityParties = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityPartiesRaw) {
            throw new Error("Model FssParamEntityPartiesRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssParamEntityPartiesRawInstance = req.models.FssParamEntityPartiesRaw;
        const deletedParty = await FssParamEntityPartiesRawInstance.softDelete(id);

        res.json({ success: true, data: deletedParty });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Search Party**
const searchFssParamEntityParties = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityPartiesRaw) {
            throw new Error("Model FssParamEntityPartiesRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssParamEntityPartiesRawInstance = req.models.FssParamEntityPartiesRaw;
        const searchResults = await FssParamEntityPartiesRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const truncateFssParamEntityParties = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityPartiesRaw) {
            throw new Error("Model FssParamEntityPartiesRaw is missing in req.models");
        }

        const FssParamEntityPartiesRaw = req.models.FssParamEntityPartiesRaw;

        await FssParamEntityPartiesRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssParamEntityParties,
    createFssParamEntityParties,
    editFssParamEntityParties,
    deleteFssParamEntityParties,
    searchFssParamEntityParties,
    truncateFssParamEntityParties,
};