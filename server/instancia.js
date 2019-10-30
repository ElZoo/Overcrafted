var Jugador = require('./jugador.js');
var BLOQUES = require('./bloques.js');
var ITEMS = require('./items.js');
var uuid = require('uuid/v4');

module.exports = class Instancia {
  constructor(id, claseMapa) {
    let mapa = new claseMapa();
    this.id = id;
    this.nivel = mapa.casillas;
    this.tutorial = mapa.tutorial;
    this.recetas = mapa.recetas;
    this.comandas = {};
    this.bloques = {};
    this.crearBloques(mapa);
    this.jugadores = {};
    this.sockets = {};
    this.recetasTimers = {};
    this.timers = [];
    this.oscurecer = mapa.oscurecer;
    this.puntos = 0;
    this.puntosMinimos = mapa.puntosMinimos;
    this.siguienteNivel = mapa.siguienteNivel;
    this.fechaCreacion = new Date();
    this.tiempoMax = mapa.tiempoMax;
    this.coordsSpawn = mapa.coords;
    this.pjs = {
      'zombie': false,
      'esqueleto': false,
      'pigman': false,
      'creeper': false
    };

    let self = this;
    let interval = setInterval(function() {
      self.nuevaComanda();
    }, mapa.tiempoComandas);

    this.timers.push(interval);
  }

  destroy() {
    for(let i in this.timers) {
      clearInterval(this.timers[i]);
    }
    for(let id in this.recetasTimers) {
      clearInterval(this.recetasTimers[id]);
    }
  }

  nuevaComanda() {
    if(Object.keys(this.jugadores).length <= 0) {
      return;
    }

    if(Object.keys(this.comandas).length > 4) {
      return;
    }

    let self = this;
    let recetaClase = this.recetas[Math.floor(Math.random()*this.recetas.length)];
    let comanda = new recetaClase(uuid());

    this.comandas[comanda.id] = comanda;

    for(let jg_id in this.sockets) {
      let socket = this.sockets[jg_id];
      socket.emit('nueva_comanda', comanda);
    }

    let interval = setInterval(function() {
      let tiempoAhora = new Date();
      let diff = (tiempoAhora - comanda.tiempoInicio) / 1000;
      let rel = 1 - (diff / comanda.tiempoMax);

      if(rel <= 0) {
        self.borrarComanda(comanda.id);
        return;
      }

      comanda.tiempo = rel;

      for(let jg_id in self.sockets) {
        let socket = self.sockets[jg_id];
        socket.emit('update_comanda', [comanda.id, comanda.tiempo]);
      }
    }, 500);

    this.recetasTimers[comanda.id] = interval;
  }

  update_bloque(data) {
    for(let jg_id in this.sockets) {
      let socket = this.sockets[jg_id];
      socket.emit('update_bloque', data);
    }
  }

  borrarComanda(comanda_id) {
    let comanda = this.comandas[comanda_id];
    if(!comanda) {
      return;
    }

    clearInterval(this.recetasTimers[comanda.id]);
    delete this.comandas[comanda.id];
    delete this.recetasTimers[comanda.id];

    for(let jg_id in this.sockets) {
      let socket = this.sockets[jg_id];
      socket.emit('quitar_comanda', comanda.id);
    }
  }

  checkReceta(plato) {
    let comandas = this.comandas;

    for(let ic in comandas) {
      let comanda = comandas[ic];
      if(!comanda){
        continue;
      }

      let itemsReceta = [];
      for(let i in comanda.itemsFinales) {
        let item = comanda.itemsFinales[i];
        itemsReceta.push(item.nombre);
      }

      let itemsPlato = [];
      for(let i in plato.items) {
        let item = plato.items[i];
        itemsPlato.push(item.nombre);
      }

      let recetaOk = true;

      for(let i in itemsPlato) {
        let item = itemsPlato[i];
        let x = itemsReceta.indexOf(item);
        if(x > -1) {
          itemsReceta.splice(x, 1);
        } else {
          recetaOk = false;
          break;
        }
      }

      if(itemsReceta.length > 0) {
        recetaOk = false;
      }

      if(recetaOk) {
        return comanda.id;
      }
    }

    return false;
  }

  update_coords(socket_id, coords) {
    let jugador = this.jugadores[socket_id];
    jugador.coords = coords;
  }

  update_controles(socket_id, data) {
    let acc = 300;

    let jugador = this.jugadores[socket_id];
    let dirs = data[0];
    jugador.coords = data[1];

    if(dirs.right && !dirs.left) {
      jugador.accX = acc;
    } else if(dirs.left && !dirs.right) {
      jugador.accX = -acc;
    } else {
      jugador.accX = 0;
    }

    if(dirs.up || dirs.down) {
      jugador.accX *= 0.75;
    }

    if(dirs.up && !dirs.down) {
      jugador.accY = -acc;
    } else if(dirs.down && !dirs.up) {
      jugador.accY = acc;
    } else {
      jugador.accY = 0;
    }

    if(dirs.right || dirs.left) {
      jugador.accY *= 0.75;
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

    for(let jg_id in this.sockets) {
      let socket_jg = this.sockets[jg_id];
      socket_jg.emit('server_coger', [coords, socket_id]);
    }

    bloque.coger(jugador, this);
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

    bloque.usar(jugador, this);

    for(let jg_id in this.sockets) {
      let socket_jg = this.sockets[jg_id];
      socket_jg.emit('server_usar', [coords, socket_id]);
    }
  }

  conectar(socket, nick) {
    let self = this;

    let pj = '';
    for(let p in this.pjs) {
      let pjn = this.pjs[p];
      if(!pjn) {
        pj = p;
        this.pjs[p] = true;
        break;
      }
    }

    let jugador = new Jugador(socket.id, pj, this.coordsSpawn, nick);

    for(let socket_id in this.sockets) {
      let socket_jg = this.sockets[socket_id];
      socket_jg.emit('instancia_nuevoJugador', jugador);
    }

    this.jugadores[socket.id] = jugador;
    this.sockets[socket.id] = socket;

    socket.emit('instancia_conectado', [
      this.nivel,
      this.jugadores,
      this.datosBloques(),
      this.comandas, pj,
      this.puntos,
      this.fechaCreacion,
      this.tiempoMax,
      this.oscurecer,
    ]);

    setTimeout(function() {
      if(Object.keys(self.comandas).length <= 0) {
        self.nuevaComanda();
      }
    }, 2000);

    console.log("Jugador conectado a la instancia: " + this.id);

    let intervalUpdate = setInterval(function() {
      let data = [];

      for(let id in self.jugadores) {
        let jg = self.jugadores[id];
        data.push({
          id: jg.id,
          coords: jg.coords,
        });
      }

      socket.emit('update_jugadores', data);
    }, 200);
    this.timers.push(intervalUpdate);

    let intervalFast = setInterval(function() {
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
    }, 10);
    this.timers.push(intervalFast);
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
    this.pjs[jg.pj] = false;

    for(let socket_id in this.sockets) {
      let socket_jg = this.sockets[socket_id];
      socket_jg.emit('instancia_desconexionJugador', socket.id);
    }
    console.log("Jugador deconectado de la instancia: " + this.id);
  }

  crearBloques(mapa) {
    for(let y=0; y<this.nivel.length; y++) {
      for(let x=0; x<this.nivel[y].length; x++) {
        this.bloques[x+","+y] = crearBloque(x, y, this.nivel[y][x]);
      }
    }

    for(let coords in mapa.cofres) {
      let cofre = this.bloques[coords];
      if(cofre) {
        cofre.setTipoItem(mapa.cofres[coords]);
      }
    }

    for(let coords in mapa.items) {
      let mesa = this.bloques[coords];
      if(mesa) {
        mesa.item = new mapa.items[coords];
      }
    }
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

      if(bloque.items) {
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
    case 10:
      return new BLOQUES.BloquePila(x, y);
  }
}
