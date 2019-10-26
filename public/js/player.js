class Player {
    constructor(scene) {
      let self = this;

      this.x = 0;
      this.y = 0;
      this.scene = scene;
      this.dir = 'abajo';
      this.target = null;

      this.item = null;

      this.container = scene.add.container(200, 200);
      this.cuerpo = scene.add.sprite(0, 0, 'zombie', 'zombie_walk_front_0');
      this.cuerpo.anims.play('zombie_walk_front');
      this.container.setScale(0.75, 0.75);

      this.container.add(this.cuerpo);

      scene.physics.world.enable(this.container);

      this.container.body.setAllowDrag(true);
      this.container.body.setDrag(800);
      this.container.body.setMaxVelocity(300);

      this.container.body.setSize(this.cuerpo.width*0.5, this.cuerpo.height*0.25, true);
      this.container.body.setOffset(-this.cuerpo.width*0.25, this.cuerpo.height*0);

      this.colorResaltado = Phaser.Display.Color.RGBStringToColor('rgb(208, 208, 208)');

      scene.input.keyboard.on('keydown', function (event) {
        if(event.code == "KeyE") {
          self.interactuar();
        }
      });
    }

    interactuar() {
      if(this.target) {
        this.target.usar(this);
      }
    }

    pintarItem() {
      //TODO pintar el item en el player
    }

    updateTargetBlock() {
      let dx = Math.ceil((this.x-this.cuerpo.width*0.25) / this.scene.tileTam);
      let dy = Math.ceil((this.y+this.cuerpo.height*0.075) / this.scene.tileTam);

      if(this.dir == 'up') {
        dy--;
      } else if(this.dir == 'down') {
        dy++;
      } else if(this.dir == 'left') {
        dx--;
      } else if(this.dir == 'right') {
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
      this.container.body.setAcceleration(0);

      let accPos = 600;
      let accNeg = -600;

      if(this.scene.cursors.left.isDown || this.scene.input.keyboard.addKey('A').isDown) {
        this.dir = 'left';
        this.container.body.setAccelerationX(accNeg);
      }
      if(this.scene.cursors.right.isDown || this.scene.input.keyboard.addKey('D').isDown) {
        this.dir = 'right';
        this.container.body.setAccelerationX(accPos);
      }
      if(this.scene.cursors.up.isDown || this.scene.input.keyboard.addKey('W').isDown) {
        this.dir = 'up';
        this.container.body.setAccelerationY(accNeg);
      }
      if(this.scene.cursors.down.isDown || this.scene.input.keyboard.addKey('S').isDown) {
        this.dir = 'down';
        this.container.body.setAccelerationY(accPos);
      }

      this.x = this.container.x;
      this.y = this.container.y;
      this.container.depth = this.y+this.cuerpo.height*0.33;

      this.updateAnims();
      this.updateTargetBlock();
    }

    updateAnims() {
      if(this.dir == 'down') {
        if(!this.cuerpo.anims.isPlaying && this.container.body.velocity.y >= 0) {
          this.cuerpo.anims.play('zombie_walk_front');
        }
        if(this.container.body.velocity.y <= 0) {
          this.cuerpo.anims.stop();
          this.cuerpo.anims.setProgress(0);
        }
      } else if(this.dir == 'up') {
        if(!this.cuerpo.anims.isPlaying && this.container.body.velocity.y <= 0) {
          this.cuerpo.anims.play('zombie_walk_back');
        }
        if(this.container.body.velocity.y >= 0) {
          this.cuerpo.anims.stop();
          this.cuerpo.anims.setProgress(0);
        }
      } else if(this.dir == 'right') {
        if(!this.cuerpo.anims.isPlaying && this.container.body.velocity.x >= 0) {
          this.cuerpo.anims.play('zombie_walk_right');
        }
        if(this.container.body.velocity.x <= 0) {
          this.cuerpo.anims.stop();
          this.cuerpo.anims.setProgress(0);
        }
      } else if(this.dir == 'left') {
        if(!this.cuerpo.anims.isPlaying && this.container.body.velocity.x <= 0) {
          this.cuerpo.anims.play('zombie_walk_left');
        }
        if(this.container.body.velocity.x >= 0) {
          this.cuerpo.anims.stop();
          this.cuerpo.anims.setProgress(0);
        }
      } else if(this.container.body.velocity.x == 0 && this.container.body.velocity.y == 0) {
        this.cuerpo.anims.stop();
        this.cuerpo.anims.setProgress(0);
      }
    }
}
