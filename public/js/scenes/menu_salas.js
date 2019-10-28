class SceneMenuSalas extends Phaser.Scene {
  constructor() {
    super('scene_menu_salas');
  }

  create() {
    let self = this;

    let width = pw(80);
    let height = ph(46);

    let x = pw(10);
    let y = ph(34);
    this.cameras.main.setViewport(x, y, width, height);
    this.numInstancias = 0;

    this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
      let width = pw(80);
      let height = width*0.1;

      let yMax = self.numInstancias * (height + height*0.1) - ph(50);

      self.cameras.main.scrollY += deltaY * 0.25;
      self.cameras.main.scrollY = Math.max(0, self.cameras.main.scrollY);
      self.cameras.main.scrollY = Math.min(yMax, self.cameras.main.scrollY);
    });

    this.game.socket = io();
    this.game.socket.on('instancias', function(instancias) {
      for(let i in instancias) {
        let instancia = instancias[i];
        self.crearBotonInstancia(instancia.id, instancia.jugadores);
      }
    });

    this.game.socket.on('instancia_conectado', function(datos) {
      self.game.nivel = datos[0];
      self.game.jugadores = datos[1];
      self.game.bloques = datos[2];
      self.game.comandas = datos[3];
      self.scene.setVisible(false, "scene_menu_salas");
      self.scene.get('menu_principal').scene.start('scene_mundo');
    });
  }

  crearBotonInstancia(id, jugadores) {
    let self = this;

    let width = pw(80);
    let height = width*0.1;

    let x = width * 0.5;
    let y = this.numInstancias * (height + height*0.1) + height * 0.5;

    let boton = this.add.container(x, y);

    let cajaBoton = this.add.sprite(0,0, 'backTexto');
    cajaBoton.setScale(4,3.3);
    cajaBoton.setAlpha(1);
    boton.add(cajaBoton);

    let containerIcono = this.add.container(0-width*0.5+width*0.25, 0);
    boton.add(containerIcono);

    let iconoPlayers = this.add.image(0, 0, 'totem_of_undying');
    iconoPlayers.setScale(4,4);
    containerIcono.add(iconoPlayers);

    let numP = jugadores;
    let textoPlayers = this.add.text(10, 10, numP+'/4');
    textoPlayers.setFontSize(25);
    textoPlayers.setFontFamily('Verdana');
    textoPlayers.setFontStyle('bold');
    containerIcono.add(textoPlayers);

    let textoInstancia = this.add.text(0, 0, 'Instancia '+id);
    textoInstancia.setFontSize(35);
    textoInstancia.setFontFamily('Verdana');
    textoInstancia.setFontStyle('bold');
    textoInstancia.setOrigin(0.5, 0.5);
    boton.add(textoInstancia);

    let containerUnirse = this.add.container(width*0.5 - width * 0.25, 0);
    boton.add(containerUnirse);

    let cajaUnirse = this.add.sprite(0,0, 'botonAlto');
    cajaUnirse.setScale(0.27,0.6);
    cajaUnirse.setInteractive({'cursor': 'pointer'});
    containerUnirse.add(cajaUnirse);

    cajaUnirse.on('pointerover', function() {
      cajaUnirse.setTint(0xaa99ff);
    });

    cajaUnirse.on('pointerout', function() {
      cajaUnirse.clearTint();
    });

    cajaUnirse.on('pointerup', function() {
      self.game.socket.emit('joinInstancia', id);
    });

    let textoUnirse = this.add.text(0, 0, '►');
    textoUnirse.setOrigin(0.5, 0.5);
    textoUnirse.setFontSize(35);
    textoUnirse.setFontFamily('Verdana');
    textoUnirse.setFontStyle('bold');
    containerUnirse.add(textoUnirse);

    this.numInstancias++;
  }
}
