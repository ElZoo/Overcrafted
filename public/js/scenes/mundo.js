class SceneMundo extends Phaser.Scene {
    constructor(){
        super("scene_mundo");
    }

    create() {
        this.mundoColumnas = 13;
        this.mundoFilas = 9;

        this.tiles_ids = [
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,2,2,4,2,2,7,7,2,2,2,6,2,1],
          [1,2,0,0,0,0,0,0,0,0,0,0,2,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,2,0,0,0,0,0,0,0,0,0,0,2,1],
          [1,2,5,2,5,2,2,2,2,2,2,3,2,1],
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        this.numItems = 0;
        this.items = [];

        this.tilesMundo = {};
        for(var x=0; x<=this.mundoColumnas; x++) {
            for(var y=0; y<=this.mundoFilas; y++) {
                var tile = {
                    x: x,
                    y: y,
                    data: this.getData(x, y),
                }

                this.tilesMundo[x+","+y]= tile;
            }
        }
        this.drawBG();
        this.jugador = new Player(this);
        this.physics.add.collider(this.jugador.cuerpo, this.fisicaMundo);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
      this.jugador.update();
    }

    crearItem(tipo){
        this.items.push(new Iron(0, this));
        this.numItems++;
        return this.items[this.numItems-1]
    }

    drawBG(){
        let tam = 64;

        this.fisicaMundo = this.physics.add.staticGroup();

        for(let tileID in this.tilesMundo){
            let tile = this.tilesMundo[tileID];
            let x = tile.x *tam;
            let y = tile.y *tam;

            if(tile.data.textura) {
              let img;
              if(tile.data.colision) {
                img = this.fisicaMundo.create(x,y,tile.data.textura);
                img.setImmovable(true);
                img.setSize(tam, tam*0.5, true);
                img.setOffset(-img.width*0.5, -img.height*0.5);
                img.depth = y;
              } else {
                img = this.add.image(x,y,tile.data.textura);
              }

              img.setScale(2,2);
              tile.data.objeto = img;
            }
        }

    }


    getData(x, y){
        let type = this.tiles_ids[y][x];
        switch (type) {
          case 0: // LET'S GOO Suelo
            return {
              textura: 'suelo',
              colision: false,
              objeto: false,
            };
          case 1: // Pared/aire
            return {
              textura: 'barrera',
              colision: false,
              objeto: false,
            };
          case 2: // Encimera
            return {
              textura: 'encimera',
              colision: true,
              objeto: false,
            };
          case 3:
            return {
              textura: 'basura',
              colision: true,
              objeto: false,
            };
          case 4:
            return {
              textura: 'fregadero',
              colision: true,
              objeto: false,
            };
          case 5:
            return {
              textura: 'mesa_cortar',
              colision: true,
              objeto: false,
            };
          case 6:
            return {
              textura: 'entregar',
              colision: true,
              objeto: false,
            };
          case 7:
            return {
              textura: 'horno_off',
              colision: true,
              objeto: false,
            };
        }
        return '';
    }
}
