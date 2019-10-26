class ScenePrecarga extends Phaser.Scene {
  constructor() {
    super('precarga');
  }

  preload() {
    //GUI
    this.load.image('totem_of_undying', 'res/totem_of_undying.png');
    this.load.image('fondo_menu', 'res/fondo_menu.png');

    //bloques
    this.load.image('basura', 'res/basura.png');
    this.load.image('barrera', 'res/barrera.png');
    this.load.image('cofre', 'res/cofre.png');
    this.load.image('encimera', 'res/encimera.png');
    this.load.image('entregar', 'res/entregar.png');
    this.load.image('fregadero', 'res/fregadero.png');
    this.load.image('horno_off', 'res/horno_off.png');
    this.load.image('horno_on', 'res/horno_on.png');
    this.load.image('mesa_cortar', 'res/mesa_cortar.png');
    this.load.image('suelo', 'res/suelo.png');

    //personajes
    this.load.atlas('zombie', 'res/zombie.png', 'res/zombie.json');

    //items
    this.load.image('tronco', 'res/tronco.png');
    this.load.image('palo', 'res/palo.png');
    this.load.image('grava', 'res/grava.png');
    this.load.image('flint', 'res/flint.png');
    this.load.image('pluma', 'res/pluma.png');
    this.load.image('cobweb', 'res/cobweb.png');
    this.load.image('cuerda', 'res/cuerda.png');
    this.load.image('lingote_hierro', 'res/lingote_hierro.png');
    this.load.image('mena_hierro', 'res/mena_hierro.png');
    this.load.image('plato_crafteo', 'res/plato_crafteo.png');
  }


  create() {
    this.anims.create({
      key: 'zombie_walk_front',
      frames: this.anims.generateFrameNames('zombie', {prefix: 'zombie_walk_front_', end: 3}),
      repeat: -1,
      yoyo: false,
      frameRate: 8
    });
    this.anims.create({
      key: 'zombie_walk_right',
      frames: this.anims.generateFrameNames('zombie', {prefix: 'zombie_walk_right_', end: 3}),
      repeat: -1,
      yoyo: false,
      frameRate: 8
    });
    this.anims.create({
      key: 'zombie_walk_back',
      frames: this.anims.generateFrameNames('zombie', {prefix: 'zombie_walk_back_', end: 3}),
      repeat: -1,
      yoyo: false,
      frameRate: 8
    });
    this.anims.create({
      key: 'zombie_walk_left',
      frames: this.anims.generateFrameNames('zombie', {prefix: 'zombie_walk_left_', end: 3}),
      repeat: -1,
      yoyo: false,
      frameRate: 8
    });

    //TODO Cambiar esto al final
    //this.scene.launch('menu_principal');
    this.scene.launch('scene_mundo');
  }
}
