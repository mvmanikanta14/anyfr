
const getallinvoice = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { entity_id, key, value, sortOn, sortDir } = req.body;
      const organisation_id = req.user.org_id;
  
      const result = await req.models.ArapAdvpTranInvoicesRaw.getAll(
        page,
        limit,
        entity_id,
        organisation_id,
        key,
        value,
        sortOn,
        sortDir
      );
  
      res.json({
        success: true,
        message: 'success',
        Page_name: '',
        ...result,
      });
    } catch (err) {
      console.error('Error in getAllInvoices:', err);
      res.status(500).json({ error: err.message });
    }
  };
  
  const createInvoice = async (req, res) => {
    try {
      const organisation_id = req.user.org_id;
      const data = { ...req.body, organisation_id };
  
      const resData = await req.models.ArapAdvpTranInvoicesRaw.create(data);
      return res.status(201).json({ message: 'created successfully', resData });
    } catch (err) {
      console.error('Error in createInvoice:', err);
      res.status(500).json({ error: err.message });
    }
  };
  
  const updateInvoice = async (req, res) => {
    try {
      const organisation_id = req.user.org_id;
      const data = { ...req.body, organisation_id };
  
      const updatedData = await req.models.ArapAdvpTranInvoicesRaw.update(data);
      return res.status(200).json({ message: 'updated successfully', updatedData });
    } catch (err) {
      console.error('Error in updateInvoice:', err);
      res.status(500).json({ error: err.message });
    }
  };
  
  const deleteInvoice = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await req.models.ArapAdvpTranInvoicesRaw.softDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ error: 'Invoice not found.' });
      }
      res.json({ message: 'Invoice deleted successfully' });
    } catch (err) {
      console.error('Error in deleteInvoice:', err);
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = {
    getallinvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  };
  