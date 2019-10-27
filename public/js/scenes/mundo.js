class SceneMundo extends Phaser.Scene {
    constructor(){
        super("scene_mundo");
    }

    preload() {
      let self = this;

      this.game.socket.on('instancia_nuevoJugador', function(jg) {
        console.log("Nuevo jugador: " + jg.id);
        let jugador = new Player(self, false, jg.id);
        self.physics.add.collider(jugador.container, self.fisicaMundo);
        for(let i in self.jugadores) {
          let jg2 = self.jugadores[i];
          self.physics.add.collider(jugador.container, jg2.container);
        }
        self.jugadores[jg.id] = jugador;
      });

      this.game.socket.on('instancia_desconexionJugador', function(jugador_id) {
        console.log("Desconexión jugador: " + jugador_id);
        let jg = self.jugadores[jugador_id];
        jg.container.destroy();
        delete self.jugadores[jugador_id];
      })

      this.game.socket.on('update_jugadores', function(jugadores) {
        for(let i in jugadores) {
          let jg = jugadores[i];
          let jugador = self.jugadores[jg.id];
          if(jugador) {
            jugador.container.x = jg.coords[0];
            jugador.container.y = jg.coords[1];
            jugador.x = jg.coords[0];
            jugador.y = jg.coords[1];
            jugador.container.depth = jugador.y+jugador.cuerpo.height*0.33;
          }
        }
      });
      this.game.socket.on('update_jugadores_fast', function(jugadores) {
        for(let i in jugadores) {
          let jg = jugadores[i];
          let jugador = self.jugadores[jg.id];

          if(jugador) {
            jugador.accX = jg.accX;
            jugador.accY = jg.accY;
          }
        }
      });
    }

    create() {
      let self = this;
      this.tiles_ids = this.game.nivel;

      this.mundoColumnas = this.tiles_ids[0].length;
      this.mundoFilas = this.tiles_ids.length;
      this.tileTam = 64;

      this.tilesMundo = {};
      this.fisicaMundo = this.physics.add.staticGroup();

      for(var x=0; x<this.mundoColumnas; x++) {
          for(var y=0; y<this.mundoFilas; y++) {
              this.tilesMundo[x+","+y] = crearBloque(x, y, this, this.tiles_ids[y][x]);
          }
      }

      this.jugadores = {};
      for(let i in this.game.jugadores) {
        let jg = this.game.jugadores[i];

        let principal = (jg.id == this.game.socket.id);
        let jugador = new Player(this, principal, jg.id);
        this.physics.add.collider(jugador.container, this.fisicaMundo);
        this.jugadores[jg.id] = jugador;
        if(principal) {
          this.jugador = jugador;
        }
      }

      for(let i in this.jugadores) {
        let jg = this.jugadores[i];
        for(let j in this.jugadores) {
          let jg2 = this.jugadores[j];
          if(jg2.id != jg.id) {
            this.physics.add.collider(jg.container, jg2.container);
          }
        }
      }

      this.cursors = this.input.keyboard.createCursorKeys();

      let cx = this.tiles_ids[0].length*this.tileTam*0.5 - this.tileTam*0.5;
      let cy = this.tiles_ids.length*this.tileTam*0.5 - this.tileTam*0.5;
      this.cameras.main.centerOn(cx,cy);
      this.cameras.main.setZoom(1.25);

      let cofre = this.tilesMundo['3,1'];
      cofre.setTipoItem(ItemTronco);
      cofre = this.tilesMundo['5,1'];
      cofre.setTipoItem(ItemCobweb);

      let mesa = this.tilesMundo['7,8'];
      mesa.item = new ItemPlatoCrafteo();
      mesa.pintarItem();
      mesa = this.tilesMundo['8,8'];
      mesa.item = new ItemPlatoCrafteo();
      mesa.pintarItem();
    }

    update() {
      for(let i in this.jugadores) {
        this.jugadores[i].update();
      }
    }
}
