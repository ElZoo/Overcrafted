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

  usar(player) {
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
      this.item = player.item;
      player.item = null;

      if(this.item.textura) {
        this.item.textura.destroy();
      }
      this.pintarItem();
    }
  }

  pintarItem() {}

  setTextura(val) {
    this.nombre = val;
    let dx = this.x * this.scene.tileTam;
    let dy = this.y * this.scene.tileTam;

    if(this.colision) {
      this.textura = this.scene.fisicaMundo.create(dx, dy, this.nombre);
      this.textura.setImmovable(true);
      this.textura.setSize(this.scene.tileTam, this.scene.tileTam*0.5, true);
      this.textura.setOffset(-this.textura.width*0.5, -this.textura.height*0.5);
      this.textura.depth = dy;
    } else {
      this.textura = this.scene.add.image(dx, dy, this.nombre);
    }
    this.textura.setScale(2,2);
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

  pintarItem() {
    let dx = this.x * this.scene.tileTam;
    let dy = this.y * this.scene.tileTam - this.scene.tileTam * 0.25;

    this.item.textura = this.scene.add.sprite(dx, dy, this.item.nombre);
    this.item.textura.setScale(this.item.escala, this.item.escala);
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

  usar(player) {
    if(player.item) {
      player.item.textura.destroy();
      player.item = null;
    }
  }
}

class BloqueFregadero extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.setTextura('fregadero');
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

    this.item.textura = this.scene.add.sprite(dx, dy, this.item.nombre);
    this.item.textura.setScale(this.item.escala, this.item.escala);
    this.item.textura.depth = dy + this.scene.tileTam*0.25;
  }

}

class BloqueEntregar extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.setTextura('entregar');
  }
}

class BloqueHorno extends Bloque {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.colision = true;
    this.usable = true;
    this.setTextura('horno_off');
  }
}
