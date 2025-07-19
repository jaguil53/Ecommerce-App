const mongoose = require('mongoose');
const { default: categoryModel } = require('./categoryModel');

const productSchema = mongoose.Schema(
    {
        _id:{
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantityInStock: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        categoryId:{
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdTs: {
            type: Date,
            default: new Date(),
        },
        updatedTs: {
            type: Date,
            default: new Date(),
        }
    }
);

const ProductModel = mongoose.model('product', productSchema);

module.exports = ProductModel;