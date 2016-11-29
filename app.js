var express = require('express');//importo o express
var app = express();//criando o app do tipo express
var http = require('http');//importando o http
var bodyParser = require('body-parser');//importo o bodyParser
var mongoose = require('mongoose');
var autoincrement = require('mongoose-auto-increment');
var morgan = require('morgan');
var path  = require('path');

var jwt = require('jsonwebtoken');
var config = require('./config');
// var Usuario = require('./models/usuario');

var port = process.env.PORT || 8080;
mongoose.connect('mongodb://user:user@ds113678.mlab.com:13678/trabalholms');//conectando
var db = mongoose.connection;// pegando a conecção

autoincrement.initialize(db);

var Pedido = require('./models/pedido');//importando o modelo pokemon
var Usuario = require('./models/usuario');


app.set('secret',config.secret);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); //dizendo para o app q será usado json

// ativando pasta estática para conteúdo
app.use(express.static(path.join(__dirname, 'public')));



app.use(morgan('dev'));//ativando o log do servidor para vizualizar as requisições
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers','Content-Type');
  next();
})

app.get('/',function (req,res) {
//  res.send('Olá, vc está na PokeAPI');
  res.send('<html><head></head><body><a href="intent:#Intent;action=android.intent.action.VIEW;end">click me!</a></body></html>');
});



// app.post('/anuncio',function(req,res){
//    var usuario = req.body;
//    Usuario.addUsuario(usuario,function(err,usuario){
//      if(err) res.json("Algo de errado não está certo!");
//      res.json(usuario);
//    });
// });
//
// app.get('/pokemons/:_name',function(req,res){
//   var name = req.params._name;
//   Pokemon.getPokemonByName(name,function(err,pokemon){
//     if(err){
//       res.json("Algo de errado não está certo!");
//     }
//     res.json(pokemon);
//   });
// });

//get que retorna os pokemons
//rota: /api/pokemons
app.get('/pedido',function(req,res){
  Pedido.getPedidos(function(err,pedidos){
    if(err){
      res.json("Algo de errado não está certo!");
    }
    res.json(pedidos);
  });
});

app.get('/pedido/:_usuario',function(req,res){
  var usuario = req.params._usuario;
  Pedido.getPedidosByUsuario(usuario,function(err,pedidos){
    if(err)
      res.json("Algo errado aconteceu");
    else
      res.json(pedidos);
  });

});

app.get('/usuario/',function(req,res){
  Usuario.getUsuario(function(err,usuarios){
    if(err)
      res.json("Deu erro",err);
    else
      res.json(usuarios);
  });
});


app.get('/usuario/:_name',function(req,res){
  var name = req.params._name;
  Usuario.getUsuarioByName(name,function(err,usuarios){
    if(err)
      res.json("Deu erro");
    else
      res.json(usuarios);
  });
});

var router = express.Router();//criando o roteador

//autenticação
//rota /api/autenticar
// router.post('/autenticar',function(req,res){
//   Usuario.getUsuarioByName(req.body.name,function(err,usuario){
//     if(err){
//       res.json("erro usuário não foi encontrado");
//     }
//     if(!usuario){
//       res.json("a autenticação falhou");
//     }else if(usuario){
//       if(req.body.password != usuario.password){
//         res.json("senha inválida");
//       }else {
//         var token = jwt.sign(usuario,app.get('secret'),{ expiresIn:3600});
//         res.json({token:token});
//       }
//     }
//   });
// });

//middleware
// router.use(function(req,res,next){
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//   if(token){
//     jwt.verify(token,app.get('secret'),function(err, decoded){
//       if(err){
//         return res.json('token com problema');
//       }else{
//         req.decoded = decoded;
//         next();
//       }
//     });
//   }else{
//     return res.status(403).send("seu token é inválido");
//   }
// });

//get que retorna um pokemon pelo seu id
//rota: /api/pokemons/_name (a,b,c,...)
// router.get('/pokemons/:_name',function(req,res){
//   var name = req.params._name;
//   Pokemon.getPokemonByName(name,function(err,pokemon){
//     if(err){
//       res.json("Algo de errado não está certo!");
//     }
//     res.json(pokemon);
//   });
//   //console.log('[INFO]: Get Pokemon with _name = '+name);
// });


//update pokemon with _name
//rota: /api/pokemons/_name (a,b,c...) body={name:nome,type:tipo}
// router.put('/pokemons/:_id', function(req,res){
//   var name = req.params._name;
//   var pokemon = req.body;
//   /*pokemons[id] = pokemon;
//   res.json('Pokemon updated');*/
//   Pokemon.updatePokemon(name, pokemon, {}, function(err, pokemon){
//     if(err){
//       res.json("Algo de errado não está certo!");
//     }
//     res.json(pokemon);
//   });
//   //console.log('[INFO]: PUT Pokemon with _name = '+name);
// });
//
//inseri pokemons
//rota: /api/pokemons body={name:nome,type:tipo}
app.post('/pedido',function (req,res) {
  var pedido = req.body;
  Pedido.createPedido(pedido,function(err,pedido){
    if(err){
      res.json("Algo de errado não está certo!");
    }
    res.json(pedido);
  })
  //pokemons.push(pokemon);
  //res.json('Pokemon added');
  //console.log('[INFO]: Post Pokemon');
});

app.post('/usuario',function (req,res) {
  var usuario = req.body;
  Usuario.addUsuario(usuario,function(err,usuario){
    var response;
    if(err){
      response = {code:500,message:'ERROR'}
      res.json("usuario já existe");
    }
    else
      response = {code:200,message:'OK'};
    res.json(usuario);
  });
  //pokemons.push(pokemon);
  //res.json('Pokemon added');
  //console.log('[INFO]: Post Pokemon');
});
// //delete pokemon
// //rota: /api/pokemons/_name (a,b,c...)
// router.delete('/pokemons/:_name',function(req,res){
//   var name = req.params._name;
//   Pokemon.deletePokemon(name,function(err,pokemon){
//     if(err){
//       res.json("Algo de errado não está certo!");
//     }
//     res.json("Pokemon removed");
//   });
//   /*pokemons.splice(id,1);
//   res.json('Pokemon removed');*/
//   //console.log('[INFO]: Delete Pokemon with _name = '+name);
// });

//definindo a principal caminho (principal rota)
app.use('/api',router);

var httpServer = http.createServer(app);
httpServer.listen(port);
console.log('[INFO]: Servidor rodando na porta 8080');
