class SceneFinTutorial extends Phaser.Scene {
  constructor() {
    super('finTutorial');
  }

  create() {
    if(this.game.cancion) {
      this.game.cancion.destroy();
      this.game.cancion = false;
    }

    let color = Phaser.Display.Color.HexStringToColor('#212121').color;
    this.add.rectangle(0,0,this.game.config.width,this.game.config.height,color).setOrigin(0,0);

    this.add.text(pw(50), ph(30), "¡HAS COMPLETADO EL TUTORIAL!")
      .setFontSize(48).setFontFamily('Verdana').setFontStyle('bold').setOrigin(0.5);

    this.add.text(pw(50), ph(50), "Dale a salir y juega de nuevo para entrar a un nivel de verdad")
      .setFontSize(24).setFontFamily('Verdana').setOrigin(0.5);

    this.add.text(pw(50), ph(60), "El juego es más divertido con amigos. Terminad el tutorial todos y dadle a la vez a jugar para ir juntos")
      .setFontSize(18).setFontFamily('Verdana').setOrigin(0.5);

    let self = this;

    let x = pw(50);
    let y = ph(80);

    let boton = this.add.container(x, y);

    let cajaBoton = this.add.sprite(0,0, 'boton');
    cajaBoton.setScale(1.5,2.5);
    cajaBoton.setInteractive({'cursor': 'pointer'});
    boton.add(cajaBoton);

    let textoInstancia = this.add.text(0, 0, "SALIR");
    textoInstancia.setFontSize(25);
    textoInstancia.setFontFamily('Verdana');
    textoInstancia.setFontStyle('bold');
    textoInstancia.setOrigin(0.5, 0.5);
    boton.add(textoInstancia);

    cajaBoton.on('pointerdown', function() {
      self.sound.play('click', {volume: 0.5});
    });

    cajaBoton.on('pointerup', function() {
      self.scene.stop();
      self.scene.launch('menu_principal');
    });

    cajaBoton.on('pointerover', function() {
      cajaBoton.setTint(0xaa99ff);
    });

    cajaBoton.on('pointerout', function() {
      cajaBoton.clearTint();
    });
  }
}
