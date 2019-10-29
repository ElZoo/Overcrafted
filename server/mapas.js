var RECETAS = require('./receta.js');
var ITEMS = require('./items.js');

class Mapa {
  constructor(casillas, recetas, cofres, items, tiempoMax, tiempoComandas) {
    this.casillas = casillas;
    this.recetas = recetas;
    this.tiempoMax = tiempoMax;
    this.tiempoComandas = tiempoComandas;
    this.cofres = cofres;
    this.items = items;
  }
}

module.exports = {
  MapaTutorial: class MapaTutorial extends Mapa {
    constructor() {
      let casillas = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,2,8,2,8,2,2,7,7,2,9,6,2,1,1,1,1],
        [1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1],
        [1,1,1,1,2,5,2,5,2,2,2,10,4,2,3,2,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ];

      let recetas = [
        RECETAS.RecetaArco,
      ];

      let cofres = {
        "5,2": ITEMS.ItemTronco,
        "7,2": ITEMS.ItemCobweb,
      };

      let items = {
        "9,9": ITEMS.ItemPlatoCrafteo,
        "10,9": ITEMS.ItemPlatoCrafteo,
      };

      super(casillas, recetas, cofres, items, 15, 20000);
    }
  },
};
