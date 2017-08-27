import { IMAGES, VIEWPORT } from 'constants';

import Bullet from 'objects/bullet';
import Player from 'objects/player';

const getRandomCoords = game => {
  const spawnAbove = game.rnd.integerInRange(0, 1) === 1;
  const spawnLeft = game.rnd.integerInRange(0, 1) === 1;

  return {
    x: spawnLeft ? game.rnd.integerInRange(-100, 0) : game.rnd.integerInRange(VIEWPORT.WIDTH, VIEWPORT.WIDTH + 100),
    y: spawnAbove ? game.rnd.integerInRange(-100, 0) : game.rnd.integerInRange(VIEWPORT.HEIGHT, VIEWPORT.HEIGHT + 100),
  };
}

export default class Enemy extends Phaser.Sprite {
  constructor(game) {
    const coords = getRandomCoords(game);

    super(game, coords.x, coords.y, IMAGES.ENEMY);

    game.physics.p2.enable(this, true);

    this.body.collideWorldBounds = false;

    this.anchor.setTo(0.5);
    this.speed = 50
    this.body.mass = 5;

    this.animations.add('destroy', [0, 1, 2], 30);

    this.body.setCollisionGroup(Enemy.collisionGroup);

    this.body.collides(Enemy.collisionGroup);
    this.body.collides(Bullet.collisionGroup, this.kill, this);
    this.body.collides(Player.collisionGroup, this.kill, this);
  }

  kill() {
    this.animations.play('destroy');

    this.animations.currentAnim.onComplete.add(() => Phaser.Sprite.prototype.kill.call(this));
  }

  move() {
    const { game } = this;
    const { player } = this.game.state.states[this.game.state.current];

    const angle = Math.atan2(player.position.y - this.y, player.position.x - this.x);

    this.body.rotation = angle + game.math.degToRad(90);
    this.body.force.x = Math.cos(angle) * this.speed;
    this.body.force.y = Math.sin(angle) * this.speed;
  }

  update() {
    this.move();
  }
}
