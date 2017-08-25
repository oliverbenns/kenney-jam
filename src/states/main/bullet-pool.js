import Bullet from 'objects/bullet';

// @TODO: Think about making this a generic object pool.

export default class BulletPool {
  constructor(game) {
    this.game = game;
    this.pool = [];
  }

  add(owner, x, y) {
    const existing = this.pool.find(sprite => sprite.alive === false); // Alive is undefined by default so cannot do !alive.

    if (existing) {
      existing.owner = owner;
      existing.reset(x, y);
      return;
    }

    const bullet = new Bullet(this.game, owner, x, y);

    this.pool.push(bullet);
    this.game.add.existing(bullet);
  }
}
