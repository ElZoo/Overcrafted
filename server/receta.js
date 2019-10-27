class Receta {
  constructor(id, itemPrincipal, tiempoMax) {
    this.id = id;
    this.itemPrincipal = itemPrincipal;
    this.items = [];
    this.itemsFinales = [];
    this.tiempoMax = tiempoMax;
    this.tiempoInicio = new Date();
    this.tiempo = 1;
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
      super(id, 'arco', 60);

      this.items = [
        new ItemReceta('tronco', false),
        new ItemReceta('cobweb', false),
      ];

      this.itemsFinales = [
        new ItemReceta('palo', false),
        new ItemReceta('cuerda', false),
      ];
    }
  },

  RecetaFlecha: class RecetaFlecha extends Receta {
    constructor(id) {
      super(id, 'flecha', 60);

      this.items = [
        new ItemReceta('tronco', false),
        new ItemReceta('grava', false),
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
      super(id, 'espada_hierro', 60);

      this.items = [
        new ItemReceta('tronco', false),
        new ItemReceta('mena_hierro', 'horno_item'),
      ];

      this.itemsFinales = [
        new ItemReceta('palo', false),
        new ItemReceta('lingote_hierro', false),
      ];
    }
  }
}
