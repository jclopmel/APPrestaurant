var mongoose = require('mongoose');
var uri = "mongodb://localhost:27017/apirestaurante";
var options = { useMongoClient: true}
var db = mongoose.connection;
var express = require('express');
var app = express();


mongoose.connect(uri, options);

db.on('error',function(){
	console.log("Error al conectarse a MongoDB")
});

db.once('open', function() {
	console.log("Conectado a MongoDB")
});

/*-------------------------------------------------Monta el esqueme de la BD-------------------------------------------*/

var restaurantSchema = mongoose.Schema({											//Estructura de la BD
	id: Number,
	food: Array,
	drink: Array
});

var Pedido = mongoose.model('Pedido', restaurantSchema);							//Se crea el molde o constructor

Pedido.find(function (err, p) {													//funciona para cuando el usuario realiza una busqueda
	if (err) return console.error(err);
	console.log(p);
	})
/*---------------------------------------------------Crea el primer pedido------------------------------------------------------*/

/*var Pedido = new Pedido({id: 02, food:["burguer"], drink:["fanta"]})				//Introducimos datos de este usuario, se se recarga crea varios iguales con ID diferente
Pedido.save(function(err) {
	if (err) throw err;
	console.log('Nuevo pedido creado');
});*/

/*--------------------------------------------Método GET para obtener pedidos----------------------------------------------*/

app.get('/tables', function (req, res) {							//alintroducir la URI table+id, devuelve la deseada en formato JSON									

	Pedido.find(function(err, pedido) {
		if (err) throw err;
		res.json(pedido);
	});

})

/*----------------------------------------Método GET para obtener pedidos según ID y sin ella----------------------------------------*/

app.get('/tables/:id?', function (req, res) {							//alintroducir la URI table+id, devuelve la deseada en formato JSON									
	
	Pedido.find({id:req.params.id},function(err, pedido) {
		if (err) throw err;
		res.json(pedido);
	});

})

/*-------------------------------------------------Método POST para modificar pedidos--------------------------------------------------------*/


app.post('/', function (req, res) {
	res.send('POST mandado a la página principal')
})


/*-------------------------------------------------Método DELETE para eleminar pedido según id--------------------------------------------------------*/

app.delete('/tables/:id?', function (req, res) {							//alintroducir la URI table+id, devuelve la deseada en formato JSON									
	
	Pedido.find({id:req.params.id},function(err, pedido) {
		if (err) throw err;
		res.json(pedido);
	});

})

/*----------------------------------------No borrar la escucha para poder comprobar en localhost:8000----------------------------------------*/

app.listen(8000);

