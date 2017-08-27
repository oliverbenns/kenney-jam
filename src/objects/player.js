import { IMAGES, SFX, STATES } from 'constants';

import Enemy from 'objects/enemy';

export default class Player extends Phaser.Sprite {
  constructor(game) {
    const x = game.world.centerX;
    const y = game.world.centerY;

    super(game, x, y, IMAGES.PLAYER);

    game.physics.p2.enable(this);

    this.anchor.setTo(0.5, 0.5);
    this.body.mass = 5;
    this.body.setRectangle(44, 100);

    this.health = 3;

    this.fireRateTimer = game.time.create(false);
    this.fireRateTimer.start();

    this.keys = {
      ...game.input.keyboard.createCursorKeys(),
      w: game.input.keyboard.addKey(Phaser.Keyboard.W),
      s: game.input.keyboard.addKey(Phaser.Keyboard.S),
      a: game.input.keyboard.addKey(Phaser.Keyboard.A),
      d: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    this.body.collideWorldBounds = true;

    this.body.setCollisionGroup(Player.collisionGroup);

    this.body.collides(Enemy.collisionGroup, (enemy, player) => {
      this.health--;

      this.frame = 1;
      if (this.health === 0) {
        this.game.state.start(STATES.TITLE);
      }
    }, this);
  }

  fire() {
    const { input, state } = this.game;
    const { bulletPool } = state.states[state.current];

    this.fireRateTimer.stop();
    this.fireRateTimer.start();

    const distance = {
      x: input.mousePointer.x - this.x,
      y: input.mousePointer.y - this.y,
    };

    const length = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));

    const direction = {
      x: distance.x / length,
      y: distance.y / length,
    };

    bulletPool.add('player', this.x, this.y, direction);
    this.game.sound.play(SFX.FIRE);
  }

  update() {
    const { down, left, right, up, w, a, s, d } = this.keys;
    const { leftButton } = this.game.input.activePointer;


    // Movement
    if (up.isDown || w.isDown) {
      this.body.thrust(200);
    }

    if (down.isDown || s.isDown) {
      this.body.reverse(200)
    }

    if (left.isDown || a.isDown) {
      this.body.rotateLeft(22.5);
    } else if (right.isDown || d.isDown) {
      this.body.rotateRight(22.5);
    } else {
      this.body.setZeroRotation();
    }

    // Firing
    if (leftButton.isDown && this.fireRateTimer.ms > 300) {
      this.fire();
    }
  }
}
