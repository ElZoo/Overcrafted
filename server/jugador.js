module.exports = class Jugador {
  constructor(id) {
    this.id = id;
    this.coords = [200, 200];
    this.accX = 0;
    this.accY = 0;

    this.item = null;
  }
}
