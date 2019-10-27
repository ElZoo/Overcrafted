var Jugador = require('./jugador.js');

module.exports = class Instancia {
  constructor(id, nivel) {
    this.id = id;
    this.nivel = nivel;
    this.jugadores = {};
    this.sockets = {};
  }

  update_coords(socket_id, coords) {
    let jugador = this.jugadores[socket_id];
    jugador.coords = coords;
  }

  update_controles(socket_id, data) {
    let jugador = this.jugadores[socket_id];
    let dirs = data[0];
    jugador.coords = data[1];

    if(dirs.right && !dirs.left) {
      jugador.accX = 600;
    } else if(dirs.left && !dirs.right) {
      jugador.accX = -600;
    } else {
      jugador.accX = 0;
    }

    if(dirs.up && !dirs.down) {
      jugador.accY = -600;
    } else if(dirs.down && !dirs.up) {
      jugador.accY = 600;
    } else {
      jugador.accY = 0;
    }
  }

  conectar(socket) {
    let self = this;
    let jugador = new Jugador(socket.id);

    for(let socket_id in this.sockets) {
      let socket_jg = this.sockets[socket_id];
      socket_jg.emit('instancia_nuevoJugador', jugador);
    }

    this.jugadores[socket.id] = jugador;
    this.sockets[socket.id] = socket;

    socket.emit('instancia_conectado', [this.nivel, this.jugadores]);

    console.log("Jugador conectado a la instancia: " + this.id);

    setInterval(function() {
      let data = [];

      for(let id in self.jugadores) {
        let jg = self.jugadores[id];
        data.push({
          id: jg.id,
          coords: jg.coords,
        });
      }

      socket.emit('update_jugadores', data);
    }, 1250);

    setInterval(function() {
      let data = [];

      for(let id in self.jugadores) {
        let jg = self.jugadores[id];
        data.push({
          id: jg.id,
          accX: jg.accX,
          accY: jg.accY,
        });
      }

      socket.emit('update_jugadores_fast', data);
    }, 20);
  }

  desconectar(socket) {
    delete this.jugadores[socket.id];
    delete this.sockets[socket.id];

    for(let socket_id in this.sockets) {
      let socket_jg = this.sockets[socket_id];
      socket_jg.emit('instancia_desconexionJugador', socket.id);
    }
    console.log("Jugador deconectado de la instancia: " + this.id);
  }
}
