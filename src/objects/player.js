import { IMAGES } from 'constants';

const walkingVelocity = 400;

export default class Player extends Phaser.Sprite {
  constructor(game) {
    const image = game.cache.getImage(IMAGES.PLAYER);
    const x = game.world.centerX;
    const y = game.world.centerY;

    super(game, x, y, IMAGES.PLAYER);

    game.physics.arcade.enable(this);

    this.anchor.setTo(0.5, 0.5);
    this.speed = 200;

    this.keys = {
      ...game.input.keyboard.createCursorKeys(),
      space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
    };
  }

  move() {
    const { down, left, right, up } = this.keys;

    if (up.isDown) {
      this.body.velocity.y = -(this.speed);
    } else if (down.isDown) {
      this.body.velocity.y = this.speed;
    } else {
      this.body.velocity.y = 0;
    }

    if (left.isDown) {
      this.body.velocity.x = -(this.speed);
    } else if (right.isDown) {
      this.body.velocity.x = this.speed;
    } else {
      this.body.velocity.x = 0;
    }
  }

  update() {
    this.move();
  }
}
