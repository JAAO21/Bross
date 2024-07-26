export const createAnimations = (gameBigote) => {
  //create animation walk
  gameBigote.anims.create({
    key: "bigote-walk",
    frames: gameBigote.anims.generateFrameNumbers("mario", {
      start: 3,
      end: 2,
    }),
    frameRate: 12,
    repeat: -1,
  });

  //create animation idle
  gameBigote.anims.create({
    key: "bigote-idle",
    frames: [{ key: "mario", frame: 0 }],
  });

  //create animation jump
  gameBigote.anims.create({
    key: "bigote-jump",
    frames: [{ key: "mario", frame: 5 }],
  });

  //create animation dead
  gameBigote.anims.create({
    key: "bigote-dead",
    frames: [{ key: "mario", frame: 4 }],
  });
};
