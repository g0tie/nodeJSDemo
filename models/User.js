const mongoose = require("mongoose");

//define a user object and link to the right collection
const UserSchema = new  mongoose.Schema({
    name : {
        type: String
    },
    genre: {
        type: String
    },

    //act as a foreign key
    favorite_brand_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FavoriteBrand'
    }
}, { collection: "personnages"}) ;

//create model
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;