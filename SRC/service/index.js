const express =  require('express');
const morgan  =  require('morgan');
const path    =  require('path');
const { mongoose }  =  require('../database')
const app  = express();

//Senttings
app.set('port', process.env.PORT || 3000);
//Middlewares (se actuan antes de que las rutas se usen)

app.use(morgan('dev')); //visualizar las peticiones al server
app.use(express.json()); //recibir y enviar json, es como un interpretador

//Routes

app.use('/api/applicants', require('../Routes/Applicants.routes.js'));
app.use('/api/users', require('../Routes/users.routes.js'));
app.use('/api/specializations', require('../Routes/specializations.routes.js'));
app.use('/api/ale', require('../Routes/alerts.routes.js'));

// Statics files
app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(app.get('port'), () => {

    console.log(`Server on port ${app.get('port')}`);
});