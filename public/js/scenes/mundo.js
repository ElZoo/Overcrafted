class SceneMundo extends Phaser.Scene {
    constructor(){
        super("scene_mundo");
    }

    preload() {
      let self = this;

      this.game.socket.on('instancia_nuevoJugador', function(jg) {
        let jugador = new Player(self, false, jg.id, 200, 200);
        self.physics.add.collider(jugador.container, self.fisicaMundo);
        self.jugadores[jg.id] = jugador;
      });

      this.game.socket.on('instancia_desconexionJugador', function(jugador_id) {
        let jg = self.jugadores[jugador_id];
        jg.container.destroy();
        delete self.jugadores[jugador_id];
      })

      this.game.socket.on('update_jugadores', function(jugadores) {
        for(let i in jugadores) {
          let jg = jugadores[i];
          let jugador = self.jugadores[jg.id];
          if(jugador) {
            if(jugador.accX == 0 && jugador.accY == 0) {
              jugador.container.x = jg.coords[0];
              jugador.container.y = jg.coords[1];

              jugador.x = jg.coords[0];
              jugador.y = jg.coords[1];
              jugador.container.depth = jugador.y+jugador.cuerpo.height*0.33;
            }
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

      this.game.socket.on('server_coger', function(data) {
        let coords = data[0];
        let jg_id = data[1];

        let bloque = self.tilesMundo[coords[0]+","+coords[1]];
        if(!bloque) {
          return;
        }

        let jugador = self.jugadores[jg_id];
        if(!jugador) {
          return;
        }

        jugador.coger(bloque);
      });

      this.game.socket.on('server_usar', function(data) {
        let coords = data[0];
        let jg_id = data[1];

        let bloque = self.tilesMundo[coords[0]+","+coords[1]];
        if(!bloque) {
          return;
        }

        let jugador = self.jugadores[jg_id];
        if(!jugador) {
          return;
        }

        jugador.usar(bloque);
      });

      this.game.socket.on('nuevo_plato_sucio', function() {
        console.log("Nuevo plato sucio");
        for(let bloque_id in self.tilesMundo) {
          let bloque = self.tilesMundo[bloque_id];
          if(bloque.nombre == 'recibir') {
            bloque.nuevoPlatoSucio();
            break;
          }
        }
      });
    }

    checkReceta(plato) {
      let comandas = this.scene.get('hud').comandas;

      for(let ic in comandas) {
        let comanda = comandas[ic];
        if(!comanda){
          continue;
        }

        let itemsReceta = [];
        for(let i in comanda.itemsFinales) {
          let item = comanda.itemsFinales[i];
          itemsReceta.push(item.nombre);
        }

        let itemsPlato = [];
        for(let i in plato.items) {
          let item = plato.items[i];
          itemsPlato.push(item.nombre);
        }

        let recetaOk = true;

        for(let i in itemsPlato) {
          let item = itemsPlato[i];
          let x = itemsReceta.indexOf(item);
          if(x > -1) {
            itemsReceta.splice(x, 1);
          } else {
            recetaOk = false;
            break;
          }
        }

        if(itemsReceta.length > 0) {
          recetaOk = false;
        }

        if(recetaOk) {
          return true;
        }
      }

      return false;
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
        let jugador = new Player(this, principal, jg.id, jg.coords[0], jg.coords[1]);
        this.physics.add.collider(jugador.container, this.fisicaMundo);
        this.jugadores[jg.id] = jugador;
        if(principal) {
          this.jugador = jugador;
        }

        if(jg.item) {
          let claseItem = itemByNombre(jg.item.nombre);
          jugador.item = new claseItem;
          jugador.pintarItem();

          if(jugador.item.nombre == 'plato_crafteo') {
            jugador.item.textura.destroy();

            jugador.item.items = [];
            for(let it in jg.item.items) {
              let claseItem = itemByNombre(jg.item.items[it].nombre);
              jugador.item.items.push(new claseItem);
            }

            jugador.pintarItem();
          }
        }
      }

      this.cursors = this.input.keyboard.createCursorKeys();

      let cx = this.tiles_ids[0].length*this.tileTam*0.5 - this.tileTam*0.5;
      let cy = this.tiles_ids.length*this.tileTam*0.5 - this.tileTam*0.5;
      this.cameras.main.centerOn(cx,cy);
      this.cameras.main.setZoom(1);

      this.generarBloques();

      let vig = this.add.image(0, 0, 'vignette');
      vig.setOrigin(0,0);
      vig.setAlpha(0.75);
      vig.setScrollFactor(0);
      vig.depth = 99999;

      this.scene.launch('hud');
    }

    update() {
      for(let i in this.jugadores) {
        this.jugadores[i].update();
      }
    }

    generarBloques() {
      for(let id in this.game.bloques) {
        let maquina_server = this.game.bloques[id];
        let maquina = this.tilesMundo[id];

        if(!maquina_server || !maquina) {
          continue;
        }

        if(maquina_server.nombre == 'cofre') {
          maquina.setTipoItem(itemByNombre(maquina_server.item));
        } else if(maquina_server.item) {
          let claseItem = itemByNombre(maquina_server.item);
          maquina.item = new claseItem;
          maquina.pintarItem();
        }

        if(maquina_server.items) {
          maquina.items = [];
          for(let it in maquina_server.items) {
            let claseItem = itemByNombre(maquina_server.items[it]);
            maquina.items.push(new claseItem);
          }
          maquina.pintarItem();
        }

        if(maquina_server.itemsPlato) {
          maquina.item.textura.destroy();

          maquina.item.items = [];
          for(let it in maquina_server.itemsPlato) {
            let claseItem = itemByNombre(maquina_server.itemsPlato[it]);
            maquina.item.items.push(new claseItem);
          }

          maquina.pintarItem();
        }
      }
    }
}
