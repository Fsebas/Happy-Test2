const mongoose = require('mongoose'); 
const {Schema} = mongoose;

const AlertSchema = new Schema ({
    identification: {type: Number, maxlength: 10, required: true},
    names:{type:String},
    surnames:{type:String},
    aplicant:{type: Schema.Types.ObjectId, ref: "applicants"},
    description:{type:String},
    Date:{type:Date, required: true}
});

module.exports = mongoose.model('Alert', AlertSchema);