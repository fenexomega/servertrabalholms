var mongoose = require('mongoose');
var autoincrement = require('mongoose-auto-increment');

var pedidoSchema = mongoose.Schema({
	data: Date,
	valorTotal: Number,
	usuario: String});

pedidoSchema.plugin(autoincrement.plugin,'Pedido');

var Pedido = module.exports = mongoose.model('Pedido',pedidoSchema);


module.exports.getPedidos = function(callback,limit)
{
  Pedido.find(callback).limit(limit);
};

module.exports.getPedidoById = function(id,callback)
{
  var query = {_id:id};
  Pedido.find(query,callback);
};

//Pedidod Pokemon
module.exports.createPedido = function(pedido, callback){
  Pedido.create(pedido,callback);
};

module.exports.getPedidosByUsuario = function(user, callback)
{
	var query = {usuario: user};
	Pedido.find(query,callback);
};
