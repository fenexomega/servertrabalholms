var mongoose = require('mongoose');
var autoincrement = require('mongoose-auto-increment');


var usuarioSchema = mongoose.Schema({
  name:{
    type: String,
    index: {unique:true}
  },
  password:{
    type: String
  }
});

usuarioSchema.plugin(autoincrement.plugin,'Usuario');

var Usuario = module.exports = mongoose.model('Usuario',usuarioSchema);

//get usuario by name
module.exports.getUsuarioByName = function (_name, callback) {
  var query = {name:_name};
  Usuario.findOne(query,callback);
};

//add usuarioSchema
module.exports.addUsuario = function (usuario, callback) {
  Usuario.create(usuario,callback);
};

module.exports.getUsuario = function(callback)
{
  Usuario.find(callback);
}
