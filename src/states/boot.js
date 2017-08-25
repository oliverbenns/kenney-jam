import { IMAGES, STATES } from 'constants';

export default class Boot extends Phaser.State {
  preload() {
    const { load } = this.game;

    // Load assets
    load.spritesheet(IMAGES.PLAYER, 'assets/img/blue-ship.png', 66, 113);
    load.spritesheet(IMAGES.ENEMY, 'assets/img/red-ship.png', 66, 113);

    load.image(IMAGES.BACKGROUND, 'assets/img/water.png');
  }

  create() {
    this.game.state.start(STATES.MAIN);
  }
}
