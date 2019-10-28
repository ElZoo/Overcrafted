class SceneMenuPrincipal extends Phaser.Scene {
  constructor() {
    super('menu_principal');
  }

  create() {
    this.add.image(0, 0, 'fondo_menu').setOrigin(0.25, 0.25);
    this.add.image(0, 0, 'vignette').setOrigin(0,0);

    this.add.image(this.game.config.width*0.5, 125, 'logo');

    this.scene.launch('scene_menu_salas');
    this.scene.setVisible(true, "scene_menu_salas");

    this.crearBotonForo();
    this.crearBotonScore();

    this.game.cancion = this.sound.add('musica_menu', {loop: true, volume: 0.25});
    this.game.cancion.play();
  }

  crearBotonForo() {
    let width = pw(25);
    let height = width*0.25;

    let x = pw(10) + width*0.5;
    let y = ph(90);

    let boton = this.add.container(x, y);

    let cajaBoton = this.add.sprite(0,0, 'boton');
    cajaBoton.setScale(1.5,2.5);
    cajaBoton.setInteractive({'cursor': 'pointer'});
    cajaBoton.on('pointerup', function() {
      window.location = 'https://elzoo.es';
    });
    boton.add(cajaBoton);

    let textoInstancia = this.add.text(0, 0, 'Vente al foro');
    textoInstancia.setFontSize(35);
    textoInstancia.setFontFamily('Verdana');
    textoInstancia.setFontStyle('bold');
    textoInstancia.setOrigin(0.5, 0.5);
    boton.add(textoInstancia);

    cajaBoton.on('pointerover', function() {
      cajaBoton.setTint(0xaa99ff);
    });

    cajaBoton.on('pointerout', function() {
      cajaBoton.clearTint();
    });
  }

  crearBotonScore(){

    let self = this;

    let width = pw(25);
    let height = width*0.25;

    let x = pw(90) - width*0.5;
    let y = ph(90);

    let boton = this.add.container(x, y);

    let cajaBoton = this.add.sprite(0,0, 'boton');
    cajaBoton.setScale(1.5,2.5);
    cajaBoton.setInteractive({'cursor': 'pointer'});
    cajaBoton.on('pointerup', function() {
      self.scene.setVisible(false, "scene_menu_salas");
      self.scene.start('scene_puntuaciones');
    });
    boton.add(cajaBoton);

    let textoInstancia = this.add.text(0, 0, 'Puntuaciones');
    textoInstancia.setFontSize(35);
    textoInstancia.setFontFamily('Verdana');
    textoInstancia.setFontStyle('bold');
    textoInstancia.setOrigin(0.5, 0.5);
    boton.add(textoInstancia);

    cajaBoton.on('pointerover', function() {
      cajaBoton.setTint(0xaa99ff);
    });

    cajaBoton.on('pointerout', function() {
      cajaBoton.clearTint();
    });

  }

}
