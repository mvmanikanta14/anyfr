const { getSequelizeInstance } = require('../config/database');
const bcrypt = require('bcryptjs');

// Import Models
const UserModel = require('./user.model');
const InvestmentModel = require('./Investment');


// Start 16 Modules
const basicMasterUsersModel = require('./basicMasterUsersOrm');
// const basicMasterUsersRawModel = require('./basicMasterUsersRaw');
const basicMasterUsersRawDBService = require('../services/dbServices/basicMasterUsersRaw');

// const basicMastFinancialFrameworkModel = require('./basicMastFinancialFrameworkOrm');
// // const basicMastFinancialFrameworkRawModel = require('./basicMastFinancialFrameworkRaw');
// const basicMastFinancialFrameworkRawDBService = require('../services/dbServices/basicMastFinancialFrameworkRaw');

const basicMastModulesModel = require('./basicMastModulesOrm');
// const basicMastModulesRawModel = require('./basicMastModulesRaw');
const basicMastModulesRawDBService = require('../services/dbServices/basicMastModulesRaw');

const basicParamEntitiesModel = require('./basicParamEntitiesOrm');
// const basicParamEntitiesRawModel = require('./basicParamEntitiesRaw');
const basicParamEntitiesRawDBService = require('../services/dbServices/basicParamEntitiesRaw');


const BasicParamOePeriodOrmModel = require('./basicParamOePeriodOrm');

const BasicParamOePeriodRawService = require('../services/dbServices/basicParamOePeriodRaw');


const BasicMastPeriodsOrmModel = require('./basicMastPeriodsOrm');

const BasicMastPeriodsRawService = require('../services/dbServices/basicMastPeriodsRaw');

const BasicParamOeLocationModel = require('./basicParamOeLocationOrm');

const BasicParamOeLocationRawService = require('../services/dbServices/basicParamOeLocationRaw');

const basicParamEntityGroupsModel = require('./basicParamEntityGroupsOrm');
// const basicParamEntityGroupsRawModel = require('./basicParamEntityGroupsRaw');
const basicParamEntityGroupsRawDBService = require('../services/dbServices/basicParamEntityGroupsRaw');

const basicParamEntityGSTINModel = require('./basicParamEntityGSTINOrm');
// const basicParamEntityGSTINRawModel = require('./basicParamEntityGSTINRaw');
const basicParamEntityGSTINRawDBService = require('../services/dbServices/basicParamEntityGSTINRaw');

const basicParamEntityLocationsModel = require('./basicParamEntityLocationsOrm');
// const basicParamEntityLocationsRawModel = require('./basicParamEntityLocationsRaw');
const basicParamEntityLocationsRawDBService = require('../services/dbServices/basicParamEntityLocationsRaw');

const basicParamEntityTANModel = require('./basicParamEntityTANOrm');
// const basicParamEntityTANRawModel = require('./basicParamEntityTANRaw');
const basicParamEntityTANRawDBService = require('../services/dbServices/basicParamEntityTANRaw');

const basicParamReportingPrintModel = require('./basicParamReportingPrintOrm');
// const basicParamReportingPrintRawModel = require('./basicParamReportingPrintRaw');
const basicParamReportingPrintRawDBService = require('../services/dbServices/basicParamReportingPrintRaw');




const basicParamReportingStyleModel = require('./basicParamReportingStyleOrm');

// const basicParamReportingStyleRawModel = require('./basicParamReportingStyleRaw');
const basicParamReportingStyleRawDBService = require('../services/dbServices/basicParamReportingStyleRaw');

const basicTranSubscriptionFrameworksModel = require('./basicTranSubscriptionFrameworksOrm');
// const basicTranSubscriptionFrameworksRawModel = require('./basicTranSubscriptionFrameworksRaw');
const basicTranSubscriptionFrameworksRawDBService = require('../services/dbServices/basicTranSubscriptionFrameworksRaw');

