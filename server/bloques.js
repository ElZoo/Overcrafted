var ITEMS = require('./items.js');

class Bloque {
  constructor(x, y, nombre) {
    this.x = x;
    this.y = y;
    this.nombre = nombre;
    this.item = null;
  }

  coger(jugador) {
    if(this.item && !jugador.item) {
      jugador.item = this.item;
      this.item = null;
    } else if(!this.item && jugador.item) {
      if(!jugador.item.bloquesAceptados.includes(this.nombre)) {
        return;
      }
      this.item = jugador.item;
      jugador.item = null;
    }
  }

  usar(jugador) {}
}


module.exports = {
  BloqueCofre: class BloqueCofre extends Bloque {
    constructor(x, y) {
      super(x, y, 'cofre');
      this.tipoItem = undefined;
    }

    setTipoItem(tipoItem) {
      this.tipoItem = tipoItem;
      this.item = new this.tipoItem;
    }

    coger(jugador) {
      if(!jugador.item) {
        jugador.item = this.item;
        this.item = new this.tipoItem;
      }
    }
  },

  BloqueSuelo: class BloqueSuelo extends Bloque {
    constructor(x, y) {
      super(x, y, 'suelo');
    }
  },

  BloqueBarrera: class BloqueBarrera extends Bloque {
    constructor(x, y) {
      super(x, y, 'barrera');
    }
  },

  BloqueEncimera: class BloqueEncimera extends Bloque {
    constructor(x, y) {
      super(x, y, 'encimera');
    }

    coger(jugador) {
      if(this.item && jugador.item && this.item.nombre == 'plato_crafteo') {
        if(jugador.item.nombre == 'plato_crafteo' || jugador.item.nombre == 'plato_sucio') {
          return;
        }
        this.item.craftear(jugador);
      } else {
        super.coger(jugador);
      }
    }
  },

  BloqueBasura: class BloqueBasura extends Bloque {
    constructor(x, y) {
      super(x, y, 'basura');
    }

    coger(jugador) {
      if(jugador.item) {
        if(!jugador.item.bloquesAceptados.includes(this.nombre)) {
          return;
        }

        if(jugador.item.nombre == 'plato_crafteo') {
          jugador.item.items = [];
          return;
        }

        jugador.item = null;
      }
    }
  },

  BloquePila: class BloquePila extends Bloque {
    constructor(x, y) {
      super(x, y, 'pila');
      this.items = [];
    }

    coger(jugador) {
      if(!jugador.item && this.items.length > 0) {
        let item = this.items.pop();
        jugador.item = item;
      }
    }

    nuevoPlatoLimpio(item) {
      this.items.push(item);
    }
  },

  BloqueFregadero: class BloqueFregadero extends Bloque {
    constructor(x, y) {
      super(x, y, 'fregadero');
      this.items = [];
      this.tiempoEspera = 1000;
      this.enEspera = false;
    }

    coger(jugador) {
      if(jugador.item) {
        if(!jugador.item.bloquesAceptados.includes(this.nombre)) {
          return;
        }

        let item = jugador.item;
        jugador.item = null;
        this.items.push(item);
      }
    }

    usar(jugador, instancia) {
      let self = this;

      if(this.items.length > 0 && !this.enEspera) {
        this.enEspera = true;
        setTimeout(function() {
          self.enEspera = false;
          if(self.items.length > 0 && Math.abs(jugador.coords[0]/64 - self.x) < 1 && Math.abs(jugador.coords[1]/64 - self.y) < 2) {
            let item = self.items.pop();
            let nuevoItem = item.lavar();
            for(let bloque_id in instancia.bloques) {
              let bloque = instancia.bloques[bloque_id];
              if(bloque.nombre == 'pila') {
                bloque.nuevoPlatoLimpio(nuevoItem);
                break;
              }
            }

            instancia.update_bloque([self.x+","+self.y, jugador.id]);
          }
        }, self.tiempoEspera);
      }
    }
  },

  BloqueMesaCortar: class BloqueMesaCortar extends Bloque {
    constructor(x, y) {
      super(x, y, 'mesa_cortar');

      this.tiempoEspera = 500;
      this.enEspera = false;
    }

    usar(jugador, instancia) {
      let self = this;

      if(this.item && !this.enEspera) {
        this.enEspera = true;
        setTimeout(function() {
          self.enEspera = false;
          if(self.item && Math.abs(jugador.coords[0]/64 - self.x) < 0.6 && Math.abs(jugador.coords[1]/64 - self.y) < 2) {
            let itemRes = self.item.cortar(this);
            if(itemRes) {
              self.item = itemRes;
            }

            instancia.update_bloque([self.x+","+self.y, jugador.id]);
          }
        }, self.tiempoEspera);
      }
    }
  },

  BloqueEntregar: class BloqueEntregar extends Bloque {
    constructor(x, y) {
      super(x, y, 'entregar');
    }

    coger(jugador, instancia) {
      if (jugador.item) {
        if(!jugador.item.bloquesAceptados.includes(this.nombre)) {
          return;
        }

        let comanda_id = instancia.checkReceta(jugador.item);
        if(!comanda_id) {
          return;
        }

        jugador.item = null

        let comanda = instancia.comandas[comanda_id];
        instancia.puntos += comanda.puntos;

        instancia.borrarComanda(comanda_id);

        setTimeout(function() {
          for(let bloque_id in instancia.bloques) {
            let bloque = instancia.bloques[bloque_id];
            if(bloque.nombre == 'recibir') {
              bloque.nuevoPlatoSucio(instancia);
              break;
            }
          }
        }, 10000);
      }
    }
  },

  BloqueRecibir: class BloqueRecibir extends Bloque {
    constructor(x, y) {
      super(x, y, 'recibir');
      this.items = [];
    }

    coger(jugador) {
      if (!jugador.item && this.items.length > 0) {
        jugador.item = this.items.pop();
      }
    }

    nuevoPlatoSucio(instancia) {
      this.items.push(new ITEMS.ItemPlatoSucio());
      for(let jg_id in instancia.sockets) {
        let socket = instancia.sockets[jg_id];
        socket.emit('nuevo_plato_sucio');
      }
    }
  },

  BloqueHorno: class BloqueHorno extends Bloque {
    constructor(x, y) {
      super(x, y, 'horno_off');

      this.fundiendo = false;
      this.tiempoFundicion = 10000;
    }

    coger(jugador, instancia) {
      let self = this;

      if(!this.item && jugador.item && !this.fundiendo) {
        if(!jugador.item.bloquesAceptados.includes(this.nombre)) {
          return;
        }

        this.fundiendo = true;

        this.item = jugador.item;
        jugador.item = null;

        setTimeout(function() {
          self.item = self.item.fundir();
          self.fundiendo = false;

          instancia.update_bloque([self.x+","+self.y, jugador.id]);
        }, self.tiempoFundicion);
      } else if(this.item && !jugador.item && !this.fundiendo) {
        jugador.item = this.item;
        this.item = null;
      }
    }
  }
}
