const express = require('express');
const Router = express.Router();
const Specializations = require('../Models/specializations');

//obtener todos los aplicantes
Router.get('/', async (req, res) => {
   const specializations = await Specializations.find();
   console.log(specializations);
   res.json(specializations);
});


module.exports = Router;