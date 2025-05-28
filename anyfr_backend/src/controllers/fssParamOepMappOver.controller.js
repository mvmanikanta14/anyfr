   
const createOverride = async (req, res) => {
    try {
      const organisation_id = req.user.org_id;
      const data = { ...req.body, organisation_id };
      const resData = await req.models.FssParamOepMappOverRaw.create(data);
      return res.status(201).json({ message: "Created successfully", resData });
    } catch (err) {
      // Handle unique‐constraint violations
      if (err.name === "SequelizeUniqueConstraintError") {
        // You can inspect err.errors to see which fields failed
        const fields = err.errors.map(e => e.path).join(", ");
        return res
          .status(409) // 409 Conflict
          .json({
            error: "Duplicate mapping",
            message: `A mapping for this already exists (fields: ${fields}).`
          });
      }
      // Fallback for everything else
      console.error("Unexpected error creating override mapping:", err);
      return res
        .status(500)
        .json({ error: "Internal server error" });
    }
  };


  const updateoverride = async (req, res) => {
    try {
      const organisation_id = req.user.org_id;
      const data = { ...req.body, organisation_id };
      const resData = await req.models.FssParamOepMappOverRaw.update(data);

      
      return res.status(201).json({ message: "Created successfully", resData });
    } catch (err) {
      // Handle unique‐constraint violations
      if (err.name === "SequelizeUniqueConstraintError") {
        // You can inspect err.errors to see which fields failed
        const fields = err.errors.map(e => e.path).join(", ");
        return res
          .status(409) // 409 Conflict
          .json({
            error: "Duplicate mapping",
            message: `A mapping for this already exists (fields: ${fields}).`
          });
      }
      // Fallback for everything else
      console.error("Unexpected error creating override mapping:", err);
      return res
        .status(500)
        .json({ error: "Internal server error" });
    }
  };

  const getbyid = async (req, res) => {
    try {

        

        const { entity_id , gl_id } = req.body;

        const organisation_id = req.user.org_id;

        const result = await req.models.FssParamOepMappOverRaw.getAll(entity_id, gl_id , organisation_id);

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
   
    createOverride,
    getbyid,
    updateoverride
   
}