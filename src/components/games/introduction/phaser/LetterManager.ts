import Phaser from "phaser";
import type MainScene from "./MainScene";
import { letterOffsets, scaling } from "./gameConstants";
import { getScreenBreakpoint } from "./utils";

export default class LetterManager {
  private scene: MainScene;

  public letters: Phaser.GameObjects.Text[];

  constructor(scene: MainScene) {
    this.scene = scene;
    this.letters = [];
  }

  createLetter(letter: string, x: number, y: number) {
    const breakpoint = getScreenBreakpoint(this.scene.cameras.main.width);
    const xOffset = letterOffsets[breakpoint].x;
    const yOffset = letterOffsets[breakpoint].y;
    const scaleFactor = scaling[breakpoint];

    const text = this.scene.add
      .text(x + xOffset, y + yOffset, letter, {
        font: "100px Inter",
        color: "#000",
        padding: { left: 10, right: 10, top: 10, bottom: 10 },
      })
      .setScale(scaleFactor);
    this.letters.push(text);
  }

  handleResize(gameSize: Phaser.Structs.Size, scaleFactor: number) {
    this.letters.forEach((letter) => {
      letter.setScale(scaleFactor);
    });
  }
}
