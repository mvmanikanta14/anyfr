const methodNotAllowed = (req,res,next) => {
    res.methodNotAllowed = () => {
        res.status(405).json({
            status : false,
            message: `Method ${req.method} not allowed on ${req.originalUrl}`,
            data: []
        });
    }
    next();
}

module.exports = methodNotAllowed;