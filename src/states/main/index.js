import Background from 'objects/background';
import Bullet from 'objects/bullet';
import Player from 'objects/player';
import BulletPool from './bullet-pool';

export default class Main extends Phaser.State {
  create() {
    const { game } = this;
    const gameObjects = [
      new Background(game),
      new Player(game),
    ];

    this.bulletPool = new BulletPool(game);

    gameObjects.forEach(game.add.existing, this)
  }
}
