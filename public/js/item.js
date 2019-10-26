class Item {
  constructor(nombre) {
    this.nombre = nombre;
    this.escala = 0.4;

    this.bloquesAceptados = [];
  }

  cortar(bloque) {
  }

}

class ItemPlatoCrafteo extends Item {
  constructor() {
    super('plato_crafteo');

    this.bloquesAceptados = [
      'encimera',
    ];
  }
}

class ItemTronco extends Item {
  constructor() {
    super('tronco');

    this.bloquesAceptados = [
      'encimera',
      'mesa_cortar',
      'basura',
    ];
  }

  cortar(bloque){
    return new ItemPalo(bloque.scene);
  }
}

class ItemPalo extends Item {
  constructor() {
    super('palo');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemGrava extends Item {
  constructor() {
    super('grava');

    this.bloquesAceptados = [
      'encimera',
      'mesa_cortar',
      'basura',
    ];
  }

  cortar(bloque) {
    return new ItemFlint(bloque.scene);
  }
}

class ItemFlint extends Item {
  constructor() {
    super('flint');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemPluma extends Item {
  constructor() {
    super('pluma');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemCobweb extends Item {
  constructor() {
    super('cobweb');

    this.bloquesAceptados = [
      'encimera',
      'mesa_cortar',
      'basura',
    ];
  }
}

class ItemCuerda extends Item {
  constructor() {
    super('cuerda');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemMenaHierro extends Item {
  constructor() {
    super('mena_hierro');

    this.bloquesAceptados = [
      'encimera',
      'horno_off',
      'basura',
    ];
  }
}

class ItemLingoteHierro extends Item {
  constructor() {
    super('lingote_hierro');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}
