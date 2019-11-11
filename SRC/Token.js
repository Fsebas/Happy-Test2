const jwt = require('jwt-simple');
const moment = require('moment')//libreria para  facilitar las fechas
const config = require('./config')

function createToken (user) {
    const payLoad ={
        sub: user.role,
        iat: moment().unix(),  //formato unix
        exp: moment().add(14, 'days').unix(), //14 dias desde el momento de hacerlo 
    }

    return jwt.encode(payLoad,config.SECRET_TOKEN) //crea el token con el payLoad y el secret del archivo config
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) =>{
        try {
            const payLoad = jwt.decode(token, config.SECRET_TOKEN)
            if(payLoad.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token a expirado'
                })
            }
            resolve(payLoad.sub)
        
        } catch (error) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
       
    })
    return decoded
}
module.exports = {
    createToken,
    decodeToken
}