const basicTranSubscriptionModulesModel = require('./basicTranSubscriptionModulesOrm');
// const basicTranSubscriptionModulesRawModel = require('./basicTranSubscriptionModulesRaw');
const basicTranSubscriptionModulesRawDBService = require('../services/dbServices/basicTranSubscriptionModulesRaw');

const basicTranSubscriptionsModel = require('./basicTranSubscriptionsOrm');
// const basicTranSubscriptionsRawModel = require('./basicTranSubscriptionsRaw');
const basicTranSubscriptionsRawDBService = require('../services/dbServices/basicTranSubscriptionsRaw');

const paramsEntityGroupDetailsModel = require('./paramsEntityGroupDetailsOrm');
// const paramsEntityGroupDetailsRawModel = require('./paramsEntityGroupDetailsRaw');
const paramsEntityGroupDetailsRawDBService = require('../services/dbServices/paramsEntityGroupDetailsRaw');

const paramsEntityReportingPeriodModel = require('./paramsEntityReportingPeriodOrm');
// const paramsEntityReportingPeriodRawModel = require('./paramsEntityReportingPeriodRaw');
const paramsEntityReportingPeriodRawDBService = require('../services/dbServices/paramsEntityReportingPeriodRaw');

const basicmastfontsModel = require('./basicmastfontsOrm');
// const basicmastfontsRawModel = require('./basicmastfontsRaw');
const basicmastfontsRawDBService = require('../services/dbServices/basicmastfontsRaw');


const DocumentsModel = require('./DocumentsOrm');
// const DocumentsRawModel = require('./DocumentsRaw');
const DocumentsRawDBService = require('../services/dbServices/DocumentsRaw');



const SubscribersModel = require('./SubscribersOrm');
// const DocumentsRawModel = require('./DocumentsRaw');
const SubscribersRawDBService = require('../services/dbServices/SubscribersRaw');



const BasicParamOrganisationModel = require('./basicParamOrganisationOrm');
// const DocumentsRawModel = require('./DocumentsRaw');
const BasicParamOrganisationRawDBService = require('../services/dbServices/basicParamOrganisationRaw');

const SdStorageProcedureRawDBService = require('../services/dbServices/SdStorageProcedureRaw');

const GeolocationModel = require('./GeolocationOrm');
// const GeolocationRawModel = require('./GeolocationRaw');
const GeolocationRawDBService = require('../services/dbServices/GeolocationRaw');

const ShareMasterTypeofSharesModel = require('./shareMasterTypeofSharesOrm');
// const ShareMasterTypeOfSharesRawModel = require('./shareMasterTypeOfSharesRaw');
const ShareMasterTypeOfSharesRawDBService = require('../services/dbServices/shareMasterTypeOfSharesRaw');

const ShareParamModeOfIssueModel = require('./ShareParamModeOfIssueOrm');
// const ShareParamModeOfIssuesRawModel = require('./ShareParamModeOfIssuesRaw');
const ShareParamModeOfIssuesRawDBService = require('../services/dbServices/ShareParamModeOfIssuesRaw');

const ShareParamClassOfSharesModel = require('./ShareParamClassOfSharesOrm');
// const ShareParamClassOfSharesRawModel = require('./ShareParamClassOfSharesRaw');
const ShareParamClassOfSharesRawDBService = require('../services/dbServices/ShareParamClassOfSharesRaw');


const FssMastCoreLineMasterModel = require('./FssMastCoreLineMasterOrm');
// const FssMastCoreLineMasterRawModel = require('./FssMastCoreLineMasterRaw');
const FssMastCoreLineMasterRawDBService = require('../services/dbServices/FssMastCoreLineMasterRaw');

const FssMastFinancialFrameworkModel = require('./FssMastFinancialFrameworkOrm');
// const FssMastFinancialFrameworkRawModel = require('./FssMastFinancialFrameworkRaw');
const FssMastFinancialFrameworkRawDBService = require('../services/dbServices/FssMastFinancialFrameworkRaw');

const FssMastLineMasterModel = require('./FssMastLineMasterOrm');
// const FssMastLineMasterRawModel = require('./FssMastLineMasterRaw');
const FssMastLineMasterRawDBService = require('../services/dbServices/FssMastLineMasterRaw');


