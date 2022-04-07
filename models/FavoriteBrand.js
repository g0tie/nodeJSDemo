const mongoose = require("mongoose");

const FavoriteBrandSchema = new mongoose.Schema({
    name : {
        type: String
    }
});

const FavoriteBrandModel = mongoose.model('FavoriteBrand',FavoriteBrandSchema);

module.exports = FavoriteBrandModel;