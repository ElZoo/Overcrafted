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
      let item = jugador.item;
      jugador.item = null;
      this.items.push(item);
    }
  },

  ItemTronco: class ItemTronco extends Item {
    constructor() {
      super('tronco');

      this.bloquesAceptados = [
        'encimera',
        'mesa_cortar',
        'basura',
      ];
    }

    cortar(bloque) {
      return new module.exports.ItemPalo();
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
  }
}
