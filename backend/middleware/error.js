const ErrorHander = require("../Utils/errorhander");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // Wrong MongoDB Id Error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
