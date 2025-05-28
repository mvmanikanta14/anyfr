// Controller for BasicParamOeLocation

// Create new OE Location
const createOeLocation = async (req, res) => {
  try {
    

    const organisation_id = req.user.org_id;

    // Add `organisation_id` to request body before insertion
    const entityData = {
        ...req.body,
        organisation_id
    };


    const newLocation = await req.models.BasicParamOeLocationRaw.create(entityData);

    if (newLocation.status && newLocation.status !== 200 && newLocation.status !== 201) {
      return res.status(newLocation.status).json({
        error: newLocation.error,
        details: newLocation.details
      });
    }

    return res.status(201).json({
      message: "OE Location created successfully",
      data: newLocation
    });
  } catch (error) {
    console.error("Error in createOeLocation:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Edit existing OE Location
const editOeLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

     
    
    const updatedLocation = await req.models.BasicParamOeLocationRaw.edit(id, updateData);
    if (updatedLocation.status && updatedLocation.status !== 200) {
      return res.status(updatedLocation.status).json({
        error: updatedLocation.error,
        details: updatedLocation.details
      });
    }

    return res.status(200).json({
      message: "OE Location updated successfully",
      data: updatedLocation
    });
  } catch (error) {
    console.error("Error in editOeLocation:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get all active OE Locations
const getAllOeLocations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;


    const { entity_id } = req.body;

    // console.log(req.models); // Debugging line
    const result = await req.models.BasicParamOeLocationRaw.getAll(page, limit , entity_id);
    return res.json({
      success: true,
      Page_name: "OE Locations",
      message: "OE Locations fetched successfully",
      ...result
    });
  } catch (error) {
    console.error("Error in getAllOeLocations:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get all inactive OE Locations
const getAllOeLocationsInactive = async (req, res) => {
  try {
    const { entity_id } = req.body;

    const { page = 1, limit = 10 } = req.query;
    const result = await req.models.BasicParamOeLocationRaw.getAllInactive(page, limit ,entity_id);
    return res.json({
      success: true,
      Page_name: "OE Locations (Inactive)",
      message: "Inactive OE Locations fetched successfully",
      ...result
    });
  } catch (error) {
    console.error("Error in getAllOeLocationsInactive:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get a single OE Location by ID
const getOeLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await req.models.BasicParamOeLocationRaw.getById(id);
    if (!location) {
      return res.status(404).json({ error: "OE Location not found." });
    }
    return res.json({
      success: true,
      message: "OE Location fetched successfully",
      data: location
    });
  } catch (error) {
    console.error("Error in getOeLocationById:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Soft delete OE Location
const deleteOeLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await req.models.BasicParamOeLocationRaw.softDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "OE Location not found." });
    }
    return res.json({ message: "OE Location deleted successfully" });
  } catch (error) {
    console.error("Error in deleteOeLocation:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  createOeLocation,
  editOeLocation,
  getAllOeLocations,
  getAllOeLocationsInactive,
  getOeLocationById,
  deleteOeLocation
};
