class SceneHud extends Phaser.Scene {
  constructor() {
    super('hud');
  }

  create() {
    this.comandas = 0;

    this.crearComanda('arco', ['tronco', 'cobweb'], 60);
    this.crearComanda('flecha', ['tronco', 'grava', 'pluma'], 90);
    this.crearComanda('espada_hierro', ['tronco', 'mena_hierro'], 120);
  }

  crearComanda(itemPrincipal, subItems, tiempoMax) {
    let ctComanda = this.add.container(12, 20 + this.comandas * 128);

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
    barraArriba.setOrigin(0).setScale(1,1.5);
    ctBarra.add(barraArriba);

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

      let imgItem = this.add.image(16, 16, subItem);
      imgItem.setScale(0.2);
      ctSubItem.add(imgItem);
    }

    let tiempoInicio = new Date();
    let inter = setInterval(function() {
      let tiempoNow = new Date();
      let diff = (tiempoNow - tiempoInicio) / 1000;
      let rel = 1 - (diff / tiempoMax);

      barraArriba.setScale(rel, 1.5);

      if(rel <= 0) {
        clearInterval(inter);
      }
    }, 200);

    this.comandas++
  }
}
