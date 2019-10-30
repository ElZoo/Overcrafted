class Item {
  constructor(nombre) {
    this.nombre = nombre;
    this.bloquesAceptados = [];
  }

  cortar(bloque) {}
  fundir(bloque) {}
}

module.exports = {
  ItemPlatoCrafteo: class ItemPlatoCrafteo extends Item {
    constructor() {
      super('plato_crafteo');

      this.bloquesAceptados = [
        'encimera',
        'basura',
        'entregar',
      ];

      this.items = [];
    }

    craftear(jugador) {
      if (this.items.length >= 9) {
        return;
      }
      let item = jugador.item;
      jugador.item = null;
      this.items.push(item);
    }
  },

  ItemPlatoSucio: class ItemPlatoSucio extends Item {
    constructor() {
      super('plato_sucio');

      this.bloquesAceptados = [
        'fregadero',
        'encimera',
      ];
    }

    lavar() {
      return new module.exports.ItemPlatoCrafteo();
    }
  },

  ItemTronco: class ItemTronco extends Item {
    constructor() {
      super('tronco');

      this.bloquesAceptados = [
        'encimera',
        'mesa_cortar',
        'horno_off',
        'basura',
      ];
    }

    cortar(bloque) {
      return new module.exports.ItemPalo();
    }

    fundir(bloque) {
      return new module.exports.ItemBloqueCarbon();
    }
  },

  ItemPalo: class ItemPalo extends Item {
    constructor() {
      super('palo');

      this.bloquesAceptados = [
        'encimera',
        'basura',
      ];
    }
  },

  ItemGrava: class ItemGrava extends Item {
    constructor() {
      super('grava');

      this.bloquesAceptados = [
        'encimera',
        'mesa_cortar',
        'basura',
      ];
    }

    cortar(bloque) {
      return new module.exports.ItemFlint();
    }
  },

  ItemFlint: class ItemFlint extends Item {
    constructor() {
      super('flint');

      this.bloquesAceptados = [
        'encimera',
        'basura',
      ];
    }
  },

  ItemPluma: class ItemPluma extends Item {
    constructor() {
      super('pluma');

      this.bloquesAceptados = [
        'encimera',
        'basura',
      ];
    }
  },

  ItemCobweb: class ItemCobweb extends Item {
    constructor() {
      super('cobweb');

      this.bloquesAceptados = [
        'encimera',
        'mesa_cortar',
        'basura',
      ];
    }

    cortar(bloque) {
      return new module.exports.ItemCuerda();
    }
  },

  ItemCuerda: class ItemCuerda extends Item {
    constructor() {
      super('cuerda');

      this.bloquesAceptados = [
        'encimera',
        'basura',
      ];
    }
  },

  ItemMenaHierro: class ItemMenaHierro extends Item {
    constructor() {
      super('mena_hierro');

      this.bloquesAceptados = [
        'encimera',
        'horno_off',
        'basura',
      ];
    }

    fundir(bloque) {
      return new module.exports.ItemLingoteHierro();
    }
  },

  ItemLingoteHierro: class ItemLingoteHierro extends Item {
    constructor() {
      super('lingote_hierro');

      this.bloquesAceptados = [
        'encimera',
        'basura',
      ];
    }
  },

  ItemMenaOro: class ItemMenaOro extends Item {
    constructor() {
      super('mena_oro');

      this.bloquesAceptados = [
        'encimera',
        'horno_off',
        'basura',
      ];
    }

    fundir(bloque) {
      return new module.exports.ItemLingoteOro();
    }
  },

  ItemLingoteOro: class ItemLingoteOro extends Item {
    constructor() {
      super('lingote_oro');

      this.bloquesAceptados = [
        'encimera',
        'basura',
      ];
    }
  },

  ItemBloqueCarbon: class ItemBloqueCarbon extends Item {
    constructor() {
      super('bloque_carbon');

      this.bloquesAceptados = [
        'encimera',
        'mesa_cortar',
        'basura',
      ];
    }

    cortar(bloque) {
      return new module.exports.ItemCarbon();
    }
  },

  ItemCarbon: class ItemCarbon extends Item {
    constructor() {
      super('carbon');

      this.bloquesAceptados = [
        'encimera',
        'basura',
      ];
    }
  }
}
