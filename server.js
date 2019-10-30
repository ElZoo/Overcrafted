
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var Instancia = require('./server/instancia.js');
var MAPA = require('./server/mapas.js');
var uuid = require('uuid/v4');
var instancias = {};

setInterval(function() {
  let instancias_borrar = [];

  for(let instancia_id in instancias) {
    let instancia = instancias[instancia_id];

    let tiempoAhora = new Date();
    let diff = (tiempoAhora - instancia.fechaCreacion) / 1000;

    if(diff > instancia.tiempoMax) {
      instancias_borrar.push(instancia);
    }
  }

  for(let i in instancias_borrar) {
    let instancia = instancias_borrar[i];
    let sockets_reconect = [];

    let gameover = false;
    let looser = false;
    let final = false;
    if(instancia.puntos < instancia.puntosMinimos || !instancia.siguienteNivel) {
      gameover = true;
    }
    if(instancia.puntos < instancia.puntosMinimos) {
      looser = true;
    }
    if(!instancia.siguienteNivel) {
      final = true;
    }

    for(let socket_id in instancia.sockets) {
      let socket = instancia.sockets[socket_id];
      sockets_reconect.push(socket);
      socket.emit('dejarInstancia', [gameover, looser, final, instancia.tutorial]);
    }

    instancia.destroy();
    if(instancias[instancia.id]) {
      delete instancias[instancia.id];
    }

    if(instancia.puntos >= instancia.puntosMinimos && instancia.siguienteNivel) {
      if(instancia.tutorial) {
        return;
      }

      let nuevaInstancia = new Instancia(uuid(), instancia.siguienteNivel);
      instancias[nuevaInstancia.id] = nuevaInstancia;

      setTimeout(function() {
        let acum = 0;
        for(let s in sockets_reconect) {
          acum += 20;
          setTimeout(function() {
            let socket = sockets_reconect[s];
            joinInstancia(socket, nuevaInstancia.id, instancia.jugadores[socket.id].nick);
          }, acum);
        }
      }, 250);
    }
  }
}, 250);

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

  socket.on('matchMaking', function(datos) {
    let nick = datos[0];
    let tutorial = datos[1];

    if(!nick || !nick.trim()) {
      return;
    }
    nick = nick.trim().substring(0,12);

    let llaves = Object.keys(instancias);
    if(llaves.length > 0 && !tutorial) {
      let index = Math.floor(Math.random() * llaves.length);
      let id = llaves[index];
      let instancia = instancias[id];
      if(!instancia.tutorial && Object.keys(instancia.jugadores).length < 4) {
        joinInstancia(socket, id, nick);
        return;
      }
    }

    mapaClase = MAPA.MapaFacil;
    if(tutorial) {
      mapaClase = MAPA.MapaTutorial;
    }
    let instancia = new Instancia(uuid(), mapaClase);
    instancias[instancia.id] = instancia;
    joinInstancia(socket, instancia.id, nick);
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

server.listen(8081, function() {
  console.log(`Escuchando en ${server.address().port}`);
});

function joinInstancia(socket, id, nick) {
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

  instancia.conectar(socket, nick);
}
