class SceneMundo extends Phaser.Scene {
    constructor(){
        super("scene_mundo");
    }

    create() {
        this.tiles_ids = [
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,1,2,2,4,2,2,7,7,2,2,2,6,2,1,1],
          [1,1,2,0,0,0,0,0,0,0,0,0,0,2,1,1],
          [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
          [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
          [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
          [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
          [1,1,2,0,0,0,0,0,0,0,0,0,0,2,1,1],
          [1,1,2,5,2,5,2,2,2,2,2,2,3,2,1,1],
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        this.mundoColumnas = this.tiles_ids[0].length;
        this.mundoFilas = this.tiles_ids.length;
        this.tileTam = 64;

        this.tilesMundo = {};
        for(var x=0; x<this.mundoColumnas; x++) {
            for(var y=0; y<this.mundoFilas; y++) {
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

        let cx = this.tiles_ids[0].length*this.tileTam*0.5 - this.tileTam*0.5;
        let cy = this.tiles_ids.length*this.tileTam*0.5 - this.tileTam*0.5;
        this.cameras.main.centerOn(cx,cy);
        this.cameras.main.setZoom(1.25);
    }

    update(){
      this.jugador.update();      
    }

    drawBG(){
        this.fisicaMundo = this.physics.add.staticGroup();

        for(let tileID in this.tilesMundo){
            let tile = this.tilesMundo[tileID];
            let x = tile.x *this.tileTam;
            let y = tile.y *this.tileTam;

            if(tile.data.textura) {
              let img;
              if(tile.data.colision) {
                img = this.fisicaMundo.create(x,y,tile.data.textura);
                img.setImmovable(true);
                img.setSize(this.tileTam, this.tileTam*0.5, true);
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
          case 0:
            return {
              textura: 'suelo',
              colision: false,
              objeto: false,
              usable: false,
            };
          case 1:
            return {
              textura: 'barrera',
              colision: true,
              objeto: false,
              usable: false,
            };
          case 2:
            return {
              textura: 'encimera',
              colision: true,
              objeto: false,
              usable: true,
            };
          case 3:
            return {
              textura: 'basura',
              colision: true,
              objeto: false,
              usable: true,
            };
          case 4:
            return {
              textura: 'fregadero',
              colision: true,
              objeto: false,
              usable: true,
            };
          case 5:
            return {
              textura: 'mesa_cortar',
              colision: true,
              objeto: false,
              usable: true,
            };
          case 6:
            return {
              textura: 'entregar',
              colision: true,
              objeto: false,
              usable: true,
            };
          case 7:
            return {
              textura: 'horno_off',
              colision: true,
              objeto: false,
              usable: true,
            };
        }
        return '';
    }
}
