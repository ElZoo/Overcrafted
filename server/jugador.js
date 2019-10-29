module.exports = class Jugador {
  constructor(id, pj, coords, nick) {
    this.id = id;
    this.coords = coords;
    this.accX = 0;
    this.accY = 0;
    this.pj = pj;
    this.nick = nick;

    this.item = null;
  }
}
