class Item {
  constructor(nombre) {
    this.nombre = nombre;
    this.escala = 0.4;

    this.bloquesAceptados = [];
  }

  pintarItem(dx, dy, scene) {
    this.textura = scene.add.sprite(dx, dy, this.nombre);
    this.textura.setScale(this.escala, this.escala);
  }

  cortar(bloque) {
  }

}

class ItemPlatoCrafteo extends Item {
  constructor() {
    super('plato_crafteo');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];

    this.items = [];
    this.escalaItems = 0.15;
    this.espacioItems = 8;
    this.offsetItems = -8;
  }

  craftear(player) {
    let item = player.item;
    player.item = null;

    let fila = Math.floor(this.items.length / 3);
    let col = this.items.length % 3;
    let ix = this.offsetItems + col*this.espacioItems;
    let iy = this.offsetItems + fila*this.espacioItems;

    item.textura.destroy();
    item.pintarItem(ix, iy, player.scene);
    item.textura.setScale(this.escalaItems, this.escalaItems);
    this.textura.add(item.textura);

    this.items.push(item);
  }

  pintarItem(dx, dy, scene) {
    this.textura = scene.add.container(dx, dy);

    let spriteTabla = scene.add.sprite(0, 0, this.nombre);
    spriteTabla.setScale(this.escala, this.escala);
    this.textura.add(spriteTabla);

    for(let i in this.items) {
      let fila = Math.floor(i / 3);
      let col = i % 3;
      let ix = this.offsetItems + col*this.espacioItems;
      let iy = this.offsetItems + fila*this.espacioItems;

      let item = this.items[i];
      item.pintarItem(ix, iy, scene);
      item.textura.setScale(this.escalaItems, this.escalaItems);
      this.textura.add(item.textura);
    }
  }
}

class ItemTronco extends Item {
  constructor() {
    super('tronco');

    this.bloquesAceptados = [
      'encimera',
      'mesa_cortar',
      'basura',
    ];
  }

  cortar(bloque){
    return new ItemPalo(bloque.scene);
  }
}

class ItemPalo extends Item {
  constructor() {
    super('palo');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemGrava extends Item {
  constructor() {
    super('grava');

    this.bloquesAceptados = [
      'encimera',
      'mesa_cortar',
      'basura',
    ];
  }

  cortar(bloque) {
    return new ItemFlint(bloque.scene);
  }
}

class ItemFlint extends Item {
  constructor() {
    super('flint');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemPluma extends Item {
  constructor() {
    super('pluma');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemCobweb extends Item {
  constructor() {
    super('cobweb');

    this.bloquesAceptados = [
      'encimera',
      'mesa_cortar',
      'basura',
    ];
  }
}

class ItemCuerda extends Item {
  constructor() {
    super('cuerda');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemMenaHierro extends Item {
  constructor() {
    super('mena_hierro');

    this.bloquesAceptados = [
      'encimera',
      'horno_off',
      'basura',
    ];
  }
}

class ItemLingoteHierro extends Item {
  constructor() {
    super('lingote_hierro');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}
