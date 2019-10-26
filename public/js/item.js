class Item {
  constructor(scene, nombre) {
    this.scene = scene;
    this.nombre = nombre;
    this.escala = 0.4;

    this.bloquesAceptados = [];
  }
}

class ItemTronco extends Item {
  constructor(scene) {
    super(scene, 'tronco');

    this.bloquesAceptados = [
      'encimera',
      'mesa_cortar',
      'basura',
    ];
  }
}

class ItemPalo extends Item {
  constructor(scene) {
    super(scene, 'palo');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemGrava extends Item {
  constructor(scene) {
    super(scene, 'grava');

    this.bloquesAceptados = [
      'encimera',
      'mesa_cortar',
      'basura',
    ];
  }
}

class ItemFlint extends Item {
  constructor(scene) {
    super(scene, 'flint');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemPluma extends Item {
  constructor(scene) {
    super(scene, 'pluma');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}
