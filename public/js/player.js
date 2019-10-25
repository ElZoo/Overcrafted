class Player {
    constructor(scene) {
        this.x = 0;
        this.y = 0;

        //let caja = scene.add.rectangle(200,200,50,50,0x000000);
        this.cuerpo = scene.physics.add.image(200,200,'totem_of_undying');
        this.cuerpo.setScale(5,5);
        this.cuerpo.body.setAllowDrag(true);
        this.cuerpo.setDrag(600);
        this.cuerpo.setMaxVelocity(300);
        this.cuerpo.setCollideWorldBounds(true);
    }
}
