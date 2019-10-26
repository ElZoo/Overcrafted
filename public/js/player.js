class Player {
    constructor(scene) {
        this.x = 0;
        this.y = 0;
        this.scene = scene;

        this.cuerpo = scene.physics.add.sprite(200,200,'zombie', 'zombie_walk_front_0');
        this.cuerpo.anims.play('zombie_walk_front');
        this.cuerpo.setScale(0.75, 0.75);
        this.cuerpo.body.setAllowDrag(true);
        this.cuerpo.setDrag(800);
        this.cuerpo.setMaxVelocity(300);

        this.cuerpo.setSize(this.cuerpo.width*0.5, this.cuerpo.height*0.25, true);
        this.cuerpo.setOffset(this.cuerpo.width*0.25, this.cuerpo.height*0.5);
    }

    update() {
      this.cuerpo.setAcceleration(0);

      let accPos = 600;
      let accNeg = -600;

      let dirs = {
        left: false,
        right: false,
        up: false,
        down: false
      }

      if(this.scene.cursors.left.isDown) {
        dirs.left = true;
        this.cuerpo.setAccelerationX(accNeg);
      }
      if(this.scene.cursors.right.isDown) {
        dirs.right = true;
        this.cuerpo.setAccelerationX(accPos);
      }
      if(this.scene.cursors.up.isDown) {
        dirs.up = true;
        this.cuerpo.setAccelerationY(accNeg);
      }
      if(this.scene.cursors.down.isDown) {
        dirs.down = true;
        this.cuerpo.setAccelerationY(accPos);
      }

      this.x = this.cuerpo.x;
      this.y = this.cuerpo.y;
      this.cuerpo.depth = this.y+this.cuerpo.height*0.33;

      if(dirs.right) {
        if(!this.cuerpo.anims.isPlaying && this.cuerpo.body.velocity.x >= 0) {
          this.cuerpo.anims.play('zombie_walk_right');
        }
        if(this.cuerpo.body.velocity.x <= 0) {
          this.cuerpo.anims.stop();
          this.cuerpo.anims.setProgress(0);
        }
      } else if(dirs.left) {
        if(!this.cuerpo.anims.isPlaying && this.cuerpo.body.velocity.x <= 0) {
          this.cuerpo.anims.play('zombie_walk_left');
        }
        if(this.cuerpo.body.velocity.x >= 0) {
          this.cuerpo.anims.stop();
          this.cuerpo.anims.setProgress(0);
        }
      } else if(dirs.down) {
        if(!this.cuerpo.anims.isPlaying && this.cuerpo.body.velocity.y >= 0) {
          this.cuerpo.anims.play('zombie_walk_front');
        }
        if(this.cuerpo.body.velocity.y <= 0) {
          this.cuerpo.anims.stop();
          this.cuerpo.anims.setProgress(0);
        }
      } else if(dirs.up) {
        if(!this.cuerpo.anims.isPlaying && this.cuerpo.body.velocity.y <= 0) {
          this.cuerpo.anims.play('zombie_walk_back');
        }
        if(this.cuerpo.body.velocity.y >= 0) {
          this.cuerpo.anims.stop();
          this.cuerpo.anims.setProgress(0);
        }
      } else if(this.cuerpo.body.velocity.x == 0 && this.cuerpo.body.velocity.y == 0) {
        this.cuerpo.anims.stop();
        this.cuerpo.anims.setProgress(0);
      }
    }
}
