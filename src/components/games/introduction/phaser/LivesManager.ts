import Phaser from "phaser";
import type MainScene from "./MainScene";
import { breakpoint } from "./gameConstants";

export default class LivesManager {
  private scene: MainScene;

  private hearts: Phaser.GameObjects.Sprite[];

  private livesText: Phaser.GameObjects.Text | null;

  constructor(scene: MainScene) {
    this.scene = scene;
    this.hearts = [];
    this.livesText = null;
  }

  createHearts(lives: number): void {
    const heartSpacing = 120;
    const heartOffset = 60;

    for (let i = 0; i < lives; i += 1) {
      const heart = this.scene.add.sprite(
        heartSpacing * i + heartOffset,
        heartOffset,
        "hearts",
        "heartFull",
      );
      this.hearts.push(heart);
    }

    this.livesText = this.scene.add
      .text(0, 0, "", {
        fontSize: "32px",
        color: "#FFFFFF",
        align: "center",
      })
      .setOrigin(0.5);
    this.livesText.setVisible(false);
  }

  updateHeartsDisplay(width: number): void {
    const isSmallScreen = width < breakpoint.md;

    if (isSmallScreen) {
      this.hearts.forEach((heart, index) => {
        heart.setVisible(index === 0);
        if (index === 0 && this.livesText) {
          this.livesText.setX(heart.x - 5);
          this.livesText.setY(heart.y);
          this.livesText.setText(String(this.scene.lives));
          this.livesText.setVisible(true);
        }
      });
    } else {
      this.hearts.forEach((heart) => heart.setVisible(true));
      if (this.livesText) {
        this.livesText.setVisible(false);
      }
    }
  }

  updateLives(newLives: number): void {
    this.hearts.forEach((heart, index) => {
      heart.setVisible(index < newLives);
    });
  }

  loseLife(): void {
    this.scene.lives -= 1;
    const heartIndex = this.scene.lives;

    if (heartIndex >= 0 && heartIndex < this.hearts.length) {
      this.hearts[heartIndex].setFrame("heartEmpty");
    }

    if (this.livesText) {
      this.livesText.setText(String(this.scene.lives));
    }

    if (this.scene.lives === 0) {
      this.scene.loseGame();
    }
  }
}
