import Background from 'objects/background';
import Player from 'objects/player';

export default class Main extends Phaser.State {
  create() {
    const { game } = this;
    const gameObjects = [
      new Background(game),
      new Player(game)
    ];

    gameObjects.forEach(game.add.existing.bind(this));
  }
}
