//  Get dependencies
const express   = require('express');
const path      = require('path');
const http      = require('http');
const bodyParser= require('body-parser');
var mongoose    = require('mongoose');

///////////////////////////////////////////////////////////
//  Conexion a la base de datos MongoDB a traves de Mongoose
var dbURI = 'mongodb://localhost/db_mean';
mongoose.connect(dbURI,  { useNewUrlParser: true });

// Configuracion de los servicios de la conexion Mongoose
mongoose.connection.on('connected', function(){
    console.log('Mongoose default connection open to: '+dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose default connection error: '+err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose default connection disconnected');
});

// Si el proceso 'Node' termina, se cierra la conexion Mongoose
process.on('SIGINT',function(){
    mongoose.connection.close(function(){
        console.log('Mongoose default connection disconnected through app termination.');
        process.exit(0);
    });
});

///////////////////////////////////////////////////////////

//  Creacion y configuracion de la aplicacion express
const app = express();

//  Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*  Configuracion del directorio 'dist' como directorio esático
    en este directorio tendremos los archivos obtenidos en el build de nuestra 
    aplicacion Angular
*/
app.use(express.static(path.join(__dirname,'dist')));


//  Configuracion de rutas 
app.get('/api',function(req,res){
    res.send('La API funciona');
});

//  Configuracion de las rutas API
require('../frontend/server/routes/tarea')(app);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
});

//  Configuracion del puerto de escucha
const port = process.env.PORT || 3000;
app.set('port',port);

//  Creamos el servidor http con la aplicacion express y abrimos el puerto
const server = http.createServer(app);
server.listen(port, ()=>{
    console.log(`API running on localhost:${port}`);
});