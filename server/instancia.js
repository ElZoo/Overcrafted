var Jugador = require('./jugador.js');
var BLOQUES = require('./bloques.js');
var ITEMS = require('./items.js');

module.exports = class Instancia {
  constructor(id, nivel) {
    this.id = id;
    this.nivel = nivel;
    this.bloques = {};
    this.crearBloques();
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

  coger_bloque(socket_id, coords) {
    let bloque = this.bloques[coords[0]+","+coords[1]];
    if(!bloque) {
      return;
    }

    let jugador = this.jugadores[socket_id];
    if(!jugador) {
      return;
    }

    bloque.coger(jugador, this);

    for(let jg_id in this.sockets) {
      let socket_jg = this.sockets[jg_id];
      socket_jg.emit('server_coger', [coords, socket_id]);
    }
  }

  usar_bloque(socket_id, coords) {
    let bloque = this.bloques[coords[0]+","+coords[1]];
    if(!bloque) {
      return;
    }

    let jugador = this.jugadores[socket_id];
    if(!jugador) {
      return;
    }

    bloque.usar(jugador);

    for(let jg_id in this.sockets) {
      let socket_jg = this.sockets[jg_id];
      socket_jg.emit('server_usar', [coords, socket_id]);
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

    socket.emit('instancia_conectado', [this.nivel, this.jugadores, this.datosBloques()]);

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
    let jg = this.jugadores[socket.id];
    if(jg.item && (jg.item.nombre == 'plato_crafteo' || jg.item.nombre == 'plato_sucio')) {
      for(let bloque_id in this.bloques) {
        let bloque = this.bloques[bloque_id];
        if(bloque.nombre == 'recibir') {
          bloque.nuevoPlatoSucio(this);
          break;
        }
      }
    }

    delete this.jugadores[socket.id];
    delete this.sockets[socket.id];

    for(let socket_id in this.sockets) {
      let socket_jg = this.sockets[socket_id];
      socket_jg.emit('instancia_desconexionJugador', socket.id);
    }
    console.log("Jugador deconectado de la instancia: " + this.id);
  }

  crearBloques() {
    for(let y=0; y<this.nivel.length; y++) {
      for(let x=0; x<this.nivel[y].length; x++) {
        this.bloques[x+","+y] = crearBloque(x, y, this.nivel[y][x]);
      }
    }

    let cofre = this.bloques['3,1'];
    cofre.setTipoItem(ITEMS.ItemTronco);
    cofre = this.bloques['5,1'];
    cofre.setTipoItem(ITEMS.ItemCobweb);

    let mesa = this.bloques['7,8'];
    mesa.item = new ITEMS.ItemPlatoCrafteo();
    mesa = this.bloques['8,8'];
    mesa.item = new ITEMS.ItemPlatoCrafteo();
  }

  datosBloques() {
    let datosBloques = {};

    for(let id in this.bloques) {
      let bloque = this.bloques[id];

      datosBloques[id] = {
        nombre: bloque.nombre,
        item: (bloque.item ? bloque.item.nombre : false),
      };

      if(bloque.item && bloque.item.nombre == 'plato_crafteo') {
        datosBloques[id]['itemsPlato'] = [];
        for(let it in bloque.item.items) {
          datosBloques[id]['itemsPlato'].push(bloque.item.items[it].nombre);
        }
      }

      if(bloque.nombre == 'recibir') {
        datosBloques[id]['items'] = [];
        for(let it in bloque.items) {
          datosBloques[id]['items'].push(bloque.items[it].nombre);
        }
      }
    }

    return datosBloques;
  }
}

function crearBloque(x, y, id) {
  switch(id) {
    case 0:
      return new BLOQUES.BloqueSuelo(x, y);
    case 1:
      return new BLOQUES.BloqueBarrera(x, y);
    case 2:
      return new BLOQUES.BloqueEncimera(x, y);
    case 3:
      return new BLOQUES.BloqueBasura(x, y);
    case 4:
      return new BLOQUES.BloqueFregadero(x, y);
    case 5:
      return new BLOQUES.BloqueMesaCortar(x, y);
    case 6:
      return new BLOQUES.BloqueEntregar(x, y);
    case 7:
      return new BLOQUES.BloqueHorno(x, y);
    case 8:
      return new BLOQUES.BloqueCofre(x, y);
    case 9:
      return new BLOQUES.BloqueRecibir(x, y);
  }
}
