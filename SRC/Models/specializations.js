const mongoose = require('mongoose');
const {Schema} = mongoose;

//Schema de especializadades
const  specializationsSchema = new Schema({
    name:{type:String, required: true}
});

module.exports = mongoose.model('specializations', specializationsSchema);