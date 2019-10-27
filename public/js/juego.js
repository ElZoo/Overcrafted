var config = {
  type: Phaser.AUTO,
  parent: 'juegoDiv',
  width: 1280,
  height: 720,
  render: {
    antialias: false
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
  },
  banner: false,
  backgroundColor: '#FFFFFF',
  scene: [
    ScenePrecarga,
    SceneMenuPrincipal,
    ScenePuntuaciones,
    SceneMenuSalas,
    SceneMundo,
  ],
}

var game = new Phaser.Game(config);
window.addEventListener('resize', resizeGame);

function resizeGame(){
  game.scale.refresh();
}

//resizeGame();

function pw(valor) {
  return valor*0.01*game.canvas.width;
}
function ph(valor) {
  return valor*0.01*game.canvas.height;
}
