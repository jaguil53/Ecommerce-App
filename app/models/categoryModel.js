const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
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
});

const CategoryModel = mongoose.model('category', categorySchema);

module.exports = CategoryModel;