class ScenePrecarga extends Phaser.Scene {
  constructor() {
    super('precarga');
  }

  preload() {
    this.load.image('totem_of_undying', 'res/totem_of_undying.png');
    this.load.image('fondo_menu', 'res/fondo_menu.png');

    this.load.image('basura', 'res/basura.png');
    this.load.image('barrera', 'res/barrera.png');
    this.load.image('encimera', 'res/encimera.png');
    this.load.image('entregar', 'res/entregar.png');
    this.load.image('fregadero', 'res/fregadero.png');
    this.load.image('horno_off', 'res/horno_off.png');
    this.load.image('horno_on', 'res/horno_on.png');
    this.load.image('mesa_cortar', 'res/mesa_cortar.png');
    this.load.image('suelo', 'res/suelo.png');
  }

  create() {
    this.scene.launch('menu_principal');
  }
}
