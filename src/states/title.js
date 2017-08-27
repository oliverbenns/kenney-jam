import { IMAGES, SFX, STATES, VIEWPORT } from 'constants';

import Background from 'objects/background';

const text = 'You\'re a crappy pirate, your boat can only turn right. Seriously what\'s up with that? Also, the enemy pirates only have dinghys that want to crash into you, not sure why to be honest. Move with [WSD] (no A!), aim and shoot with your mouse. Try to enjoy yourself.';

const textStyle = {
  wordWrap: true,
  align: 'center',
  wordWrapWidth: VIEWPORT.WIDTH * 0.6,
  font: '14px Arial',
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
      game.add.text(world.centerX, world.height * (game.playCount > 0 ? 0.6 : 0.55), text, textStyle),
      game.add.button(world.centerX, world.height * (game.playCount > 0 ? 0.8 : 0.75), IMAGES.BUTTON, this.handleClick, this, 0, 0, 1, 0),
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
