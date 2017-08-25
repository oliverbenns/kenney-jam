import { PALETTE } from 'constants';

import Player from 'objects/player';

export default class Main extends Phaser.State {
  preload() {}

  create() {
    const { game } = this;
    game.stage.backgroundColor = PALETTE.BACKGROUND;

    const player = new Player(game);
    game.add.existing(player);
  }
}


// import { SFX, STATES } from 'constants';

// import Background from 'objects/background';
// import Food from 'objects/food';
// import Floor from 'objects/floor';
// import Player from 'objects/player';
// import LikeCounter from 'objects/like-counter';
// import LifeCounter from 'objects/life-counter';

// export default class Main extends Phaser.State {
//   constructor() {
//     super();

//     this.endGame = this.endGame.bind(this);
//     this.destroyFood = this.destroyFood.bind(this);
//   }

//   create() {
//     const { game } = this;

//     this.game.score.reset();

//     const background = new Background(game);
//     game.add.existing(background);

//     this.floor = new Floor(game);
//     game.add.existing(this.floor);

//     this.player = new Player(game);
//     game.add.existing(this.player);

//     const counters = [
//       new LikeCounter(game),
//       new LifeCounter(game),
//     ];

//     counters.forEach(counter => game.add.existing(counter));

//     this.foodGroup = game.add.group();

//     game.physics.arcade.collide(this.foodGroup);

//     game.time.events.repeat(Phaser.Timer.SECOND * 0.27, Infinity, this.createFood, this);

//     this.game.world.setBounds(0, 0, 600, 600);
//   };

//   endGame() {
//     const { state } = this.game;

//     state.start(STATES.END);
//   }

//   createFood() {
//     const food = new Food(this.game);
//     this.foodGroup.add(food);
//   }

//   destroyFood(floor, food) {
//     food.animations.play('destroy');
//     food.destroying = true;

//     food.animations.currentAnim.onComplete.add(() => {
//       this.foodGroup.remove(food, true);
//     });
//   }

//   update() {
//     const { physics, score } = this.game;

//     physics.arcade.collide(this.floor, this.player);

//     physics.arcade.collide(this.foodGroup, this.floor, this.destroyFood);

//     physics.arcade.overlap(this.player, this.foodGroup, (player, food) => {
//       this.foodGroup.remove(food, true);
//       score.lives += food.healthy ? 1 : -1;
//       this.game.sound.play(food.healthy ? SFX.TRUMPET : SFX.BITE);
//     }, (player, food) => !food.destroying);

//     if (score.lives <= 0) {
//       this.endGame();
//     }
//   }
// }
