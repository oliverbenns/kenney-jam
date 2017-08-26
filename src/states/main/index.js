import Background from 'objects/background';
import Bullet from 'objects/bullet';
import Enemy from 'objects/enemy';
import Player from 'objects/player';
import BulletPool from './bullet-pool';

export default class Main extends Phaser.State {
  create() {
    const { game } = this;

    this.bulletPool = new BulletPool(game);
    this.player = new Player(game);

    const gameObjects = [
      // new Background(game),
      this.player,
      new Enemy(game),
      new Enemy(game),
      new Enemy(game),

      new Enemy(game),
      new Enemy(game),
      new Enemy(game),
      new Enemy(game),
      new Enemy(game),
    ];

    gameObjects.forEach(game.add.existing, this)
  }
}
