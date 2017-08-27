import { IMAGES } from 'constants';
import Enemy from 'objects/enemy';

export default class Bullet extends Phaser.Sprite {
  constructor(game, owner, x, y) {
    super(game, x, y, IMAGES.BULLET);

    game.physics.p2.enable(this, true);

    this.owner = owner;
    this.anchor.setTo(0.5, 0.5);
    this.body.setCircle(5);
    this.body.collideWorldBounds = false;
    this.checkWorldBounds = true;

    this.events.onOutOfBounds.add(this.kill, this);

    this.body.setCollisionGroup(Bullet.collisionGroup);

    this.body.collides(Enemy.collisionGroup, () => {
      this.game.score++;
      this.kill();
    }, this);
  }

  update() {
    this.body.y += 5;
  }
}
