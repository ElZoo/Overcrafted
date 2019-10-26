class Item {
  constructor(scene, nombre) {
    this.scene = scene;
    this.nombre = nombre;
  }
}

class ItemTronco extends Item {
  constructor(scene) {
    super(scene, 'tronco');
  }
}
