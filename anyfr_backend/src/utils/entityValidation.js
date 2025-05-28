const Joi = require("joi");

const entitySchema = Joi.object({
    entity_name: Joi.string().min(3).max(255).required().messages({
        "string.empty": "Entity name is required.",
        "string.min": "Entity name should have at least 3 characters.",
        "string.max": "Entity name should not exceed 255 characters.",
    }),
    entity_pan: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).optional().messages({
        "string.pattern.base": "Entity PAN must be a valid PAN format (e.g., ABCDE1234F).",
    }),
    reporting_frequency: Joi.string().valid("Monthly", "Quarterly", "Half-Yearly", "Yearly").required().messages({
        "any.only": "Reporting frequency must be one of: Monthly, Quarterly, Half-Yearly, Yearly.",
    }),
    financial_year_style: Joi.string().valid("Calendar Year", "Financial Year").required().messages({
        "any.only": "Financial year style must be either 'Calendar Year' or 'Financial Year'.",
    }),
    reporting_period: Joi.string()
        .valid('2024-25', '2025-26', '2026-27')
        .optional()
        .messages({
            'any.only': "Invalid period value. Allowed values are: '2024-25', '2025-26', '2026-27'."
        }),

    financial_framework_id: Joi.number().integer().optional(),
    is_cfs_applicable: Joi.boolean().optional(),
    is_active: Joi.boolean().default(true),
    created_by: Joi.number().integer().optional(),
    // start_year: Joi.number().integer().min(2000).max(new Date().getFullYear()).required().messages({
    //     "number.min": "Start year must be at least 2000.",
    //     "number.max": `Start year cannot be greater than ${new Date().getFullYear()}.`,
    // }),
    // end_year: Joi.number().integer().min(new Date().getFullYear()).required().messages({
    //     "number.min": `End year must be at least ${new Date().getFullYear()}.`,
    // }),
});

// Middleware function to validate entity data
const validateEntity = (req, res, next) => {
    const { error } = entitySchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ error: error.details.map((detail) => detail.message) });
    }
    next();
};

module.exports = { validateEntity };
