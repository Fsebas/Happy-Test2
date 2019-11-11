const express = require('express');
const Router = express.Router();
const Applicants = require('../Models/applicants');
const isAuth = require('../Middlewares/auth')
//Obtener todos los aplicantes
Router.get('/', async (req, res) => {
   const applicants = await Applicants.find();
   res.json(applicants);
});

//Obtener un aplicante en especifico
Router.get('/:id', async (req, res) => {
   const applicants = await Applicants.findOne({ cedula: req.params.id });
   if (applicants === null) {
      res.status(204).json( {status: 'No existe aspirante'});
   } else {
      res.status(200).json(applicants);
   }
});

//Insertar Aplicante
Router.post('/',  isAuth.isAuthAdmin, async (req, res) => {
   const {
      cedula,
      nombres,
      apellidos,
      ciudad,
      skype,
      email,
      telefonos,
      especialidades,
      disponibilidad,
      cv,
      comentarios,
      calificacion,
      state,
      origen
   } = req.body;
   const applicants = new Applicants({
      cedula,
      nombres,
      apellidos,
      ciudad,
      skype,
      email,
      telefonos,
      especialidades,
      disponibilidad,
      cv,
      comentarios,
      calificacion,
      state,
      origen
   });
   const applicant = await Applicants.findOne({ 'cedula': applicants.cedula });
   if (applicant === null || applicant === undefined) {
      if (cedula.toString().length === 10) {
         const save = applicants.save(function (err, applicants) {
            if (err) return console.log(err);
            res.status(201).json({ status: 'Aspirante registrado' });

         });
      } else {
         res.json({ status: 'Error al diligenciar cedula' });

      }
   }
   else {
      res.json({ status: 'Aspirante ya existe en la base de datos' })
   }
});

//Actualizar datos de un aspirate /Preguntar a Daniel
Router.put('/:id', async(req, res) =>{
   const applicants = await Applicants.findOne({ cedula: req.params.id });
   if (applicants === null || applicants === undefined) {
      res.status(200).json( {status: 'No existe aspirante'});
   } else {
      
      res.status(200).json(applicants);
   }
});

module.exports = Router;