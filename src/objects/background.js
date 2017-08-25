import { IMAGES, VIEWPORT } from 'constants';

export default class Background extends Phaser.TileSprite {
  constructor(game) {
    super(game, 0, 0, VIEWPORT.WIDTH, VIEWPORT.HEIGHT, IMAGES.BACKGROUND);
  }

  update() {
    this.tilePosition.y += 0.1;
    this.tilePosition.x += 0.1;
  }
}
