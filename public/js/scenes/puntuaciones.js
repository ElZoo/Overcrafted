class ScenePuntuaciones extends Phaser.Scene {
  constructor() {
    super('scene_puntuaciones');
  }

  preload() {
    let self = this;

    this.game.socket.on('scores', function(data) {
      for(let i in data) {
        let jg = data[i];

        let texto = jg.nick + ": " + jg.puntos;

        let txt = self.add.text(pw(50), ph(30)+32*i, texto);
        txt.setFontSize(24);
        txt.setFontFamily('Verdana');
        txt.setOrigin(0.5, 0.5);

        if(i == 0) {
          txt.setColor("#ffeb3b");
        } else if(i == 1) {
          txt.setColor("#bdbdbd");
        } else if(i == 2) {
          txt.setColor("#f57c00");
        }

        if(i < 3) {
          txt.setFontStyle('bold');
        }
        if(i > 6) {
          txt.setAlpha(0.75);
        }
      }
    });
  }

  create() {
    if(this.game.cancion) {
      this.game.cancion.destroy();
      this.game.cancion = false;
    }

    let color = Phaser.Display.Color.HexStringToColor('#212121').color;
    this.add.rectangle(0,0,this.game.config.width,this.game.config.height,color).setOrigin(0,0);

    this.add.text(pw(50), ph(15), "TOP JUGADORES")
      .setFontSize(48).setFontFamily('Verdana').setFontStyle('bold').setOrigin(0.5);

    let self = this;

    let x = pw(50);
    let y = ph(90);

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
      self.game.segunda = false;
      self.scene.launch('menu_principal');
    });

    cajaBoton.on('pointerover', function() {
      cajaBoton.setTint(0xaa99ff);
    });

    cajaBoton.on('pointerout', function() {
      cajaBoton.clearTint();
    });

    this.game.socket.emit('getScore');
  }
}
