class Iron{
    constructor(estado, scene){
        this.x = 0;
        this.y = 0;
        this.scene = scene;
        this.estado = estado;


        this.cuerpo = this.scene.physics.add.image(this.x, this.y, 'iron_ore');
    }

    update(){
        this.cuerpo.x = this.x;
        this.cuerpo.y = this.y;
    }

    setCoords(x,y){
        this.x = x+10;
        this.y = y;
        this.update()
    }

    setEstado(e){
        this.estado = e;
    }

}