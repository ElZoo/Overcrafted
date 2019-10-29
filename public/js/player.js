class Player {
    constructor(scene, principal, id, x, y, nombre, nick) {
      let self = this;

      this.id = id;
      this.principal = principal;
      this.nombre = nombre;
      this.nick = nick;
      this.x = x;
      this.y = y;
      this.accX = 0;
      this.accY = 0;
      this.scene = scene;
      this.dirX = false;
      this.dirY = 'abajo';
      this.target = null;

      this.item = null;

      this.container = scene.add.container(x, y);

      let sombra = scene.add.circle(0, 48, 28, 0x000000);
      sombra.setAlpha(0.25);
      this.container.add(sombra);

      this.cuerpo = scene.add.sprite(0, 0, this.nombre, this.nombre+'_walk_front_0');
      this.cuerpo.setScale(0.25, 0.25);
      this.container.add(this.cuerpo);

      let ctTexto = scene.add.container(0,0);
      this.container.add(ctTexto);

      let nickTexto = scene.make.text({
        x: 0, y: -96,
        text: nick,
        padding: {
          x: 12,
          y: 6,
        },
        style: {
          fontSize: '12px',
          fontFamily: 'Verdana',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }
      });
      nickTexto.setOrigin(0.5);
      ctTexto.add(nickTexto);

      scene.physics.world.enable(this.container);

      this.container.body.setSize(32, 64);
      this.container.body.setOffset(-16, -32);

      this.colorResaltado = Phaser.Display.Color.RGBStringToColor('rgb(208, 208, 208)');

      if(principal) {
        scene.input.keyboard.on('keydown', function (event) {
          if(event.code == "KeyE") {
            if(self.target) {
              scene.game.socket.emit('coger_bloque', [self.target.x, self.target.y]);
            }
          }

          else if (event.code == "KeyQ") {
            if(self.target) {
              scene.game.socket.emit('usar_bloque', [self.target.x, self.target.y]);
            }
          }
        });
      }

      this.cuerpo.on('animationupdate', function(animation, frame) {
        if(animation.key.includes('_walk_') && frame.index % 2 != 0) {
          let rnd = Math.floor(Math.random() * 6) + 1;
          self.scene.sound.play('step_'+rnd, {volume: 0.5});
        }
      });
      this.cuerpo.on('animationstart', function(animation, frame) {
        if(animation.key.includes('_walk_')) {
          let rnd = Math.floor(Math.random() * 6) + 1;
          self.scene.sound.play('step_'+rnd, {volume: 0.5});
        }
      });

      this.scene.time.addEvent({
        delay: 4000,
        loop: true,
        callback: function() {
          if(Math.random() < 0.2) {
              self.scene.sound.play(self.nombre, {volume: 0.5});
          }
        },
      });
    }

    coger(bloque) {
      bloque.coger(this);
    }

    usar(bloque){
      bloque.usar(this);
    }

    pintarItem() {
      this.item.pintarItem(0, -55, this.scene);
      this.container.add(this.item.textura);
      this.scene.sound.play('pop');
    }

    updateTargetBlock() {
      let dx = Math.ceil((this.x-32) / this.scene.tileTam);
      let dy = Math.ceil((this.y) / this.scene.tileTam);

      if(this.lastDirY == 'up') {
        dy--;
      } else if(this.lastDirY == 'down') {
        dy++;
      }
      if(this.lastDirX == 'left') {
        dx--;
      } else if(this.lastDirX == 'right') {
        dx++;
      }

      if(!this.target || this.target.x != dx || this.target.y != dy) {
        if(this.target) {
          let tile = this.target;
          tile.textura.clearTint();
        }

        let tile = this.scene.tilesMundo[dx+","+dy];
        if (!tile) {
          return
        }
        if(tile.usable) {
          this.target = tile;
          tile.textura.setTint(this.colorResaltado.color);
        } else {
          this.target = null;
        }
      }
    }

    update() {
      if(this.principal) {
        let dirs = {
          up: false,
          down: false,
          left: false,
          right: false,
        }

        if(this.scene.cursors.left.isDown || this.scene.input.keyboard.addKey('A').isDown) {
          dirs.left = true;
        }
        if(this.scene.cursors.right.isDown || this.scene.input.keyboard.addKey('D').isDown) {
          dirs.right = true;
        }
        if(this.scene.cursors.up.isDown || this.scene.input.keyboard.addKey('W').isDown) {
          dirs.up = true;
        }
        if(this.scene.cursors.down.isDown || this.scene.input.keyboard.addKey('S').isDown) {
          dirs.down = true;
        }

        this.scene.game.socket.emit('update_controles', [dirs, [this.x, this.y]]);
      }

      this.container.body.setVelocity(this.accX, this.accY);
      //this.container.body.setAccelerationY(this.accY);

      if(this.accX > 0) {
        this.dirX = 'right';

        this.lastDirX = 'right';
        this.lastDirY = false;
      } else if(this.accX < 0) {
        this.dirX = 'left';

        this.lastDirX = 'left';
        this.lastDirY = false;
      } else {
        this.dirX = false;
      }
      if(this.accY > 0) {
        this.dirY = 'down';

        this.lastDirY = 'down';
        this.lastDirX = false;
      } else if(this.accY < 0) {
        this.dirY = 'up';

        this.lastDirY = 'up';
        this.lastDirX = false;
      } else {
        this.dirY = false;
      }

      this.x = this.container.x;
      this.y = this.container.y;
      this.container.depth = this.y+32;

      this.updateAnims();
      this.updateTargetBlock();
    }

    updateAnims() {
      let anim = this.nombre+'_walk';

      if(this.dirY == 'down') {
        anim = this.nombre+'_walk_front';
      } else if(this.dirY == 'up') {
        anim = this.nombre+'_walk_back';
      }

      if(anim == this.nombre+'_walk') {
        anim = this.nombre+'_walk_';
      }
      if(this.dirX == 'left') {
        anim += 'left';
      } else if(this.dirX == 'right') {
        anim += 'right';
      }

      if(anim == this.nombre+'_walk_') {
        if(this.cuerpo.anims.currentAnim) {
          this.cuerpo.anims.stop();
          this.cuerpo.anims.setProgress(0);
        }
      } else {
        if(!this.cuerpo.anims.currentAnim || this.cuerpo.anims.currentAnim.key != anim || !this.cuerpo.anims.isPlaying) {
          this.cuerpo.anims.play(anim);
          this.cuerpo.anims.setProgress(0.25);
        }
      }
    }
}
