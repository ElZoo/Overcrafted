class ScenePrecarga extends Phaser.Scene {
  constructor() {
    super('precarga');
  }

  preload() {
    this.load.image('totem_of_undying', 'res/totem_of_undying.png');
  }

  create() {
    this.scene.launch('menu_principal');
  }
}
