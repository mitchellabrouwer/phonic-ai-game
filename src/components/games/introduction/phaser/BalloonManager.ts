import Phaser from "phaser";
import type MainScene from "./MainScene";
import { scaling } from "./gameConstants";
import { getScreenBreakpoint } from "./utils";

export default class BalloonManager {
  private scene: MainScene;

  public balloons: Phaser.Physics.Arcade.Image[];

  public popped: boolean[];

  constructor(scene: MainScene) {
    this.scene = scene;
    this.balloons = [];
    this.popped = [];
  }

  createBalloon(
    letter: string,
    x: number,
    y: number,
    onHit: (letter: string, balloon: Phaser.Physics.Arcade.Image) => void,
  ): Phaser.Physics.Arcade.Image {
    const breakpoint = getScreenBreakpoint(this.scene.cameras.main.width);
    const scaleFactor = scaling[breakpoint];

    const balloon = this.scene.physics.add
      .image(x, y, "balloon")
      .setCircle(75)
      .setVelocity(
        Phaser.Math.Between(-100, 100),
        Phaser.Math.Between(-100, 100),
      )
      .setBounce(1)
      .setCollideWorldBounds(true)
      .setInteractive()
      .setScale(scaleFactor);

    balloon.on("pointerdown", () => {
      onHit(letter, balloon);
    });

    balloon.on("pointerover", () => {
      this.scene.game.canvas.style.cursor = "pointer";
    });

    balloon.on("pointerout", () => {
      this.scene.game.canvas.style.cursor = "default";
    });

    this.balloons.push(balloon);
    return balloon;
  }

  releaseBalloons(width: number, height: number) {
    this.balloons.forEach((balloon, index) => {
      if (!this.popped[index]) {
        balloon.setPosition(width - 10, height - 10);
      }
    });
  }

  handleResize(gameSize: Phaser.Structs.Size, scaleFactor: number) {
    this.balloons.forEach((balloon) => {
      balloon.setScale(scaleFactor);
    });
  }
}
