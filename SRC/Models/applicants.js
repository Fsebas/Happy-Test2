const mongoose = require('mongoose'); 
const {Schema} = mongoose;

//Schema de aspirantes
const ApplicantSchema = new Schema ({
    cedula: {type: Number, maxlength: 10, required: true},
    nombres:{type:String, required: true},
    apellidos:{type:String, required: true},
    ciudad:{type: String},
    skype: {type: String},
    email:{type:String, required:true},
    telefonos:[{type: Number, required: true}],
    especialidades: [{type: String, required: true}],
    disponibilidad:{type: Date},
    cv:{type: String, required: true},
    comentarios:[{type: String}],
    calificacion:{type: Number},
    state:{type:String},
    origen:{type:String, required: true}
});

module.exports = mongoose.model('Applicant',ApplicantSchema);