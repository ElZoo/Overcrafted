class SceneWorld1 extends Phaser.scene {
    constructor(){
        super("world1");
    }

    init() {
        this.mundoColumnas = 16;
        this.mundoFilas = 10;

        this.tilesMundo = {};
        for(var x=0; x<=this.mundoColumnas; x++) {
            for(var y=0; y<=this.mundoFilas; y++) {
                var tile = {
                    x: x,
                    y: y,
                    tipo: {},
                    objeto: {}
                }
                this.setFondo(tile, x, y);

                this.tilesMundo[x+","+y]= tile;
            }
        }
    }

    setFondo(tile, x, y){
        var type = this.tiles_mundo[y][x];
        switch (type) {
            case 0: // LET'S GOO Suelo
                tile.tipo = "suelo";
                break;
            case 1: // Pared/aire
                tile.tipo = "bloqueo"
                break;
            case 2: // Encimera
                tile.tipo = "encimera";
                break;
            case 3:
                tile.tipo = "entrega"
        }
    }

    var tiles_mundo = [
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

}