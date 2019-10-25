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

        this.tilesMundo = {};
        for(var x=0; x<=this.mundoColumnas; x++) {
            for(var y=0; y<=this.mundoFilas; y++) {
                var tile = {
                    x: x,
                    y: y,
                    tipo: this.setFondo(x, y),
                    objeto: {}
                }

                this.tilesMundo[x+","+y]= tile;
            }
        }
        this.drawBG();
        this.jugador = new Player(this);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
      this.jugador.cuerpo.setAcceleration(0);

      let accPos = 600;
      let accNeg = -600;

      if(this.cursors.left.isDown) {
        this.jugador.cuerpo.setAccelerationX(accNeg);
      }
      if(this.cursors.right.isDown) {
        this.jugador.cuerpo.setAccelerationX(accPos);
      }
      if(this.cursors.up.isDown) {
        this.jugador.cuerpo.setAccelerationY(accNeg);
      }
      if(this.cursors.down.isDown) {
        this.jugador.cuerpo.setAccelerationY(accPos);
      }
    }

    drawBG(){
        let tam = 64;
        for(let tileID in this.tilesMundo){
            let tile = this.tilesMundo[tileID];
            let x = tile.x *tam;
            let y = tile.y *tam;
            if(tile.tipo) {
              this.add.image(x,y,tile.tipo).setOrigin(0,0).setScale(2,2);
            }
        }

    }


    setFondo(x, y){
        let type = this.tiles_ids[y][x];
        switch (type) {
          case 0: // LET'S GOO Suelo
            return 'suelo';
          case 1: // Pared/aire
            return 'barrera';
          case 2: // Encimera
            return 'encimera';
          case 3:
            return 'basura';
          case 4:
            return 'fregadero';
          case 5:
            return 'mesa_cortar';
          case 6:
            return 'entregar';
          case 7:
            return 'horno_off';
        }
        return '';
    }
}
