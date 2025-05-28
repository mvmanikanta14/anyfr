 
const getAllReportingPeriods = async (req, res) => {
  try {
   

    const result = await req.models.BasicMastPeriodsRaw.getAll();

    res.json({
      success: true,
      Page_name: "Reporting Period",
      message: "Reporting periods fetched successfully",
      ...result
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

 

module.exports = {
  
  getAllReportingPeriods,
 
};
