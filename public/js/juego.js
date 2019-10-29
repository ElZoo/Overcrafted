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
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
  },
  banner: false,
  backgroundColor: '#212121',
  scene: [
    ScenePrecarga,
    SceneMenuPrincipal,
    ScenePuntuaciones,
    SceneMundo,
    SceneHud,
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
