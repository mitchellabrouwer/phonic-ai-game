import { Scene } from "phaser";

export default class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("background", "/assets/backgrounds/Calm.png");
    this.load.image("balloon", "/assets/objects/Balloon.png");
    this.load.atlas(
      "hearts",
      "/assets/objects/Heart.png",
      "/assets/objects/Heart.json",
    );

    this.load.audio("correct", "/assets/audio/effects/correct.mp3");
    this.load.audio("incorrect", "/assets/audio/effects/incorrect.mp3");
    this.load.audio("hiss", "/assets/audio/effects/hiss.mp3");

    Array.from({ length: 10 }).forEach((_, index) => {
      this.load.image(
        `slash${index + 1}`,
        `/assets/sprites/slash/${index + 1}.png`,
      );
    });
  }

  create() {
    // Proceed to the main scene after loading assets
    this.scene.start("MainScene");
  }
}
