const Poc = [
    {
        success: true,
        module: "Data",
        sections: [
            {
                title: "Entity Dashboard List",
                enabled: "yes",
                components: "EntityClient",
                path: "/dashboard",
            },

            {
                title: "Entity Client",
                enabled: "yes",
                components: "EntityDashboardList",
                path: "/data/fsli-master",


            },
            {
                title: "Reporting Period",
                enabled: "yes",
                components: "ReportingPeriod",
                path: "/data/trial-balance",

            },

        ],
    },

];

module.exports = {
    Poc,
};
