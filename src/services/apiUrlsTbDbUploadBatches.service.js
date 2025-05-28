
//const BASE_URL = "http://localhost:3100"; // ✅ Backend server
const DOWNLOAD_URL = process.env.REACT_APP_API_URL || 'http://localhost:3100'; 
class ApiUrlsTbDbUploadBatchesService {
    //getAllAssetsDepnList = "/module_assets_depn/list";
    getAllUnloadedTBDBList = "/data_tbdb/list";
    getAllUnloadedTBDBListUnloaded = "/data_tbdb/unloaded";
    LoadTBExcelByBatchId = "/data_tbdb/loadtbexcelbybatchid";
    UnLoadTBExcelByBatchId = "/data_tbdb/unloadtbexcelbybatchid";
    //getCategoryDropDown ="/module_assets_depn/category-dropdown";
   // getSubCategoryDropDown ="/module_assets_depn/subcategory-dropdown";
   // getBlockDropDown ="/module_assets_depn/block-dropdown";
    getAllLocationDropdown="/fssparamoepltbbatch/loc-dropdowm"
    addAssetsDepn="/module_assets_depn/createassetsDepn";
    updateAssetsDepn="/module_assets_depn/updateassetsDepn"; 
    deleteAssetsDepn="/module_assets_depn/deleteAssetsDepn"; 
    uploadexcelTb="/data_tbdb_upload/uploadexceltb";
    uploadexcelDb="/data_tbdb_upload/uploadexceldb";
    //downloadsamplefile="/module_assets_depn/downloadsamplefile";
    downloadsamplefile = `${DOWNLOAD_URL}/module_assets_depn/downloadsamplefile`; 
}




export default new ApiUrlsTbDbUploadBatchesService();
