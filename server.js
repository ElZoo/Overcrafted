
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var Instancia = require('./server/instancia.js');
var RECETAS = require('./server/receta.js');
var uuid = require('uuid/v4');
var instancias = {};

var recetas = [
  RECETAS.RecetaArco,
];

var nivel = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,2,8,2,8,2,2,7,7,2,9,6,2,1,1,1,1],
  [1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1],
  [1,1,1,1,2,5,2,5,2,2,2,10,4,2,3,2,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
//crearInstancias();

io.on('connection', function(socket) {
  console.log(`Nuevo usuario: ${socket.id}`);

  let instancias_emit = [];
  for(let instancia_id in instancias) {
    let instancia = instancias[instancia_id];
    instancias_emit.push({
      id: instancia.id,
      jugadores: Object.keys(instancia.jugadores).length,
    });
  }
  socket.emit('instancias', instancias_emit);

  socket.on('matchMaking', function() {
    let llaves = Object.keys(instancias);
    if(llaves.length > 0) {
      let index = Math.floor(Math.random() * llaves.length);
      let id = llaves[index];
      let instancia = instancias[id];
      if(Object.keys(instancia.jugadores).length < 4) {
        joinInstancia(socket, id);
        return;
      }
    }

    let instancia = new Instancia(uuid(), nivel, recetas);
    instancias[instancia.id] = instancia;
    joinInstancia(socket, instancia.id);
  });

  socket.on('joinInstancia', function(id) {
    joinInstancia(socket, id);
  });

  socket.on('update_controles', function(data) {
    for(let instancia_id in instancias) {
      let instancia = instancias[instancia_id];
      if(instancia.sockets[socket.id]) {
        instancia.update_controles(socket.id, data);
        break;
      }
    }
  });

  socket.on('coger_bloque', function(coords) {
    for(let instancia_id in instancias) {
      let instancia = instancias[instancia_id];
      if(instancia.sockets[socket.id]) {
        instancia.coger_bloque(socket.id, coords);
        break;
      }
    }
  });

  socket.on('usar_bloque', function(coords) {
    for(let instancia_id in instancias) {
      let instancia = instancias[instancia_id];
      if(instancia.sockets[socket.id]) {
        instancia.usar_bloque(socket.id, coords);
        break;
      }
    }
  });

  socket.on('disconnect', function() {
    console.log(`Usuario desconectado: ${socket.id}`);

    for(let instancia_id in instancias) {
      let instancia = instancias[instancia_id];
      if(instancia.sockets[socket.id]) {
        instancia.desconectar(socket);

        if(Object.keys(instancia.jugadores).length <= 0) {
          instancia.destroy();
          delete instancias[instancia.id];
        }
        break;
      }
    }
  });
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(80, function() {
  console.log(`Escuchando en ${server.address().port}`);
});

function joinInstancia(socket, id) {
  let yaOnline = false;

  for(let instancia_id in instancias) {
    let instancia = instancias[instancia_id];
    if(instancia.sockets[socket.id]) {
      yaOnline = true;
      break;
    }
  }

  if(yaOnline) {
    return;
  }

  let instancia = instancias[id];
  if(!instancia || Object.keys(instancia.jugadores).length >= 4) {
    return;
  }

  instancia.conectar(socket);
}
