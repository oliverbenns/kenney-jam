import { IMAGES, SFX, STATES, VIEWPORT } from 'constants';

import Background from 'objects/background';

const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.';

const textStyle = {
  wordWrap: true,
  align: 'center',
  wordWrapWidth: VIEWPORT.WIDTH * 0.5,
  font: '13px Arial',
  fontWeight: 'bold',
  fill: 'black',
};

export default class Title extends Phaser.State {
  create() {
    const { game } = this;
    const { world } = game;
    const background = new Background(this.game);
    game.add.existing(background);

    const objects = [
      game.add.sprite(world.centerX, world.height * 0.3, IMAGES.LOGO),
      game.add.text(world.centerX, world.height * 0.6, text, textStyle),
      game.add.button(world.centerX, world.height * 0.8, IMAGES.BUTTON, this.handleClick, this, 0, 0, 1, 0),
    ];

    if (game.playCount > 0) {
      objects.push(
        game.add.text(world.centerX, world.height * 0.45, `Your score was ${game.score}`, textStyle),
      );
    }

    objects.forEach(o => o.anchor.setTo(0.5))
  }

  handleClick() {
    this.game.sound.play(SFX.BUTTON);
    this.game.state.start(STATES.MAIN);
    this.game.score = 0;
    this.game.playCount++;
  }
}
