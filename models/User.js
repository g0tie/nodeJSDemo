const mongoose = require("mongoose");

const UserSchema = new  mongoose.Schema({
    name : {
        type: String
    },
    genre: {
        type: String
    },
}, { collection: "personnages"}) ;

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;