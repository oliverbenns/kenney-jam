import { VIEWPORT } from 'constants';
import Background from 'objects/background';
import Bullet from 'objects/bullet';
import Enemy from 'objects/enemy';
import Player from 'objects/player';
import BulletPool from './bullet-pool';

const textStyle = {
  wordWrap: true,
  align: 'center',
  font: '12px Arial',
  fontWeight: 'bold',
  wordWrapWidth: VIEWPORT.WIDTH - 10,
  fill: 'black',
};

export default class Main extends Phaser.State {
  create() {
    const { game } = this;

    this.bulletPool = new BulletPool(game);
    this.player = new Player(game);
    this.scoreText = new Phaser.Text(game, VIEWPORT.WIDTH - 10, 10, `Score: ${game.score}  |  Health: ${this.player.health}`, textStyle);
    this.scoreText.anchor.setTo(1, 0);

    const gameObjects = [
      // new Background(game),
      this.player,
      this.scoreText,
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

  update() {
    this.scoreText.setText(`Score: ${this.game.score}  |  Health: ${this.player.health}`);
  }
}
