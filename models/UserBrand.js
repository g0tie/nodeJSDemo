const mongoose = require("mongoose");

const UserBrandSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId
    },
    brand_id : {
        type: mongoose.Schema.Types.ObjectId
    },

}, { timestamps: true });

const UserBrandModel = mongoose.model('UserBrand',UserBrandSchema);

module.exports = UserBrandModel;