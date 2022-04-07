const mongoose = require("mongoose");

//define a user object and link to the right collection
const UserSchema = new  mongoose.Schema({
    name : {
        type: String
    },
    genre: {
        type: String
    },
    favorite_brand_id : {
        type: Number
    }
}, { collection: "personnages"}) ;

//create model
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;