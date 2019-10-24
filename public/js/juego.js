var config = {
  type: Phaser.CANVAS,
  parent: 'juegoDiv',
//  width: 1280,
  //height: 720,
  render: {
    antialias: false
  },
  scale: {
    mode: Phaser.Scale.FIT
  },
  banner: false,
  backgroundColor: '#FFFFFF',
  scene: [
    ScenePrecarga,
    SceneMenuPrincipal,
    ScenePuntuaciones,
    SceneMenuSalas,
  ],
}

var game = new Phaser.Game(config);
window.addEventListener('resize', resizeGame);

function resizeGame(){
  let width = document.getElementById('juegoDiv').clientWidth;
  let height = width*0.5625
  document.getElementById('juegoDiv').style.height =  height+'px';
  game.scale.refresh();
}

//resizeGame();

function pw(valor) {
  return valor*0.01*document.getElementById('juegoDiv').clientWidth;
}
function ph(valor) {
  return valor*0.01*document.getElementById('juegoDiv').clientHeight;
}
