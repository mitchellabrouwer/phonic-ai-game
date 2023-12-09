import { Scene } from "phaser";

export default class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("background", "/assets/backgrounds/City.webp");
  }

  create() {
    // Proceed to the main scene after loading assets
    this.scene.start("MainScene");
  }
}
