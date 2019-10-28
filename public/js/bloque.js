function crearBloque(x, y, scene, id) {
  switch(id) {
    case 0:
      return new BloqueSuelo(x, y, scene);
    case 1:
      return new BloqueBarrera(x, y, scene);
    case 2:
      return new BloqueEncimera(x, y, scene);
    case 3:
      return new BloqueBasura(x, y, scene);
    case 4:
      return new BloqueFregadero(x, y, scene);
    case 5:
      return new BloqueMesaCortar(x, y, scene);
    case 6:
      return new BloqueEntregar(x, y, scene);
    case 7:
      return new BloqueHorno(x, y, scene);
    case 8:
      return new BloqueCofre(x, y, scene);
    case 9:
      return new BloqueRecibir(x, y, scene);
    case 10:
      return new BloquePila(x, y, scene);
  }
}

class Bloque {
  constructor(x, y, scene) {
    this.x = x;
    this.y = y;
    this.scene = scene;

    this.colision = false;
    this.usable = false;

    this.item = null;
  }

  coger(player) {
    if(this.item && !player.item) {
      //Darle el item al player
      player.item = this.item;
      this.item = null;

      if(player.item.textura) {
        player.item.textura.destroy();
      }
      player.pintarItem();
    } else if(!this.item && player.item) {
      //Cogerle el item al player
      if(!player.item.bloquesAceptados.includes(this.nombre)) {
        return;
      }

      this.item = player.item;
      player.item = null;

      if(this.item.textura) {
        this.item.textura.destroy();
      }
      this.scene.sound.play('colocar');
      this.pintarItem();
    }
  }

  usar(player) {}

  pintarItem() {}

  setTextura(val) {
    this.nombre = val;
    let dx = this.x * this.scene.tileTam;
    let dy = this.y * this.scene.tileTam;

    if(this.colision) {
      this.textura = this.scene.fisicaMundo.create(dx, dy, this.nombre);
      this.textura.setImmovable(true);
      this.textura.setSize(this.scene.tileTam, this.scene.tileTam, true);
      this.textura.setOffset(-this.textura.width*0.5, -this.textura.height*0.5);
      this.textura.depth = dy;
    } else {
      this.textura = this.scene.add.image(dx, dy, this.nombre);
    }
    this.textura.setScale(2,2);
  }
}

class BloqueCofre extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.setTextura('cofre');
    this.tipoItem = undefined;
  }

  setTipoItem(tipoItem) {
    this.tipoItem = tipoItem;
    this.item = new this.tipoItem;
    this.pintarItem();
  }

  coger(player) {
    if(!player.item) {
      player.item = this.item;
      this.item = new this.tipoItem;

      if(player.item.textura) {
        player.item.textura.destroy();
      }
      player.pintarItem();

      this.pintarItem();
    }
  }

  pintarItem() {
    let dx = this.x * this.scene.tileTam;
    let dy = this.y * this.scene.tileTam + 4;

    this.item.pintarItem(dx, dy, this.scene);
    this.item.textura.setScale(0.15, 0.15);
    this.item.textura.setTint(Phaser.Display.Color.RGBStringToColor('rgb(192, 192, 192)').color);
    this.item.textura.depth = dy + this.scene.tileTam*0.25;
  }
}

class BloqueSuelo extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.setTextura('suelo');
  }
}

class BloqueBarrera extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.setTextura('barrera');
  }
}

class BloqueEncimera extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.setTextura('encimera');
  }

  coger(player) {
    if(this.item && player.item && this.item.nombre == 'plato_crafteo') {
      if(player.item.nombre == 'plato_crafteo' || player.item.nombre == 'plato_sucio') {
        return;
      }
      this.item.craftear(player);
    } else {
      super.coger(player);
    }
  }

  pintarItem() {
    let dx = this.x * this.scene.tileTam;
    let dy = this.y * this.scene.tileTam - this.scene.tileTam * 0.25;

    this.item.pintarItem(dx, dy, this.scene);
    this.item.textura.depth = dy + this.scene.tileTam*0.25;
  }
}

class BloqueBasura extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.setTextura('basura');
  }

  coger(player) {
    if(player.item) {
      //Cogerle el item al player
      if(!player.item.bloquesAceptados.includes(this.nombre)) {
        return;
      }

      if(player.item.nombre == 'plato_crafteo') {
        player.item.items = [];
        player.item.textura.destroy();
        player.pintarItem();
        return;
      }

      this.scene.sound.play('basura');
      player.item.textura.destroy();
      player.item = null;
    }
  }
}

