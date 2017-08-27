import { IMAGES, STATES } from 'constants';

import Enemy from 'objects/enemy';
import Player from 'objects/player';

export default class Boot extends Phaser.State {
  preload() {
    const { load } = this.game;

    // Load assets
    load.spritesheet(IMAGES.BUTTON, 'assets/img/button.png', 190, 49);
    load.spritesheet(IMAGES.PLAYER, 'assets/img/blue-ship.png', 66, 113);
    load.spritesheet(IMAGES.ENEMY, 'assets/img/dinghy.png', 20, 38);
    load.spritesheet(IMAGES.BULLET, 'assets/img/bullet.png', 10, 10);

    load.image(IMAGES.BACKGROUND, 'assets/img/water.png');
    load.image(IMAGES.LOGO, 'assets/img/logo.png');
  }

  create() {
    this.game.physics.p2.setImpactEvents(true);
    this.game.stage.disableVisibilityChange = true;
    this.game.state.start(STATES.TITLE);

    // Add collision groups
    Player.collisionGroup = this.game.physics.p2.createCollisionGroup()
    Enemy.collisionGroup = this.game.physics.p2.createCollisionGroup()

    // Set initial score / stuff
    this.game.score = 0;
    this.game.playCount = 0;
  }
}