const FssMastPartyTypesModel = require('./FssMastPartyTypesOrm');
const FssMastPartyTypesRawDBService = require('../services/dbServices/FssMastPartyTypesRaw');


const BasicParamModulesModel = require('./basicParamModulesOrm');
const BasicParamModulesRawDBService = require('../services/dbServices/basicParamModulesRaw');


const FssMastPartyRelationshipTypesModel = require('./FssMastPartyRelationshipTypesOrm');
const FssMastPartyRelationshipTypesRawDBService = require('../services/dbServices/FssMastPartyRelationshipTypesRaw');

const FssMastUnitTypesModel = require('./FssMastUnitTypesOrm');
// const FssMastUnitTypesRawModel = require('./FssMastUnitTypesRaw');
const FssMastUnitTypesRawDBService = require('../services/dbServices/FssMastUnitTypesRaw');

const FssMastUnitsOfMeasurementModel = require('./FssMastUnitsOfMeasurementOrm');
// const FssMastUnitsOfMeasurementRawModel = require('./FssMastUnitsOfMeasurementRaw');
const FssMastUnitsOfMeasurementRawDBService = require('../services/dbServices/FssMastUnitsOfMeasurementRaw');

const FssMastVoucherTypesModel = require('./FssMastVoucherTypesOrm');
// const FssMastVoucherTypesRawModel = require('./FssMastVoucherTypesRaw');
const FssMastVoucherTypesRawDBService = require('../services/dbServices/FssMastVoucherTypesRaw');

const FssParamEntityLineMasterModel = require('./FssParamEntityLineMasterOrm');
// const FssParamEntityLineMasterRawModel = require('./FssParamEntityLineMasterRaw');
const FssParamEntityLineMasterRawDBService = require('../services/dbServices/FssParamEntityLineMasterRaw');

const FssParamEntityGlsModel = require('./FssParamEntityGlsOrm');
// const FssParamEntityGlsRawModel = require('./FssParamEntityGlsRaw');
const FssParamEntityGlsRawDBService = require('../services/dbServices/FssParamEntityGlsRaw');

const FssParamEntityPartiesModel = require('./FssParamEntityPartiesOrm');
// const FssParamEntityPartiesRawModel = require('./FssParamEntityPartiesRaw');
const FssParamEntityPartiesRawDBService = require('../services/dbServices/FssParamEntityPartiesRaw');


const FssParanEntityPartyRelationsModel = require('./FssParanEntityPartyRelationsOrm');
// const FssParanEntityPartyRelationsRawModel = require('./FssParanEntityPartyRelationsRaw');
const FssParanEntityPartyRelationsRawDBService = require('../services/dbServices/FssParanEntityPartyRelationsRaw');


const FssParamEntitiesProductsModel = require('./FssParamEntitiesProductsOrm');
// const FssParamEntitiesProductsRawModel = require('./FssParamEntitiesProductsRaw');
const FssParamEntitiesProductsRawDBService = require('../services/dbServices/FssParamEntitiesProductsRaw');

const FssParamEntityVouchersModel = require('./FssParamEntityVouchersOrm');
// const FssParamEntityVouchersRawModel = require('./FssParamEntityVouchersRaw');
const FssParamEntityVouchersRawDBService = require('../services/dbServices/FssParamEntityVouchersRaw');

const FssParamEntityTransactionNatureModel = require('./FssParamEntityTransactionNatureOrm');
// const FssParamEntityTransactionNatureRawModel = require('./FssParamEntityTransactionNatureRaw');
const FssParamEntityTransactionNatureRawDBService = require('../services/dbServices/FssParamEntityTransactionNatureRaw');

const FssParamEntityLocationsModel = require('./FssParamEntityLocationsOrm');
// const FssParamEntityLocationsRawModel = require('./FssParamEntityLocationsRaw');
const FssParamEntityLocationsRawDBService = require('../services/dbServices/FssParamEntityLocationsRaw');


