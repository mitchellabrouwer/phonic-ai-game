import { Scene } from "phaser";

export default class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    const greenSlashLength = 10;
    const redSlashLength = 8;

    this.load.image("background", "/assets/backgrounds/Calm.png");
    this.load.image("balloon", "/assets/objects/Balloon.png");

    this.load.atlas(
      "hearts",
      "/assets/objects/Heart.png",
      "/assets/objects/Heart.json",
    );

    // positive
    this.load.audio("correct", "/assets/audio/effects/correct.mp3");
    this.load.audio("crowd", "/assets/audio/effects/correct.mp3");
    this.load.audio("fanfare", "/assets/audio/effects/fanfare.mp3");
    this.load.audio(
      "successTrumpets",
      "/assets/audio/effects/successTrumpets.mp3",
    );
    this.load.audio("tadaa", "/assets/audio/effects/tadaa.mp3");
    this.load.audio("good", "/assets/audio/effects/good.mp3");

    // negative
    this.load.audio("incorrect", "/assets/audio/effects/incorrect.mp3");
    this.load.audio("failureDrum", "/assets/audio/effects/failureDrum.mp3");
    this.load.audio("sadTrombone", "/assets/audio/effects/sadTrombone.mp3");

    // phonic
    this.load.audio("hiss", "/assets/audio/effects/hiss.mp3");

    // Array.from({ length: 10 }).forEach((_, index) => {
    //   this.load.image(
    //     `slash${index + 1}`,
    //     `/assets/sprites/slash/${index + 1}.png`,
    //   );
    // });

    Array.from({ length: redSlashLength }).forEach((_, index) => {
      this.load.image(
        `redSlash${index + 1}`,
        `/assets/sprites/redSlash/${index + 1}.png`,
      );
    });

    Array.from({ length: greenSlashLength }).forEach((_, index) => {
      this.load.image(
        `greenSlash${index + 1}`,
        `/assets/sprites/greenSlash/${index + 1}.png`,
      );
    });
  }

  create() {
    this.scene.start("MainScene");
  }
}
