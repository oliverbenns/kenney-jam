import { IMAGES, STATES } from 'constants';

import Enemy from 'objects/enemy';

export default class Player extends Phaser.Sprite {
  constructor(game) {
    const x = game.world.centerX;
    const y = game.world.centerY;

    super(game, x, y, IMAGES.PLAYER);

    game.physics.p2.enable(this, true);

    this.anchor.setTo(0.5, 0.5);
    this.body.mass = 5;
    this.body.setRectangle(44, 100);

    this.health = 3;

    this.fireRateTimer = game.time.create(false);
    this.fireRateTimer.start();

    this.keys = {
      ...game.input.keyboard.createCursorKeys(),
      space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
    };

    this.body.collideWorldBounds = true;

    this.body.setCollisionGroup(Player.collisionGroup);

    this.game.score = 5;

    this.body.collides(Enemy.collisionGroup, (enemy, player) => {
      this.health--;

      this.frame = 1;
      if (this.health === 0) {
        this.game.state.start(STATES.TITLE);
      }
    }, this);
  }

  move() {
    const { down, left, right, up, space } = this.keys;

    if (up.isDown) {
      this.body.thrust(200);
    }

    if (down.isDown) {
      this.body.reverse(200)
    }

    if (left.isDown) {
      this.body.rotateLeft(22.5);
    } else if (right.isDown) {
      this.body.rotateRight(22.5);
    } else {
      this.body.setZeroRotation();
    }

    if (space.isDown && this.fireRateTimer.ms > 300) {
      const { state } = this.game;
      const { bulletPool } = state.states[state.current];

      this.fireRateTimer.stop();
      this.fireRateTimer.start();

      bulletPool.add('player', this.x, this.y);
    }
  }

  update() {
    this.move();
  }
}