const FssParamOEMappingGlFsliModel = require('./fssParamOEMappingGlFsliOrm');
const FssParamOEMappingGlFsliRawDBService = require('../services/dbServices/fssParamOEMappingGlFsliRaw');


const ShareTranOeRegisterRawDBService = require('../services/dbServices/shareTranOeRegisterRaw');

const FssParamOepRectificationModel = require('./fssParamOepRectificationOrm');
const FssParamOepRectificationRawDBService = require('../services/dbServices/fssParamOepRectificationRaw');


const ShareFormReconciliationModel = require('./ShareFormReconciliationOrm');
// const ShareFormReconciliationRawModel = require('./ShareFormReconciliationRaw');
const ShareFormReconciliationRawDBService = require('../services/dbServices/ShareFormReconciliationRaw');


const moduleInvestmentRegisterRawDBService = require('../services/dbServices/moduleInvestmentRegisterRaw');


const ShareFormShareholdersModel = require('./ShareFormShareholdersOrm');
// const ShareFormShareholdersRawModel = require('./ShareFormShareholdersRaw');
const ShareFormShareholdersRawDBService = require('../services/dbServices/ShareFormShareholdersRaw');

const PpeFormBookModel = require('./PpeFormBookOrm');
// const PpeFormBookRawModel = require('./PpeFormBookRaw');
const PpeFormBookRawDBService = require('../services/dbServices/PpeFormBookRaw');

 
const FssParamOeplTbBatchRawDBService = require('../services/dbServices/fssParamOeplTbBatchRaw');
const FssTranOeplTbvalRawDBService = require('../services/dbServices/fssTranOeplTbvalRaw');


const FssParamOepMappOverRawService = require('../services/dbServices/fssParamOepMappOverRaw');



const ArapApTranInvoicesRawService = require('../services/dbServices/ArapApTranInvoicesRaw');
const ArapArTranInvoicesRawService = require('../services/dbServices/ArapArTranInvoicesRaw');
const ArapAdvpTranInvoicesRawService = require('../services/dbServices/ArapAdvpTranInvoicesRaw');
const ArapAdvrTranInvoicesRawService = require('../services/dbServices/ArapAdvrTranInvoicesRaw');
const ArapTranSettlementRawService = require('../services/dbServices/ArapTranSettlementRaw');



const FssParamOeFsliRawDBService = require('../services/dbServices/fssParamOeFsliRaw');


const ShareFormShPromoterModel = require('./ShareFormShPromoterOrm');
// const ShareFormShPromoterRawModel = require('./ShareFormShPromoterRaw');
const ShareFormShPromoterRawDBService = require('../services/dbServices/ShareFormShPromoterRaw');


const moduleAssetsDepnRawDBService = require('../services/dbServices/moduleAssetsDepnRaw');


const dataTbDbRawDBService = require('../services/dbServices/dataTbDbRaw');
/**
 * Initialize models for a specific subdomain & run migration
 * @param {string} subdomain - The subdomain to initialize models for
 * @param {boolean} runMigration - Whether to force migration
 */
