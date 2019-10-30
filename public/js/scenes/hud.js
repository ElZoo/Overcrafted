class SceneHud extends Phaser.Scene {
  constructor() {
    super('hud');
  }

  init() {
    let self = this;

    this.game.socket.on('nueva_comanda', function(comanda) {
      self.nuevaComanda(comanda);
    });

    this.game.socket.on('quitar_comanda', function(comanda_id) {
      for(let i in self.comandas) {
        let comanda = self.comandas[i];

        if(comanda && comanda.id == comanda_id) {
          if(comanda.container) {
            self.sound.play('out', {volume: 4});

            self.tweens.add({
              targets: comanda.container,
              x: -300,
              duration: 1000,
              onComplete: function() {
                comanda.container.destroy();
              }
            });
          }

          self.comandas[i] = false;
          break;
        }
      }
    });

    this.game.socket.on('update_comanda', function(data) {
      for(let i in self.comandas) {
        let comanda = self.comandas[i];

        if(comanda && comanda.id == data[0]) {
          comanda.tiempo = data[1];
          comanda.barra.setScale(comanda.tiempo, 1.5);
        }
      }
    });
  }

  create() {
    this.comandas = {};

    for(let id in this.game.comandas) {
      let comanda = this.game.comandas[id];
      this.nuevaComanda(comanda);
    }
    this.cronometro();
    this.crearPuntuacion();
  }

  comenzarTutorial(mundo) {
    let ctTutorial = this.add.container(this.game.config.width*0.5, 40);

    let fondoTutorial = this.add.image(0,0, 'backTexto');
    fondoTutorial.setScale(4, 1.75);
    ctTutorial.add(fondoTutorial);

    this.ctTutorial = ctTutorial;

    this.pasoTuto = 0;
    this.siguientePasoTuto(mundo);
  }

  siguientePasoTuto(mundo) {
    let self = this;

    this.pasoTuto++;

    if(this.textoTutorial) {
      this.textoTutorial.destroy();
    }
    if(this.tweenTutorial) {
      this.tweenTutorial.stop();
      this.tweenTutorial.targets[0].setAlpha(1);
    }

    let msg = "";
    let targetBlock = false

    if(this.pasoTuto == 1) {
      msg = 'Para hacer esta receta, necesitas cortar un tronco y una tela de araña. Ve al cofre de arriba y pilla un tronco (Tecla E)';
      targetBlock = "5,2";
    } else if(this.pasoTuto == 2) {
      msg = 'Ahora coloca el tronco en la mesa de cortar y córtalo (Tecla Q)';
      targetBlock = "5,9";
    } else if(this.pasoTuto == 3 || this.pasoTuto == 6) {
      msg = 'Lleva el item hasta el plato de crafteo';
      targetBlock = "9,9";
    } else if(this.pasoTuto == 4) {
      msg = '¡Muy bien! Ahora ve a por la tela de araña';
      targetBlock = "7,2";
    } else if(this.pasoTuto == 5) {
      msg = '¡Córtala! ¡Corre! El tiempo es muy valioso. Puedes ver cuanto te queda arriba a la derecha';
      targetBlock = "7,9";
    } else if(this.pasoTuto == 7) {
      msg = '¡Guay! Ahora entrega el plato en el bloque de arriba a la derecha';
      targetBlock = "14,2";
    } else if(this.pasoTuto == 8) {
      msg = '¡Enhorabuena! Acabas de entregar tu primera comanda. Ahora espera a que te devuelvan el plato';
      targetBlock = false;
    } else if(this.pasoTuto == 9) {
      msg = 'Pilla el plato sucio';
      targetBlock = "13,2";
    } else if(this.pasoTuto == 10) {
      msg = "Y ahora llevalo abajo, al fregadero y lávalo (Tecla Q)";
      targetBlock = "12,9";
    } else if(this.pasoTuto == 11) {
      msg = "¡Enhorabuena! Has completado el tutorial. Entrega todas las comandas que puedas hasta que se te acabe el tiempo";
      targetBlock = false;
    } else if(this.pasoTuto == 12) {
      msg = "Si te equivocas, puedes tirar el plato a la basura (el bloque de abajo a la derecha)";
      targetBlock = "14,9";
    } else if(this.pasoTuto == 13) {
      this.ctTutorial.destroy();
      return;
    }

    this.textoTutorial = this.make.text({
      x: 0,
      y: 0,
      text: msg,
      origin: {x: 0.5, y: 0.5},
      style: {
        font: '16px Verdana',
        fill: 'white',
        wordWrap: {
          width: self.ctTutorial.list[0].width*4 - 32,
          useAdvancedWrap: true
        }
      }
    });
    this.ctTutorial.add(this.textoTutorial);

    if(targetBlock) {
      let bloque = mundo.tilesMundo[targetBlock];

      this.tweenTutorial = this.tweens.add({
        targets: bloque.textura,
        duration: 500,
        yoyo: true,
        repeat: -1,
        alpha: 0.33,
      });
    }
  }

  sumarPuntos(cant) {
    this.game.puntos += cant;
    this.textoPuntuacion.setText(this.game.puntos);
  }

  cronometro() {
    let self = this;

    let xFinal = this.game.config.width*0.85;

    let ctCronometro = this.add.container(this.game.config.width+200, 40);
    let fondoPuntuacion = this.add.image(-44,-25,'backTexto').setOrigin(0,0);
    fondoPuntuacion.setScale(1.4,2.5)
    ctCronometro.add(fondoPuntuacion);

    let iconoReloj = this.add.image(0,13, 'reloj');
    iconoReloj.setScale(0.8)
    ctCronometro.add(iconoReloj);

    let textoCronometro = this.add.text(40,0,'00:00');
    textoCronometro.setFontSize(25);
    textoCronometro.setFontFamily('Verdana');
    textoCronometro.setFontStyle('bold');
    ctCronometro.add(textoCronometro);

    this.tweens.add({
      targets: ctCronometro,
      x: xFinal,
      duration: 200
    });

    this.time.addEvent({
      delay: 250,
      loop: true,
      callback: function() {
        let tiempoAhora = new Date();
        let pr = (tiempoAhora - self.game.fechaCreacion) / 1000;
        let diff = self.game.tiempoMax - pr;

        let prct = pr/self.game.tiempoMax;
        if(prct > 0.9) {
          self.game.cancion.rate = 1.3;
        } else if(prct > 0.8) {
          self.game.cancion.rate = 1.2;
        } else if(prct > 0.75) {
          self.game.cancion.rate = 1.1;
        } else {
          self.game.cancion.rate = 1;
        }


        let mins = Math.floor(diff / 60);
        if(mins < 0) {
          mins = 0;
        }
        if(mins < 10) {
          mins = "0"+mins;
        }

        let secs = Math.floor(diff % 60);
        if(secs < 0) {
          secs = 0;
        }
        if(secs < 10) {
          secs = "0"+secs;
        }

        textoCronometro.setText(mins+":"+secs);
      }
    });
  }

  crearPuntuacion(){
    let xFinal = this.game.config.width*0.85;
    let ctPuntuacion = this.add.container(this.game.config.width+200,this.game.config.height*0.9);

    let fondoPuntuacion = this.add.image(-44,-25,'backTexto').setOrigin(0,0);
    fondoPuntuacion.setScale(1.4,2.5)
    ctPuntuacion.add(fondoPuntuacion);

    let iconoEmerald = this.add.image(0,13, 'emerald');
    iconoEmerald.setScale(3,3)
    ctPuntuacion.add(iconoEmerald);

    let textoPuntuacion = this.add.text(40,0,this.game.puntos);
    textoPuntuacion.setFontSize(25);
    textoPuntuacion.setFontFamily('Verdana');
    textoPuntuacion.setFontStyle('bold');
    ctPuntuacion.add(textoPuntuacion);

    this.textoPuntuacion = textoPuntuacion;

    this.tweens.add({
      targets: ctPuntuacion,
      x: xFinal,
      duration: 200
    });
  }

  nuevaComanda(comanda) {
    let self = this;

    let numComandas = Object.keys(this.comandas).length;
    let itemPrincipal = comanda.itemPrincipal;
    let subItems = comanda.items;
    let tiempoMax = comanda.tiempoMax;

    let numComanda = -1;
    for(let i in this.comandas) {
      if(!this.comandas[i]) {
        numComanda = i;
        break;
      }
    }
    if(numComanda == -1) {
      numComanda = Object.keys(this.comandas).length;
    }

    this.comandas[numComanda] = comanda;
    let ctComanda = this.add.container(-300, 20 + numComanda * 128);

    this.tweens.add({
      targets: ctComanda,
      x: 12,
      duration: 1000,
      delay: 100 * numComanda,
      onStart: function() {
        self.sound.play('in', {volume: 4});
      }
    });

    this.comandas[numComanda]['container'] = ctComanda;

    /* IMAGEN DE FONDO */
    let fondo = this.add.image(0, 0, 'mapa');
    fondo.setOrigin(0).setScale(0.9);
    ctComanda.add(fondo);

    /* BARRA DE TIEMPO */
    let ctBarra = this.add.container(0, 0);
    ctComanda.add(ctBarra);

    let barraFondo = this.add.image(25, 20, 'barraFondo');
    barraFondo.setOrigin(0).setScale(1,1.5);
    ctBarra.add(barraFondo);

    let barraArriba = this.add.image(25, 20, 'barraArriba');
    barraArriba.setOrigin(0).setScale(comanda.tiempo, 1.5);
    ctBarra.add(barraArriba);

    this.comandas[numComanda]['barra'] = barraArriba;

    /* ITEM PRINCIPAL */
    let ctItem = this.add.container(25, 35);
    ctComanda.add(ctItem);

    let frame = this.add.image(0, 0, 'item_frame');
    frame.setOrigin(0);
    frame.setScale(1);
    ctItem.add(frame);

    let item = this.add.image(32, 32, itemPrincipal);
    item.setOrigin(0.5);
    item.setScale(1);
    ctItem.add(item);

    /* SUB ITEMS */
    for(let i in subItems) {
      let subItem = subItems[i];

      let ctSubItem = this.add.container(100 + 37*i, 35);
      ctComanda.add(ctSubItem);

      let caja = this.add.image(0, 0, 'cajaItem');
      caja.setOrigin(0);
      caja.setScale(1);
      ctSubItem.add(caja);

      let imgItem = this.add.image(16, 16, subItem.nombre);
      imgItem.setScale(0.2);
      ctSubItem.add(imgItem);

      if(subItem.extra) {
        let ctSubItemExtra = this.add.container(100 + 37*i, 67);
        ctComanda.add(ctSubItemExtra);

        let cajaExtra = this.add.image(0, 0, 'cajaItem');
        cajaExtra.setOrigin(0);
        cajaExtra.setScale(1);
        ctSubItemExtra.add(cajaExtra);

        let imgItemExtra = this.add.image(16, 16, subItem.extra);
        imgItemExtra.setScale(0.2);
        ctSubItemExtra.add(imgItemExtra);
      }
    }
  }
}
