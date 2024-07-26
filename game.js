/* Config Phaser Global */
import { createAnimations } from "./animation.js";

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: "#049cd8",
  parent: "gameMario",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

new Phaser.Game(config);

function preload() {
  // Preload the image from the root directory
  this.load.image("cloud2", "assets/scenery/overworld/cloud2.png");

  this.load.image("floorbicks", "assets/scenery/overworld/floorbricks.png");

  this.load.spritesheet("mario", "assets/entities/mario.png", {
    frameWidth: 18,
    frameHeight: 16,
  });

  //Prelaod the audio
  this.load.audio("over", "assets/sound/music/gameover.mp3");
  this.load.audio("jump", "assets/sound/effects/jump.mp3");
}

function create() {
  //image(x,y,name)
  this.add.image(100, 50, "cloud2").setOrigin(0, 0).setScale(0.15);

  //animaciones
  createAnimations(this);

  this.floor = this.physics.add.staticGroup();

  this.floor
    .create(0, config.height - 16, "floorbicks")
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor
    .create(150, config.height - 16, "floorbicks")
    .setOrigin(0, 0.5)
    .refreshBody();

  /* this.add
    .tileSprite(0, config.height - 32, config.width, 32, "floorbicks")
    .setOrigin(0, 0); */

  //Fisica mario
  this.bigote = this.physics.add
    .sprite(50, 10, "mario")
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(600);

  //limite del mundo
  this.physics.world.setBounds(0, 0, 1500, config.height);

  // Enable collision between Mario and the floor
  this.physics.add.collider(this.bigote, this.floor);

  //limite camara
  this.cameras.main.setBounds(0, 0, 1500, config.height);
  //seguimiento bigote
  this.cameras.main.startFollow(this.bigote);

  //Acciones teclado
  this.keys = this.input.keyboard.createCursorKeys();
}

function update() {
  if (this.bigote.isDead) {
    return;
  }
  if (this.keys.left.isDown) {
    this.bigote.x -= 2;
    this.bigote.anims.play("bigote-walk", true);
    this.bigote.flipX = true;
  } else if (this.keys.right.isDown) {
    this.bigote.x += 2;
    this.bigote.anims.play("bigote-walk", true);
    this.bigote.flipX = false;
  } else {
    this.bigote.anims.play("bigote-idle", true);
  }
  if (this.keys.up.isDown && this.bigote.body.touching.down) {
    this.bigote.setVelocityY(-300);
    this.bigote.anims.play("bigote-jump", true);
    this.sound.play("jump");
  }

  if (this.bigote.y >= config.height) {
    this.bigote.isDead = true;
    this.bigote.anims.play("bigote-dead", true);
    this.bigote.setCollideWorldBounds(false);
    this.sound.play("over");
    setTimeout(() => {
      this.bigote.setVelocityY(-350);
    }, 100);

    setTimeout(() => {
      this.scene.restart();
    }, 2800);
  }
}
