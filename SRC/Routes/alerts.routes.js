const express = require('express');
const Router = express.Router();
const Alert = require('../Models/alerts');
const Applicants = require('../Models/applicants');
const isAuth = require('../Middlewares/auth');


Router.get('/', async (req, res) => {
    const alert = await Alert.find();
    res.json(alert);
});

Router.post('/',  async (req, res) => {

    var fecha = new Date ();
    const {
       identification,
       names,
       surnames,
       applicant,
       description,
       date,
    } = req.body;
    const alert = new Alert({
        identification,
        names,
        surnames,
        applicant,
        description,
        date,
    });
    const ale = await Alert.findOne({ 'indentification': alert.identification });
    if (ale === null || ale === undefined) {
        const applicant = await Applicants.findOne({'cedula': alert.identification});
        console.log()
        if(names === null || names === undefined || surnames === null || surnames ===undefined){
            names = applicant.nombres;
            surnames = applicant.apellidos;
        }

        fecha.setDate(applicant.disponibilidad + 15);
        console.log(fecha)
        if(fecha <= date ){
          const save = alert.save(function (err, alert) {
           if (err) return console.log(err);
           res.status(201).json({ status: 'Alerta registrada' });
           });
        }
    }
    else {
       res.json({ status: 'El aspirante ya posee una alerta' })
    }
 });

 Router.delete('/:id',isAuth.isAuthAdmin, async (req, res) =>{
    const alert = await Alert.findOne({ identification: req.params.id });
    if (alert === null) {
       res.status(204).json( {status: 'No existe alerta'});
    } else {
        await alert.remove(err =>{
            if(err) res.status(204).json({message: `Error ${err}`});
            res.status(200).json({message: 'Se ha eliminado la alerta'});
        })
       
    }
 });

 Router.put('')
module.exports = Router;