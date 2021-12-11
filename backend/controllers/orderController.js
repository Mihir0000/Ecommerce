const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../Utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create new order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {});
