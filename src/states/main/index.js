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

    // Not sure why these need to be added here instead of in Boot or something.
    // Same as https://github.com/oliverbenns/cga-jam/blob/master/src/states/level.js#L32
    Bullet.collisionGroup = this.game.physics.p2.createCollisionGroup();
    Player.collisionGroup = this.game.physics.p2.createCollisionGroup();
    Enemy.collisionGroup = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.setBoundsToWorld(true, true, true, true, true);

    this.bulletPool = new BulletPool(game);
    this.player = new Player(game);
    this.scoreText = new Phaser.Text(game, VIEWPORT.WIDTH - 10, 10, `Score: ${game.score}  |  Health: ${this.player.health}`, textStyle);
    this.scoreText.anchor.setTo(1, 0);

    const gameObjects = [
      new Background(game),
      this.player,
      this.scoreText,
    ];

    gameObjects.forEach(game.add.existing, this);

    game.time.events.loop(Phaser.Timer.SECOND, this.spawnEnemy, this);
  }
  spawnEnemy() {
    // @TODO: add this to an object pool.
    const enemy = new Enemy(this.game);

    this.game.add.existing(enemy);
  }

  update() {
    this.scoreText.setText(`Score: ${this.game.score}  |  Health: ${this.player.health}`);
  }
}
