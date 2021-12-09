const ErrorHander = require("../Utils/errorhander");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // Wrong MongoDB Id Error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    // mongoose duplicate error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`;
        err = new ErrorHander(message, 400);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is Invalid, Try again`;
        err = new ErrorHander(message, 400);
    }

    // JWT Expired error
    if (err.name === "TokenExpiredError") {
        const message = `Json web token is expired, Try again`;
        err = new ErrorHander(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
