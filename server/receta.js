class Receta {
  constructor(id, itemPrincipal, tiempoMax, puntos) {
    this.id = id;
    this.itemPrincipal = itemPrincipal;
    this.items = [];
    this.itemsFinales = [];
    this.tiempoMax = tiempoMax;
    this.tiempoInicio = new Date();
    this.tiempo = 1;
    this.puntos = puntos;
  }
}

class ItemReceta {
  constructor(nombre, extra) {
    this.nombre = nombre;
    this.extra = extra;
  }
}

module.exports = {
  RecetaArco: class RecetaArco extends Receta {
    constructor(id) {
      super(id, 'arco', 60, 10);

      this.items = [
        new ItemReceta('tronco', 'cortar'),
        new ItemReceta('cobweb', 'cortar'),
      ];

      this.itemsFinales = [
        new ItemReceta('palo', false),
        new ItemReceta('cuerda', false),
      ];
    }
  },

  RecetaFlecha: class RecetaFlecha extends Receta {
    constructor(id) {
      super(id, 'flecha', 75, 15);

      this.items = [
        new ItemReceta('tronco', 'cortar'),
        new ItemReceta('grava', 'cortar'),
        new ItemReceta('pluma', false),
      ];

      this.itemsFinales = [
        new ItemReceta('palo', false),
        new ItemReceta('flint', false),
        new ItemReceta('pluma', false),
      ];
    }
  },

  RecetaEspadaHierro: class RecetaEspadaHierro extends Receta {
    constructor(id) {
      super(id, 'espada_hierro', 90, 20);

      this.items = [
        new ItemReceta('tronco', 'cortar'),
        new ItemReceta('mena_hierro', 'fundir'),
      ];

      this.itemsFinales = [
        new ItemReceta('palo', false),
        new ItemReceta('lingote_hierro', false),
      ];
    }
  },

  RecetaHachaOro: class RecetaHachaOro extends Receta {
    constructor(id) {
      super(id, 'hacha_oro', 90, 20);

      this.items = [
        new ItemReceta('tronco', 'cortar'),
        new ItemReceta('mena_oro', 'fundir'),
      ];

      this.itemsFinales = [
        new ItemReceta('palo', false),
        new ItemReceta('lingote_oro', false),
      ];
    }
  },

  RecetaEscudo: class RecetaEscudo extends Receta {
    constructor(id) {
      super(id, 'escudo', 75, 15);

      this.items = [
        new ItemReceta('tronco', false),
        new ItemReceta('mena_hierro', 'fundir'),
      ];

      this.itemsFinales = [
        new ItemReceta('tronco', false),
        new ItemReceta('lingote_hierro', false),
      ];
    }
  },

  RecetaAntorcha: class RecetaAntorcha extends Receta {
    constructor(id) {
      super(id, 'antorcha', 120, 25);

      this.items = [
        new ItemReceta('tronco', 'cortar'),
        new ItemReceta('bloque_carbon', 'cortar'),
      ];

      this.itemsFinales = [
        new ItemReceta('palo', false),
        new ItemReceta('carbon', false)
      ]
    }
  },

  RecetaMinecart: class RecetaMinecart extends Receta {
    constructor(id) {
      super(id, 'minecart', 120, 25);

      this.items = [
        new ItemReceta('mena_hierro', 'fundir'),
        new ItemReceta('mena_hierro', 'fundir'),
        new ItemReceta('mena_hierro', 'fundir'),
      ];

      this.itemsFinales = [
        new ItemReceta('lingote_hierro', false),
        new ItemReceta('lingote_hierro', false),
        new ItemReceta('lingote_hierro', false),
      ]
    }
  },
}
