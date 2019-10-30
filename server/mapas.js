var RECETAS = require('./receta.js');
var ITEMS = require('./items.js');

class Mapa {
  constructor(casillas, recetas, cofres, items, tiempoMax, tiempoComandas, puntosMinimos, coords, siguienteNivel) {
    this.casillas = casillas;
    this.recetas = recetas;
    this.tiempoMax = tiempoMax;
    this.tiempoComandas = tiempoComandas;
    this.cofres = cofres;
    this.items = items;
    this.puntosMinimos = puntosMinimos;
    this.siguienteNivel = siguienteNivel;
    this.coords = coords;
    this.tutorial = false;
  }
}

module.exports = {
  MapaTutorial: class MapaTutorial extends Mapa {
    constructor() {
      let casillas = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,2,8,2,8,2,2,2,2,2,9,6,2,1,1,1,1],
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

      super(casillas, recetas, cofres, items, 180, 15000, 20, [608, 250], module.exports.MapaFacil);

      this.tutorial = true;
    }
  },

  MapaFacil: class MapaFacil extends Mapa {
    constructor() {
      let casillas = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,8,2,8,2,9,6,2,4,10,8,2,8,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,2,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,2,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,2,2,2,2,2,2,2,2,2,2,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,0,0,2,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,2,0,0,0,0,0,3,0,0,0,0,2,1,1,1,1],
        [1,1,1,1,2,2,2,2,5,2,2,2,5,2,2,2,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ];

      let recetas = [
        RECETAS.RecetaArco,
        RECETAS.RecetaFlecha,
        RECETAS.RecetaFlecha,
      ];

      let cofres = {
        "4,2": ITEMS.ItemTronco,
        "6,2": ITEMS.ItemPluma,
        "13,2": ITEMS.ItemGrava,
        "15,2": ITEMS.ItemCobweb,
      };

      let items = {
        "10,3": ITEMS.ItemPlatoCrafteo,
        "10,4": ITEMS.ItemPlatoCrafteo,
      };

      super(casillas, recetas, cofres, items, 180, 20000, 60, [550, 200], module.exports.MapaHorno);
    }
  },

  MapaHorno: class MapaHorno extends Mapa {
    constructor() {
      let casillas = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,2,7,7,8,2,8,2,8,2,0,0,0,1,1,1,1],
        [1,1,1,1,2,0,0,0,0,0,0,0,2,0,0,0,1,1,1,1],
        [1,1,1,1,2,2,2,2,0,0,2,2,2,2,2,2,1,1,1,1],
        [1,1,1,1,4,0,0,0,0,0,0,0,0,0,0,6,1,1,1,1],
        [1,1,1,1,10,0,0,0,0,0,0,0,0,0,0,9,1,1,1,1],
        [1,1,1,1,2,2,2,2,0,0,2,2,2,2,2,2,1,1,1,1],
        [1,1,1,1,2,0,0,0,0,0,0,0,2,0,0,0,1,1,1,1],
        [1,1,1,1,2,5,2,5,2,2,2,3,2,0,0,0,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ];

      let recetas = [
        RECETAS.RecetaArco,
        RECETAS.RecetaEspadaHierro,
        RECETAS.RecetaEspadaHierro,
        RECETAS.RecetaEspadaHierro,
      ];

      let cofres = {
        "7,2": ITEMS.ItemTronco,
        "9,2": ITEMS.ItemCobweb,
        "11,2": ITEMS.ItemMenaHierro,
      };

      let items = {
        "6,4": ITEMS.ItemPlatoCrafteo,
        "6,7": ITEMS.ItemPlatoCrafteo,
      };

      super(casillas, recetas, cofres, items, 240, 20000, 120, [540, 260], false);
    }
  },
};
