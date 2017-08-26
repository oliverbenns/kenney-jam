import { IMAGES, VIEWPORT } from 'constants';

const getRandomCoords = game => {
  const spawnAbove = game.rnd.integerInRange(0, 1) === 1;
  const spawnLeft = game.rnd.integerInRange(0, 1) === 1;

  return {
    x: spawnLeft ? game.rnd.integerInRange(-100, 0) : game.rnd.integerInRange(VIEWPORT.WIDTH, VIEWPORT.WIDTH + 100),
    y: spawnAbove ? game.rnd.integerInRange(-100, 0) : game.rnd.integerInRange(VIEWPORT.HEIGHT, VIEWPORT.HEIGHT + 100),
  };
}

export default class Enemy extends Phaser.Sprite {
  constructor(game) {
    const coords = getRandomCoords(game);

    super(game, coords.x, coords.y, IMAGES.ENEMY);

    game.physics.p2.enable(this, true);

    this.body.collideWorldBounds = false;

    this.anchor.setTo(0.5);
    this.speed = 50
    this.body.mass = 5;
  }

  getPlayer() {
    return this.game.state.states[this.game.state.current].player;
  }

  move() {
    const { game } = this;
    const player = this.getPlayer();

    const angle = Math.atan2(player.position.y - this.y, player.position.x - this.x);

    this.body.rotation = angle + game.math.degToRad(90);
    this.body.force.x = Math.cos(angle) * this.speed;
    this.body.force.y = Math.sin(angle) * this.speed;
  }

  update() {
    this.move();
  }
}

