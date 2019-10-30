function itemByNombre(nombre) {
  switch(nombre) {
    case 'plato_crafteo':
      return ItemPlatoCrafteo;
    case 'plato_sucio':
      return ItemPlatoSucio;
    case 'tronco':
      return ItemTronco;
    case 'palo':
      return ItemPalo;
    case 'grava':
      return ItemGrava;
    case 'flint':
      return ItemFlint;
    case 'pluma':
      return ItemPluma;
    case 'cobweb':
      return ItemCobweb;
    case 'cuerda':
      return ItemCuerda;
    case 'mena_hierro':
      return ItemMenaHierro;
    case 'lingote_hierro':
      return ItemLingoteHierro;
    case 'mena_oro':
      return ItemMenaOro;
    case 'lingote_oro':
      return ItemLingoteOro;
    case 'bloque_carbon':
      return ItemBloqueCarbon;
    case 'carbon':
      return ItemCarbon;
  }
}

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

  cortar() {}
  fundir() {}
  craftear(player) {}
}

class ItemPlatoCrafteo extends Item {
  constructor() {
    super('plato_crafteo');

    this.bloquesAceptados = [
      'encimera',
      'basura',
      'entregar',
    ];

    this.items = [];
    this.escalaItems = 0.15;
    this.espacioItems = 8;
    this.offsetItems = -8;
  }

  craftear(player) {
    if (this.items.length >= 9) {
      return;
    }

    let item = player.item;
    player.item = null;

    let fila = Math.floor(this.items.length / 3);
    let col = this.items.length % 3;
    let ix = this.offsetItems + col*this.espacioItems;
    let iy = this.offsetItems + fila*this.espacioItems;

    item.textura.destroy();
    item.pintarItem(ix, iy, player.scene);
    item.textura.setScale(this.escalaItems+0.1, this.escalaItems+0.1);
    this.textura.add(item.textura);

    player.scene.sound.play('craftear');
    this.items.push(item);

    let comanda = player.scene.checkReceta(this);
    if(comanda) {
      let itemFinal = comanda.itemPrincipal;
      if(this.itemFinalTextura) {
        this.itemFinalTextura.destroy();
      }

      for(let i in this.items) {
        let item = this.items[i];
        if(item.textura) {
          item.textura.destroy();
        }
      }

      this.itemFinalTextura = player.scene.add.sprite(0, 0, itemFinal);
      this.itemFinalTextura.setScale(0.7);
      this.textura.add(this.itemFinalTextura);
    }
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
      item.textura.setScale(this.escalaItems+0.1, this.escalaItems+0.1);
      this.textura.add(item.textura);
    }

    let comanda = scene.checkReceta(this);
    if(comanda) {
      let itemFinal = comanda.itemPrincipal;
      if(this.itemFinalTextura) {
        this.itemFinalTextura.destroy();
      }

      for(let i in this.items) {
        let item = this.items[i];
        if(item.textura) {
          item.textura.destroy();
        }
      }

      this.itemFinalTextura = scene.add.sprite(0, 0, itemFinal);
      this.itemFinalTextura.setScale(0.7);
      this.textura.add(this.itemFinalTextura);
    }
  }
}

class ItemPlatoSucio extends Item {
  constructor() {
    super('plato_sucio');

    this.bloquesAceptados = [
      'encimera',
      'fregadero',
    ];
  }

  lavar() {
    return new ItemPlatoCrafteo();
  }
}

class ItemTronco extends Item {
  constructor() {
    super('tronco');

    this.bloquesAceptados = [
      'encimera',
      'mesa_cortar',
      'horno_off',
      'basura',
    ];
  }

  cortar(){
    return new ItemPalo();
  }

  fundir() {
    return new ItemBloqueCarbon();
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

  cortar() {
    return new ItemFlint();
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
  cortar() {
    return new ItemCuerda();
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

  fundir(){
    return new ItemLingoteHierro();
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

class ItemMenaOro extends Item {
  constructor() {
    super('mena_oro');

    this.bloquesAceptados = [
      'encimera',
      'horno_off',
      'basura',
    ];
  }

  fundir() {
    return new ItemLingoteOro();
  }
}

class ItemLingoteOro extends Item {
  constructor() {
    super('lingote_oro');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}

class ItemBloqueCarbon extends Item {
  constructor() {
    super('bloque_carbon');

    this.bloquesAceptados = [
      'encimera',
      'mesa_cortar',
      'basura',
    ];
  }

  cortar(bloque) {
    return new ItemCarbon();
  }
}

class ItemCarbon extends Item {
  constructor() {
    super('carbon');

    this.bloquesAceptados = [
      'encimera',
      'basura',
    ];
  }
}
