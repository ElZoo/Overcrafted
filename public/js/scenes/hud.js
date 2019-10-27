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
            comanda.container.destroy();
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
  }

  nuevaComanda(comanda) {
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
    let ctComanda = this.add.container(12, 20 + numComanda * 128);

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
        ctSubItemExtra.add(imgItem);
      }
    }
  }
}