const initModels = async (subdomain, runMigration = false) => {
    console.log(`🔍 Initializing models for subdomain: ${subdomain} | Migration: ${runMigration}`);

    const sequelize = getSequelizeInstance(subdomain);

    const models = {};

    try {
        // 1️⃣ Create Independent Master Tables First
        models.BasicParamOrganisation = await BasicParamOrganisationModel(sequelize);

        models.User = await UserModel(sequelize);
        models.Investment = await InvestmentModel(sequelize);
        if (runMigration) {
            // Run migrations only if explicitly requested
            await sequelize.sync({ alter: true });
            // console.log(`✅ Migrations completed for ${subdomain}`);
        }
        models.basicMasterUsers = await basicMasterUsersModel(sequelize);
        // models.basicMastFinancialFramework = await basicMastFinancialFrameworkModel(sequelize);
        models.basicMastModules = await basicMastModulesModel(sequelize);
        models.basicmastfonts = await basicmastfontsModel(sequelize);

        if (runMigration) {
            // Run migrations only if explicitly requested
            await sequelize.sync({ alter: true });
            // console.log(`✅ Migrations completed for ${subdomain}`);
        }

        // await sequelize.sync({ alter: true }); // ✅ Ensure master tables are created first

        // 2️⃣ Create Parameter Tables (Foreign Keys to Masters)
        models.basicParamEntities = await basicParamEntitiesModel(sequelize);
        models.BasicParamOePeriod = await BasicParamOePeriodOrmModel(sequelize);
        models.BasicMastPeriods = await BasicMastPeriodsOrmModel(sequelize);
        models.BasicParamOeLocation = await BasicParamOeLocationModel(sequelize);
        models.basicParamEntityGroups = await basicParamEntityGroupsModel(sequelize);
        models.basicParamEntityGSTIN = await basicParamEntityGSTINModel(sequelize);
        models.basicParamEntityLocations = await basicParamEntityLocationsModel(sequelize);
        models.basicParamEntityTAN = await basicParamEntityTANModel(sequelize);
        models.basicTranSubscriptions = await basicTranSubscriptionsModel(sequelize);
        models.basicTranSubscriptionFrameworks = await basicTranSubscriptionFrameworksModel(sequelize);
        models.basicTranSubscriptionModules = await basicTranSubscriptionModulesModel(sequelize);

        if (runMigration) {
            // Run migrations only if explicitly requested
            await sequelize.sync({ alter: true });
            // console.log(`✅ Migrations completed for ${subdomain}`);
        }

        // await sequelize.sync({ alter: true }); // ✅ Ensure parameter tables are created


        models.paramsEntityReportingPeriod = await paramsEntityReportingPeriodModel(sequelize);

        if (runMigration) {
            // Run migrations only if explicitly requested
            await sequelize.sync({ alter: true });
            // console.log(`✅ Migrations completed for ${subdomain}`);
        }
        // await sequelize.sync({ alter: true }); // ✅ Ensure parameter tables are createdcls

        // 3️⃣ Create Transactional Tables (Foreign Keys to Parameter Tables)
        models.paramsEntityGroupDetails = await paramsEntityGroupDetailsModel(sequelize);
        models.basicParamReportingPrint = await basicParamReportingPrintModel(sequelize);
        models.basicParamReportingStyle = await basicParamReportingStyleModel(sequelize);

        models.Documents = await DocumentsModel(sequelize);
        models.Geolocation = await GeolocationModel(sequelize);
        models.ShareMasterTypeofShares = await ShareMasterTypeofSharesModel(sequelize);
        models.ShareParamModeOfIssue = await ShareParamModeOfIssueModel(sequelize);
        models.ShareParamClassOfShares = await ShareParamClassOfSharesModel(sequelize);
        models.FssMastFinancialFramework = await FssMastFinancialFrameworkModel(sequelize);
        models.FssMastCoreLineMaster = await FssMastCoreLineMasterModel(sequelize);
        models.FssMastLineMaster = await FssMastLineMasterModel(sequelize);
        models.FssMastPartyTypes = await FssMastPartyTypesModel(sequelize);
        models.BasicParamModules = await BasicParamModulesModel(sequelize);
        models.FssMastUnitTypes = await FssMastUnitTypesModel(sequelize);
        models.FssMastPartyRelationshipTypes = await FssMastPartyRelationshipTypesModel(sequelize);

        models.FssMastUnitsOfMeasurement = await FssMastUnitsOfMeasurementModel(sequelize);
        models.FssMastVoucherTypes = await FssMastVoucherTypesModel(sequelize);
        models.FssParamEntityParties = await FssParamEntityPartiesModel(sequelize);
        models.FssParanEntityPartyRelations = await FssParanEntityPartyRelationsModel(sequelize);


        models.FssParamEntityGls = await FssParamEntityGlsModel(sequelize);

        models.FssParamEntitiesProducts = await FssParamEntitiesProductsModel(sequelize);
        models.FssParamEntityVouchers = await FssParamEntityVouchersModel(sequelize);

        models.FssParamEntityTransactionNature = await FssParamEntityTransactionNatureModel(sequelize);
        models.FssParamEntityLineMaster = await FssParamEntityLineMasterModel(sequelize);
        models.FssParamOeMappingGlFsli = await FssParamOEMappingGlFsliModel(sequelize);
        models.FssParamOepRectification = await FssParamOepRectificationModel(sequelize);
        models.FssParamEntityLocations = await FssParamEntityLocationsModel(sequelize);
        models.ShareFormReconciliation = await ShareFormReconciliationModel(sequelize);

        models.ShareFormShareholders = await ShareFormShareholdersModel(sequelize);

        models.ShareFormShPromoter = await ShareFormShPromoterModel(sequelize);

        models.PpeFormBook = await PpeFormBookModel(sequelize);

        models.Subscribers = await SubscribersModel(sequelize);




        // await sequelize.sync({ alter: true }); // ✅ Ensure all tables are created

        if (runMigration) {
            // Run migrations only if explicitly requested
            await sequelize.sync({ alter: true });
            console.log(`✅ Migrations completed for ${subdomain}`);
        }

        //start for raw sql queries not related to migrations
        models.BasicParamOrganisationRaw = new BasicParamOrganisationRawDBService(subdomain);
        models.SdStorageProcedureRaw = new SdStorageProcedureRawDBService(subdomain);

        models.basicMasterUsersRaw = new basicMasterUsersRawDBService(subdomain);
        // models.basicMastFinancialFrameworkRaw = new basicMastFinancialFrameworkRawDBService(subdomain);
        models.basicMastModulesRaw = new basicMastModulesRawDBService(subdomain);
        models.basicParamEntitiesRaw = new basicParamEntitiesRawDBService(subdomain);
        models.BasicParamOeLocationRaw = new BasicParamOeLocationRawService(subdomain);
        models.BasicParamOePeriodRaw = new BasicParamOePeriodRawService(subdomain);
        models.BasicMastPeriodsRaw = new BasicMastPeriodsRawService(subdomain);
        models.basicParamEntityGroupsRaw = new basicParamEntityGroupsRawDBService(subdomain);
        models.basicParamEntityGSTINRaw = new basicParamEntityGSTINRawDBService(subdomain);
        models.basicParamEntityLocationsRaw = new basicParamEntityLocationsRawDBService(subdomain);
        models.basicParamEntityTANRaw = new basicParamEntityTANRawDBService(subdomain);
        models.basicParamReportingPrintRaw = new basicParamReportingPrintRawDBService(subdomain);

        models.basicParamReportingStyleRaw = new basicParamReportingStyleRawDBService(subdomain);
        models.basicTranSubscriptionFrameworksRaw = new basicTranSubscriptionFrameworksRawDBService(subdomain);
        models.basicTranSubscriptionModulesRaw = new basicTranSubscriptionModulesRawDBService(subdomain);
        models.basicTranSubscriptionsRaw = new basicTranSubscriptionsRawDBService(subdomain);
        models.paramsEntityGroupDetailsRaw = new paramsEntityGroupDetailsRawDBService(subdomain);
        models.paramsEntityReportingPeriodRaw = new paramsEntityReportingPeriodRawDBService(subdomain);
        models.basicmastfontsRaw = new basicmastfontsRawDBService(subdomain);

        //end for raw sql queries  not related to migrations

        models.DocumentsRaw = new DocumentsRawDBService(subdomain);
        models.GeolocationRaw = new GeolocationRawDBService(subdomain);
        models.ShareMasterTypeOfSharesRaw = new ShareMasterTypeOfSharesRawDBService(subdomain);
        models.ShareParamModeOfIssuesRaw = new ShareParamModeOfIssuesRawDBService(subdomain);
        models.ShareParamClassOfSharesRaw = new ShareParamClassOfSharesRawDBService(subdomain);
        models.FssMastCoreLineMasterRaw = new FssMastCoreLineMasterRawDBService(subdomain);
        models.FssMastFinancialFrameworkRaw = new FssMastFinancialFrameworkRawDBService(subdomain);
        models.FssMastLineMasterRaw = new FssMastLineMasterRawDBService(subdomain);
        models.FssMastPartyTypesRaw = new FssMastPartyTypesRawDBService(subdomain);
        models.BasicParamModulesRaw = new BasicParamModulesRawDBService(subdomain);
        models.FssMastPartyRelationshipTypesRaw = new FssMastPartyRelationshipTypesRawDBService(subdomain);


        models.FssMastUnitTypesRaw = new FssMastUnitTypesRawDBService(subdomain);
        models.FssMastUnitsOfMeasurementRaw = new FssMastUnitsOfMeasurementRawDBService(subdomain);
        models.FssMastVoucherTypesRaw = new FssMastVoucherTypesRawDBService(subdomain);

        models.FssParamEntityLineMasterRaw = new FssParamEntityLineMasterRawDBService(subdomain);
        models.FssParamEntityGlsRaw = new FssParamEntityGlsRawDBService(subdomain);
        models.FssParamEntityPartiesRaw = new FssParamEntityPartiesRawDBService(subdomain);

        models.FssParanEntityPartyRelationsRaw = new FssParanEntityPartyRelationsRawDBService(subdomain);

        models.FssParamEntitiesProductsRaw = new FssParamEntitiesProductsRawDBService(subdomain);
        models.FssParamEntityVouchersRaw = new FssParamEntityVouchersRawDBService(subdomain);

        models.FssParamEntityTransactionNatureRaw = new FssParamEntityTransactionNatureRawDBService(subdomain);
        models.FssParamEntityLocationsRaw = new FssParamEntityLocationsRawDBService(subdomain);
        models.FssParamOEMappingGlFsliRaw = new FssParamOEMappingGlFsliRawDBService(subdomain);

        models.ShareTranOeRegisterRaw = new ShareTranOeRegisterRawDBService(subdomain);
        models.FssParamOepRectificationRaw = new FssParamOepRectificationRawDBService(subdomain);
        models.ShareFormReconciliationRaw = new ShareFormReconciliationRawDBService(subdomain);
        models.moduleInvestmentRegisterRaw = new moduleInvestmentRegisterRawDBService(subdomain);

        models.ShareFormShareholdersRaw = new ShareFormShareholdersRawDBService(subdomain);

        models.ShareFormShPromoterRaw = new ShareFormShPromoterRawDBService(subdomain);
        models.moduleAssetsDepnRaw = new moduleAssetsDepnRawDBService(subdomain);
        models.dataTbDbRaw = new dataTbDbRawDBService(subdomain);

        

        models.PpeFormBookRaw = new PpeFormBookRawDBService(subdomain);
        models.FssParamOepMappOverRaw = new FssParamOepMappOverRawService(subdomain);
        models.ArapApTranInvoicesRaw = new ArapApTranInvoicesRawService(subdomain);
        models.ArapArTranInvoicesRaw = new ArapArTranInvoicesRawService(subdomain);
        models.ArapAdvpTranInvoicesRaw = new ArapAdvpTranInvoicesRawService(subdomain);
        models.ArapAdvrTranInvoicesRaw = new ArapAdvrTranInvoicesRawService(subdomain);
        models.ArapTranSettlementRaw = new ArapTranSettlementRawService(subdomain);

        models.FssParamOeplTbBatchRaw = new FssParamOeplTbBatchRawDBService(subdomain);
        models.FssTranOeplTbvalRaw = new FssTranOeplTbvalRawDBService(subdomain);
        models.FssParamOeFsliRaw = new FssParamOeFsliRawDBService(subdomain);
        models.SubscribersRaw = new SubscribersRawDBService(subdomain);

        

        console.log(`✅ Migrations without model is pass ${subdomain}`);
    } catch (error) {
        console.error(`❌ Migration error for ${subdomain}:`, error);
    }

    return models;
};

module.exports = { initModels };
