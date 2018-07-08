import "phaser";

var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 900,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var sky, bricks, paddle, cursors, ball, brick;
function preload() {
  this.load.image("brick", "assets/brick.png");
  this.load.image("sky", "assets/sky.png");
  this.load.image("paddle", "assets/paddle.png");
  this.load.image("ball", "assets/ball.png");
}

function create() {

    sky = this.add
    .image(0, 0, "sky")
    .setOrigin(0, 0)
    .setScale(1);

  sky.displayHeight = 600;
  sky.displayWidth = 900;

  bricks = this.physics.add.staticGroup();

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 5; j++) {
    brick = bricks
        .create(150 + j * 150, 50+ i * 50, "brick")
        brick.displayWidth = 150;
        brick.displayHeight = 50;    
    }
  }

 

  paddle = this.physics.add.sprite(100, 600, "paddle");
  configPaddle(paddle);


  ball = this.physics.add.sprite(100, 460, "ball");
  configBall(ball);
  
  this.physics.add.collider( paddle, ball );
  this.physics.add.collider( ball, bricks, handleBallBrickColision );



  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    paddle.setVelocityX(-500);
  } else if (cursors.right.isDown) {
    paddle.setVelocityX(500);
  }
  else {
    paddle.setVelocityX(0);
  }
}


function configPaddle(paddle){
    paddle.displayWidth = 70;
    paddle.displayHeight = 40;
    paddle.setCollideWorldBounds(true);
    paddle.body.allowGravity = false;
    paddle.body.immovable = true;
    paddle.setBounce(1);
}

function configBall(ball){
    ball.displayWidth = 20;
    ball.displayHeight = 20;
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    ball.setVelocity(500);
    ball.body.allowGravity = false;
    ball.body.allowDrag = false;
}

function handleBallBrickColision(ball, brick){
    // ball.setVelocity(-300)
    brick.disableBody(true, true);
}