class Item {
  constructor(scene, nombre) {
    this.scene = scene;
    this.nombre = nombre;
    this.escala = 0.4;
  }
}

class ItemTronco extends Item {
  constructor(scene) {
    super(scene, 'tronco');
  }
}

class ItemPalo extends Item {
  constructor(scene) {
    super(scene, 'palo');
  }
}
