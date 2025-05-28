class ApiUrlModulesService {


    //madhukant start

    getAllshareRegisterList = "/sharetranoeregister/list";

    getAlltypeofsharedrop = "/sharetranoeregister/list/typeofshare";
    getAllmodeofissuesdrop = "/sharetranoeregister/list/modeofissues";
    getAllClassofsharedrop = "/sharetranoeregister/list/classofShare";
    getAlltypeofconsiderdrop = "/sharetranoeregister/list/typeofconsider";
    getAlltypeofshareholderdrop = "/sharetranoeregister/list/typeofshareholder";
    getAllshareholderdrop = "/sharetranoeregister/list/parties";
    addsharecaptial = "/sharetranoeregister/create";
    editsharecaptial = "/sharetranoeregister/edit";
    deletesharecaptial = "/sharetranoeregister/delete";
    addClassofShare = "/shareparamclassofshares/create";



    getAllArapAptranInvList = "/arapaptraninvoices/list";
    addArapAptranInvList = "/arapaptraninvoices/create";
    editArapAptranInvList = "/arapaptraninvoices/edit";
    deleteArapAptranInvList = "/arapaptraninvoices/delete";


    getAllArapArtranInvList = "/arapartraninvoices/list";
    addArapArtranInvList = "/arapartraninvoices/create";
    editArapArtranInvList = "/arapartraninvoices/edit";
    deleteArapArtranInvList = "/arapartraninvoices/delete";

    getAllArapAdvptranInvList = "/arapadvptraninvoices/list";
    addArapAdvptranInvList = "/arapadvptraninvoices/create";
    editArapAdvptranInvList = "/arapadvptraninvoices/edit";
    deleteArapAdvptranInvList = "/arapadvptraninvoices/delete";

    getAllArapAdvrtranInvList = "/arapadvrtraninvoices/list";
    addArapAdvrtranInvList = "/arapadvrtraninvoices/create";
    editArapAdvrtranInvList = "/arapadvrtraninvoices/edit";
    deleteArapAdvrtranInvList = "/arapadvrtraninvoices/delete";



    getAllArapTranSettleDrop = "/araptransettlement/list/refdrop";
    addArapTranSettle = "/araptransettlement/create";
    editArapTranSettle = "/araptransettlement/edit";
    getAllArapTranSettle = "/araptransettlement/list";

    getAllmovement = "/modules/inv-mov";
    getAllmovementpy = "/modules/inv-py";
    getAllmovementct = "/modules/inv-ct";
    getAllmovementforex = "/modules/forex";
    getAllmovementmtm = "/modules/inv-mtm";
    getAllmovementexpenses = "/modules/exp";




















    //madhukant end

    getAllInvestmentRegisterList = "/module_investment_register/list";
    getInstrumentsDropDown ="/module_investment_register/instrument-types-dropdown";
    getMeasurementDropDown ="/module_investment_register/measurement-types-dropdown";
    getInvesteeTypesDropDown ="/module_investment_register/investee-types-dropdown";

    inactiveInvestmentRegisterItem ="/module_investment_register/investee-types-dropdown";
    activeInvestmentRegisterItem ="/module_investment_register/investee-types-dropdown";

    addInvestmentRegister="/module_investment_register/create";
    editInvestmentRegister="/module_investment_register/edit"; 
    deleteInvestmentRegister="/module_investment_register/delete"; 
}




export default new ApiUrlModulesService();
