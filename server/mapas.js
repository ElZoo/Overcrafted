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
    this.oscurecer = false;
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
        [1,1,1,1,2,7,7,8,2,8,2,8,2,1,1,1,1,1,1,1],
        [1,1,1,1,2,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1],
        [1,1,1,1,2,0,2,2,2,2,2,2,2,2,2,2,1,1,1,1],
        [1,1,1,1,4,0,0,0,0,0,0,0,0,0,0,6,1,1,1,1],
        [1,1,1,1,10,0,0,0,0,0,0,0,0,0,0,9,1,1,1,1],
        [1,1,1,1,2,2,2,2,2,2,2,0,2,2,2,2,1,1,1,1],
        [1,1,1,1,2,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1],
        [1,1,1,1,2,5,2,5,2,2,2,3,2,1,1,1,1,1,1,1],
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

      super(casillas, recetas, cofres, items, 240, 20000, 120, [540, 275], module.exports.MapaFundicion);
    }
  },

  MapaFundicion: class MapaFundicion extends Mapa {
    constructor() {
      let casillas = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,7,7,7,7,2,8,2,8,2,8,4,10,1,1,1,1],
        [1,1,1,1,0,0,0,0,2,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,2,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,3,0,2,2,2,2,2,2,2,2,0,2,1,1,1,1],
        [1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1],
        [1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1],
        [1,1,1,1,2,0,0,2,0,0,0,0,0,0,0,2,1,1,1,1],
        [1,1,1,1,2,5,5,2,2,2,2,2,2,6,9,2,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ];

      let recetas = [
        RECETAS.RecetaEspadaHierro,
        RECETAS.RecetaHachaOro,
        RECETAS.RecetaEscudo,
        RECETAS.RecetaMinecart,
      ];

      let cofres = {
        "9,2": ITEMS.ItemTronco,
        "11,2": ITEMS.ItemMenaOro,
        "13,2": ITEMS.ItemMenaHierro,
      };

      let items = {
        "8,9": ITEMS.ItemPlatoCrafteo,
        "9,9": ITEMS.ItemPlatoCrafteo,
        "10,9": ITEMS.ItemPlatoCrafteo,
      };

      super(casillas, recetas, cofres, items, 240, 10000, 160, [575, 240], module.exports.MapaOscuro);
    }
  },

  MapaOscuro: class MapaOscuro extends Mapa {
    constructor() {
      let casillas = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      	[1,1,1,1,2,2,8,2,8,2,2,7,7,7,7,2,1,1,1,1],
      	[1,1,1,1,2,0,0,0,0,0,2,0,0,0,0,2,1,1,1,1],
      	[1,1,1,1,2,0,0,0,0,0,2,0,2,2,0,2,1,1,1,1],
      	[1,1,1,1,2,2,2,2,0,2,2,2,2,0,0,2,1,1,1,1],
      	[1,1,1,1,3,0,0,0,0,0,2,0,0,0,0,2,1,1,1,1],
      	[1,1,1,1,2,2,0,2,2,2,2,0,0,0,0,2,1,1,1,1],
      	[1,1,1,1,2,0,0,0,0,0,0,0,2,0,0,2,1,1,1,1],
      	[1,1,1,1,2,5,2,5,2,10,4,2,2,6,9,2,1,1,1,1],
      	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ];

      let recetas = [
        RECETAS.RecetaAntorcha,
        RECETAS.RecetaAntorcha,
        RECETAS.RecetaAntorcha,
        RECETAS.RecetaMinecart,
      ];

      let cofres = {
        "6,2": ITEMS.ItemTronco,
        "8,2": ITEMS.ItemMenaHierro,
      };

      let items = {
        "5,5": ITEMS.ItemPlatoCrafteo,
        "6,5": ITEMS.ItemPlatoCrafteo,
        "7,5": ITEMS.ItemPlatoCrafteo,
      };

      super(casillas, recetas, cofres, items, 240, 20000, 160, [540, 260], false);

      this.oscurecer = true;
    }
  },
};
