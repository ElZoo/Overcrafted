class SceneMundo extends Phaser.Scene {
    constructor(){
        super("scene_mundo");
    }

    create() {
        this.mundoColumnas = 13;
        this.mundoFilas = 9;

        this.tiles_ids = [
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,2,0,0,0,0,0,0,0,0,0,0,2,1],
          [1,2,0,0,0,0,0,0,0,0,0,0,2,1],
          [1,2,0,0,0,0,0,0,0,0,0,0,2,1],
          [1,2,0,0,0,0,0,0,0,0,0,0,2,1],
          [1,2,0,0,0,0,0,0,0,0,0,0,2,1],
          [1,2,0,0,0,0,0,0,0,0,0,0,2,1],
          [1,2,0,0,0,0,0,0,0,0,0,0,2,1],
          [1,2,0,0,0,0,0,0,0,0,0,0,3,1],
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
        let tam = 70;
        for(let tileID in this.tilesMundo){
            let tile = this.tilesMundo[tileID];
            let x = tile.x *tam;
            let y = tile.y *tam;
            this.add.rectangle(x , y, tam, tam, Phaser.Display.Color.HexStringToColor(tile.tipo).color).setOrigin(0,0);
        }

    }


    setFondo(x, y){
        let type = this.tiles_ids[y][x];
        switch (type) {
            case 0: // LET'S GOO Suelo
                return '#787878';
            case 1: // Pared/aire
                return '#01ffdd';
            case 2: // Encimera
                return '#FF0000';
            case 3:
                return '#ffa856';
        }
        return '#FFFFFF';
    }
}
