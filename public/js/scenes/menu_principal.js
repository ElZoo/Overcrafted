class SceneMenuPrincipal extends Phaser.Scene {
  constructor() {
    super('menu_principal');
  }

  preload() {
    let self = this;

    if(!this.game.socket) {
      this.game.socket = io();
    } else {
      this.game.socket.removeAllListeners();
    }

    this.game.socket.on('instancia_conectado', function(datos) {
      document.getElementById('nick').style.display = "none";
      self.game.nivel = datos[0];
      self.game.jugadores = datos[1];
      self.game.bloques = datos[2];
      self.game.comandas = datos[3];
      self.game.nombrePj = datos[4];
      self.game.puntos = datos[5];
      self.game.fechaCreacion = new Date(datos[6]);
      self.game.tiempoMax = datos[7];
      self.scene.start('scene_mundo');
    });
  }

  create() {
    let self = this;

    if(this.game.segunda) {
      return;
    } else {
      this.game.segunda = true;
    }

    this.add.image(0, 0, 'fondo_menu').setOrigin(0.25, 0.25);
    this.add.image(0, 0, 'vignette').setOrigin(0,0);

    this.add.image(this.game.config.width*0.5, 190, 'logo');

    let elemento = document.getElementById('nick');
    elemento.style.display = "block";
    elemento.focus();

    var nombre_cookie = Cookies.get('nick_overcrafted');
    if(nombre_cookie) {
      elemento.value = nombre_cookie;
    }

    this.crearBoton(50, 60, 'JUGAR', function() {
      if(!elemento.value || !elemento.value.trim()) {
        elemento.value = "";
        elemento.placeholder = "¡Debes introducir tu nick!";
        elemento.focus();
        return;
      }

      Cookies.set('nick_overcrafted', elemento.value, {expires: 30});

      self.game.socket.emit('matchMaking', elemento.value);
    });

    this.crearBoton(50, 70, 'Puntuaciones', function() {
      self.scene.start('scene_puntuaciones');
    });

    this.crearBoton(50, 80, 'Ir al foro', function() {
      window.location = 'https://elzoo.es/';
    });

    if(this.game.cancion) {
      this.game.cancion.destroy();
      this.game.cancion = false;
    }
    this.game.cancion = this.sound.add('musica_menu', {loop: true, volume: 0.25});
    this.game.cancion.play();
  }

  crearBoton(px, py, texto, callback) {
    let self = this;

    let x = pw(px);
    let y = ph(py);

    let boton = this.add.container(x, y);

    let cajaBoton = this.add.sprite(0,0, 'boton');
    cajaBoton.setScale(1.5,2.5);
    cajaBoton.setInteractive({'cursor': 'pointer'});
    boton.add(cajaBoton);

    let textoInstancia = this.add.text(0, 0, texto);
    textoInstancia.setFontSize(25);
    textoInstancia.setFontFamily('Verdana');
    textoInstancia.setFontStyle('bold');
    textoInstancia.setOrigin(0.5, 0.5);
    boton.add(textoInstancia);

    cajaBoton.on('pointerdown', function() {
      self.sound.play('click', {volume: 0.5});
    });

    cajaBoton.on('pointerup', callback);

    cajaBoton.on('pointerover', function() {
      cajaBoton.setTint(0xaa99ff);
    });

    cajaBoton.on('pointerout', function() {
      cajaBoton.clearTint();
    });
  }
}
