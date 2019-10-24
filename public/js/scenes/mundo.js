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
    }

    setFondo(x, y){
        var type = this.tiles_ids[y][x];
        switch (type) {
            case 0: // LET'S GOO Suelo
                return "suelo";
            case 1: // Pared/aire
                return "bloqueo";
            case 2: // Encimera
                return "encimera";
            case 3:
                return "entrega";
        }
        return "aire";
    }
}
