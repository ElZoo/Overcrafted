class SceneGameover extends Phaser.Scene {
  constructor() {
    super('gameover');
  }

  create() {
    if(this.game.cancion) {
      this.game.cancion.destroy();
    }

    let color = Phaser.Display.Color.HexStringToColor('#212121').color;
    this.add.rectangle(0,0,this.game.config.width,this.game.config.height,color).setOrigin(0,0);

    this.add.text(pw(50), ph(30), "GAMEOVER")
      .setFontSize(48).setFontFamily('Verdana').setFontStyle('bold').setOrigin(0.5);

    this.add.text(pw(50), ph(50), "No has conseguido suficientes puntos para pasar de nivel...")
      .setFontSize(24).setFontFamily('Verdana').setOrigin(0.5);

    let self = this;

    let x = pw(50);
    let y = ph(70);

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
