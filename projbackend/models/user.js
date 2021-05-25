const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require('crypto');
const  uuidv1 = require("uuid/v1");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  lastname: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  userinfo: {
    type: String,
    trim: true,
  },
  
  encry_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  }
},
{timestamps: true}
);

//virtual fields
userSchema.virtual("password") /*this virtual field password holds the plain password example: password = qwerty123 */
  .set(function(password){     /*here password is the plainPassword which user types */
    this._password = password; /*user typed password which is now in password virtual is stored in a private variable _password */
    this.salt = uuidv1();      /* we fill the salt with random generated number from uuid which gets stored 
                                  and act as secret this.salt in securePassword method*/
    this.encry_password = this.securePassword(password) /*plain password qwerty123 is argument in securePassword 
                                                          method securePassword('qwerty123').
                                                          Now this method converts our plain password into some 
                                                          crypto string and returns the value.
                                                          the value gets stored in the encry_password in database */
  })
  .get(function(){
    return this._password;
  })

//secure password
userSchema.method = {
  authenticate: function(plainPassword){
    return this.securePassword(plainPassword) === this.encry_password;
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
      try{
        return crypto
          .createHmac("sha256", this.salt)
          .update(plainPassword)
          .digest("hex");
      }catch(e){
          return ""
      }
    
  },
};

module.exports = mongoose.model("User", userSchema);
