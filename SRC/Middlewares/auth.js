const services = require('../Token');


function isAuth(req, res, next){
    if(req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
    }

    const token = req.headers.authorization.split(" ")[1]; //Crea un array con tantos elementos como espacios halla

    services.decodeToken(token)
        .then( response => {
            re1.user = response 
            next()
        })
        .catch(response =>{
            res.status(response.status)
        })
}

function isAuthAdmin(req, res, next){
    if(req.headers.authorization === undefined){
        return res.status(403).send({message: 'No tienes autorización'})
    }

    const token = req.headers.authorization.split(" ")[1]; //Crea un array con tantos elementos como espacios halla
   
    services.decodeToken(token)
        .then( response => {
            if (response === 'General') res.status(403).send({message: `No tienes autorización`});
            next()
        })
        .catch(response =>{
            res.status(response.status)
        })
}

module.exports = {
    isAuth,
    isAuthAdmin};