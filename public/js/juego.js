var config = {
  type: Phaser.AUTO,
  parent: 'juegoDiv',
  width: 1280,
  height: 720,
  render: {
    antialias: false
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

function pw(valor) {
  return valor*0.01*config.width;
}
function ph(valor) {
  return valor*0.01*config.height;
}
