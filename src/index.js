import 'pixi';
import 'p2';
import 'phaser';

import pkg from '../package.json';

// This is the entry point of your game.

const config = {
  width: 800,
  height: 600,
  renderer: Phaser.AUTO,
  parent: '',
  state: {
    create,
  },
  transparent: false,
  antialias: true,
  physicsConfig: { arcade: true },
};

const game = new Phaser.Game(config);

function create() {
  const { game } = this;
  const title = game.add.text(game.world.centerX, game.world.centerY, `Welcome to Phaser ${pkg.dependencies.phaser.substr(1)}`, { font: "bold 19px Arial", fill: "#fff" });

  title.anchor.setTo(0.5, 0.5)
}
