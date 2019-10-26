class Item {
  constructor(nombre) {
    this.nombre = nombre;
    this.escala = 0.4;

    this.bloquesAceptados = [];
  }

  cortar(bloque){



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

  cortar(bloque){

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
