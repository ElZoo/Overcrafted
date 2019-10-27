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

  BloqueFregadero: class BloqueFregadero extends Bloque {
    constructor(x, y) {
      super(x, y, 'fregadero');
    }
  },

  BloqueMesaCortar: class BloqueMesaCortar extends Bloque {
    constructor(x, y) {
      super(x, y, 'mesa_cortar');
    }

    usar() {
      if(this.item) {
        let itemRes = this.item.cortar(this);
        if(itemRes) {
          this.item = itemRes;
        }
      }
    }
  },

  BloqueEntregar: class BloqueEntregar extends Bloque {
    constructor(x, y) {
      super(x, y, 'entregar');
    }

    coger(jugador) {
      if (jugador.item) {
        if(!jugador.item.bloquesAceptados.includes(this.nombre)) {
          return;
        }
        jugador.item = null;
      }
    }
  },

  BloqueRecibir: class BloqueRecibir extends Bloque {
    constructor(x, y) {
      super(x, y, 'recibir');
    }

    coger(jugador) {
      if (!jugador.item && this.item) {
        jugador.item = this.item;
        this.item = null;
      }
    }
  },

  BloqueHorno: class BloqueHorno extends Bloque {
    constructor(x, y) {
      super(x, y, 'horno_off');
    }

    coger(jugador) {
      if(!this.item && jugador.item) {
        if(!jugador.item.bloquesAceptados.includes(this.nombre)) {
          return;
        }

        this.item = jugador.item;
        jugador.item = null;

        this.item = this.item.fundir(this);
      } else if(this.item && !jugador.item) {
        jugador.item = this.item;
        this.item = null;
      }
    }
  }
}
