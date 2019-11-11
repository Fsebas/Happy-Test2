const mongoose = require('mongoose');  //dependencia de mongo
const URI = 'mongodb+srv://fsebas:IammasterAlfa5@cluster0-mhkgt.mongodb.net/test?retryWrites=true&w=majority'; //Direccion de la base de datos 

//Conexion a la base de datos 
mongoose.connect(URI)
    .then(db => console.log('Data Base connected'))
    .catch(err => console.log(err));

module.exports = mongoose;