import { IMAGES, SFX, STATES } from 'constants';

import Bullet from 'objects/bullet';
import Enemy from 'objects/enemy';
import Player from 'objects/player';

export default class Boot extends Phaser.State {
  preload() {
    const { load } = this.game;

    // Load assets
    load.spritesheet(IMAGES.BUTTON, 'assets/img/button.png', 190, 49);
    load.spritesheet(IMAGES.PLAYER, 'assets/img/blue-ship.png', 66, 113);
    load.spritesheet(IMAGES.ENEMY, 'assets/img/dinghy.png', 20, 38);
    load.spritesheet(IMAGES.BULLET, 'assets/img/bullet.png', 10, 10);

    load.image(IMAGES.BACKGROUND, 'assets/img/water.png');
    load.image(IMAGES.LOGO, 'assets/img/logo.png');

    // SFX edited from originals.
    load.audio(SFX.BUTTON, 'assets/audio/bell.mp3'); // https://freesound.org/people/CGEffex/sounds/97795/
    load.audio(SFX.CRASH, 'assets/audio/crash.mp3'); // https://freesound.org/people/Kodack/sounds/257752/
    load.audio(SFX.FIRE, 'assets/audio/cannon.mp3'); //http://freesound.org/people/qubodup/sounds/168707/
    load.audio(SFX.SOUNDTRACK, 'assets/audio/soundtrack.mp3'); // https://freesound.org/people/LittleRobotSoundFactory/sounds/321024/
  }

  create() {
    this.game.physics.p2.setImpactEvents(true);
    this.game.stage.disableVisibilityChange = true;
    this.game.state.start(STATES.TITLE);

    // Add collision groups
    Bullet.collisionGroup = this.game.physics.p2.createCollisionGroup();
    Player.collisionGroup = this.game.physics.p2.createCollisionGroup();
    Enemy.collisionGroup = this.game.physics.p2.createCollisionGroup();

    // Set initial score / stuff
    this.game.score = 0;
    this.game.playCount = 0;

    this.game.sound.play(SFX.SOUNDTRACK, 0.8, true);
  }
}
