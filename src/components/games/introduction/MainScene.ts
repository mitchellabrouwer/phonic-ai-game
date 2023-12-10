import { Scene } from "phaser";
import gameDataService from "./GameDataService";

export default class MainScene extends Scene {
  private lettersText: Phaser.GameObjects.Text[];

  private onReady: () => void;

  constructor(onReady: () => void) {
    super("MainScene");
    this.onReady = onReady;
    this.lettersText = [];
  }

  public create(): void {
    console.log("MainScene created");

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.add.image(centerX, centerY, "background");

    gameDataService.subscribe(this.updateLetters.bind(this));
    this.add.text(200, 200, "Test Text inside create", {
      font: "40px Arial",
      color: "#000",
    });

    this.onReady();
  }

  public updateLetters(letters: string[]): void {
    console.log("Is scene active:", this.scene.isActive("MainScene"));

    this.add.text(100, 100, "Test Text inside update Letters", {
      font: "40px Arial",
      color: "#000",
    });

    this.lettersText.forEach((letterText) => letterText.destroy());
    this.lettersText = [];
    console.log("update function", letters);

    letters.forEach((letter) => {
      const x = Math.random() * this.cameras.main.width;
      const y = Math.random() * this.cameras.main.height;
      const letterText = this.add.text(x, y, letter, {
        font: "40px Arial",
        color: "#000",
      });

      this.lettersText.push(letterText);

      console.log(letterText);

      this.tweens.add({
        targets: letterText,
        x: { from: letterText.x, to: Math.random() * this.cameras.main.width },
        y: { from: letterText.y, to: Math.random() * this.cameras.main.height },
        duration: 2000,
        ease: "Power1",
        yoyo: true,
        repeat: -1, // Infinite loop
      });
    });
  }
}
