class ScenePrecarga extends Phaser.Scene {
  constructor() {
    super('precarga');
  }

  preload() {
    //GUI
    this.load.image('totem_of_undying', 'res/totem_of_undying.png');
    this.load.image('fondo_menu', 'res/fondo_menu.png');
    this.load.image('mapa', 'res/mapa.png');
    this.load.image('reloj', 'res/reloj.png');
    this.load.image('barraFondo', 'res/barraFondo.png');
    this.load.image('barraArriba', 'res/barraArriba.png');
    this.load.image('item_frame', 'res/item_frame.png');
    this.load.image('cajaItem', 'res/cajaItem.png');
    this.load.image('boton', 'res/boton.png');
    this.load.image('backTexto', 'res/backTexto.png');
    this.load.image('vignette', 'res/vignette.png');
    this.load.image('botonAlto', 'res/botonAlto.png');
    this.load.image('emerald', 'res/emerald.png');
    this.load.image('reloj','res/reloj.png');
    this.load.image('logo','res/logo.png');


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
    this.load.image('pila', 'res/pila.png');
    this.load.image('recibir', 'res/recibir.png');
    this.load.image('suelo', 'res/suelo.png');

    //personajes
    this.load.atlas('zombie', 'res/zombie.png', 'res/zombie.json');
    this.load.atlas('esqueleto', 'res/esqueleto.png', 'res/esqueleto.json');
    this.load.atlas('pigman', 'res/pigman.png', 'res/pigman.json');
    this.load.atlas('creeper', 'res/creeper.png', 'res/creeper.json');

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
    this.load.image('plato_sucio', 'res/plato_sucio.png');

    //items finales
    this.load.image('arco', 'res/arco.png');
    this.load.image('flecha', 'res/flecha.png');
    this.load.image('espada_hierro', 'res/espada_hierro.png');

    //audio
    this.load.audio('pop', 'res/audio/pop.ogg');
    this.load.audio('colocar', 'res/audio/colocar.ogg');
    this.load.audio('basura', 'res/audio/basura.ogg');
    this.load.audio('fregadero', 'res/audio/fregadero.ogg');
    this.load.audio('lavar', 'res/audio/lavar.ogg');
    this.load.audio('meter_horno', 'res/audio/meter_horno.ogg');
    this.load.audio('cortar', 'res/audio/cortar.ogg');
    this.load.audio('craftear', 'res/audio/craftear.ogg');
    this.load.audio('in', 'res/audio/in.ogg');
    this.load.audio('out', 'res/audio/out.ogg');
    this.load.audio('bell', 'res/audio/bell.ogg');

    this.load.audio('musica_juego', 'res/audio/musica_juego.ogg');
    this.load.audio('musica_menu', 'res/audio/musica_menu.ogg');

    for(let i=1; i<=6; i++) {
      this.load.audio('step_'+i, 'res/audio/step_'+i+'.ogg');
    }
  }


  create() {
    var self = this;

    let dirs = [
      'front', 'right', 'back', 'left',
      'frontright', 'frontleft', 'backright', 'backleft',
    ];
    let pjs = [
      'zombie', 'esqueleto', 'pigman', 'creeper'
    ];

    for(let p in pjs) {
      let pj = pjs[p];

      for(let i in dirs) {
        let dir = dirs[i];
        this.anims.create({
          key: pj+'_walk_'+dir,
          frames: this.anims.generateFrameNames(pj, {prefix: pj+'_walk_'+dir+'_', end: 3}),
          repeat: -1,
          yoyo: false,
          frameRate: 8,
        });
      }
    }

    this.scene.launch('menu_principal');
  }
}
