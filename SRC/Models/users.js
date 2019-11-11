const mongoose = require('mongoose');
const bcrypt  = require('bcrypt-nodejs')
const {Schema} = mongoose;

//Schema de usuarios
const UserSchema = new Schema({
    email: {type: String, unique: true,  lowercase: true, required: true},
    password: {type:String, required: true},
    role: {type: String},
    signUpDate:{type: Date, default: Date.now()},
    lastLogin: {type: Date}
});

UserSchema.pre('save', function(next){
    let  user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) =>{
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
})

UserSchema.methods.compararPassword = function (password, cb){
    bcrypt.compare(password, this.password, (err, Equals) =>{
        if(err) return cb(err);
        cb(null, Equals);
    })
}

module.exports = mongoose.model('User', UserSchema);