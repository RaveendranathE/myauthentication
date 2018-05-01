// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        fname        : String,
        lname        : String,
        email        : String,
        password     : String,
        cnfrmpassword: String,
        address      : String
    }
   

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Loginpofile', userSchema);
