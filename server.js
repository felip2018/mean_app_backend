//  Get dependencies
const express   = require('express');
const path      = require('path');
const http      = require('http');
const bodyParser= require('body-parser');

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