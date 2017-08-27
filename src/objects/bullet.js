import { IMAGES } from 'constants';
import Enemy from 'objects/enemy';

export default class Bullet extends Phaser.Sprite {
  constructor(game, owner, x, y, direction) {
    super(game, x, y, IMAGES.BULLET);

    game.physics.p2.enable(this);

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
    console.log('this', this);
    console.log('this.body.velocity1', this.body.velocity);

    const speed = 400;

    this.body.velocity.x = direction.x * speed;
    this.body.velocity.y = direction.y * speed;
    console.log('this.body.velocity2', this.body.velocity);
  }
}