class BloquePila extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.items = [];

    this.setTextura('pila');
  }

  coger(player) {
    if(!player.item && this.items.length > 0) {
      let item = this.items.pop();

      player.item = item;
      player.item.textura.destroy();
      player.pintarItem();

      this.pintarItem();
    }
  }

  ponerPlatoLimpio(item) {
    if(item.textura) {
      item.textura.destroy();
    }
    this.items.push(item);
    this.pintarItem();
  }

  pintarItem() {
    let dx = this.x * this.scene.tileTam;
    let dy = this.y * this.scene.tileTam - 16;

    for(let i in this.items) {
      let item = this.items[i];

      if(item.textura) {
        item.textura.destroy();
      }

      item.pintarItem(dx, dy - i*4, this.scene);
      item.textura.depth = dy + 16;
    }
  }
}

class BloqueFregadero extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.items = [];

    this.setTextura('fregadero');
  }

  coger(player) {
    if(player.item) {
      if(!player.item.bloquesAceptados.includes(this.nombre)) {
        return;
      }

      let item = player.item;
      player.item = null;

      this.scene.sound.play('fregadero');
      this.items.push(item);
      this.pintarItem();
    }
  }

  usar(player) {
    if(this.items.length > 0) {
      let item = this.items.pop();
      item.textura.destroy();

      this.pintarItem();

      this.scene.sound.play('lavar');
      let nuevoItem = item.lavar();

      for(let bloque_id in player.scene.tilesMundo) {
        let bloque = player.scene.tilesMundo[bloque_id];
        if(bloque.nombre == 'pila') {
          bloque.ponerPlatoLimpio(nuevoItem);
          break;
        }
      }
    }
  }

  pintarItem() {
    let dx = this.x * this.scene.tileTam;
    let dy = this.y * this.scene.tileTam - 16;

    for(let i in this.items) {
      let item = this.items[i];

      if(item.textura) {
        item.textura.destroy();
      }

      item.pintarItem(dx, dy + i*4, this.scene);
      item.textura.setScale(0.3, 0.3);
      item.textura.setTint(Phaser.Display.Color.RGBStringToColor('rgb(128, 128, 255)').color);
      item.textura.depth = dy + i*4 + 16;
    }
  }
}

class BloqueMesaCortar extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.setTextura('mesa_cortar');
  }

  pintarItem() {
    let dx = this.x * this.scene.tileTam;
    let dy = this.y * this.scene.tileTam - this.scene.tileTam * 0.25;

    this.item.pintarItem(dx, dy, this.scene);
    this.item.textura.depth = dy + this.scene.tileTam*0.25;
  }

  usar() {
    if(this.item) {
      this.scene.sound.play('cortar');
      let itemRes = this.item.cortar();

      if(itemRes) {
        this.item.textura.destroy();
        this.item = itemRes;
        this.pintarItem();
      }
    }
  }
}

class BloqueEntregar extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.setTextura('entregar');
  }

  coger(player) {
    if(player.item) {
      //Cogerle el item al player
      if(!player.item.bloquesAceptados.includes(this.nombre)) {
        return;
      }

      let comanda = player.scene.checkReceta(player.item);
      if(!comanda) {
        return;
      }

      player.scene.scene.get('hud').sumarPuntos(comanda.puntos);
      this.scene.sound.play('colocar');
      let item = player.item;
      player.item = null;

      if(item.textura) {
        item.textura.destroy();
      }
    }
  }
}

class BloqueRecibir extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.items = [];
    this.setTextura('recibir');
  }

  nuevoPlatoSucio() {
    this.items.push(new ItemPlatoSucio());
    this.pintarItem();
  }

  coger(player) {
    if(!player.item && this.items.length > 0) {
      player.item = this.items.pop();

      if(player.item.textura) {
        player.item.textura.destroy();
      }
      player.pintarItem();
    }
  }

  pintarItem() {
    let dx = this.x * this.scene.tileTam;
    let dy = this.y * this.scene.tileTam - 16;

    for(let i in this.items) {
      let item = this.items[i];

      if(item.textura) {
        item.textura.destroy();
      }

      item.pintarItem(dx, dy - i*4, this.scene);
      item.textura.depth = dy + 16;
    }
  }
}

class BloqueHorno extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.setTextura('horno_off');
  }

  coger(player) {
    if(!this.item && player.item) {
      //Cogerle el item al player
      if(!player.item.bloquesAceptados.includes(this.nombre)) {
        return;
      }

      this.item = player.item;
      player.item = null;

      if(this.item.textura) {
        this.item.textura.destroy();
      }
      this.scene.sound.play('meter_horno');
      this.item = this.item.fundir();
    } else if(this.item && !player.item) {
      //Darle el item al player
      player.item = this.item;
      this.item = null;

      if(player.item.textura) {
        player.item.textura.destroy();
      }
      player.pintarItem();
    }
  }
}
