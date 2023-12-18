import Phaser from "phaser";

export default class ScoreManager {
  private scene: Phaser.Scene;

  public score: number;

  private scoreDisplay: Phaser.GameObjects.Text | null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.score = 0;
    this.scoreDisplay = null;
  }

  createScoreDisplay(): void {
    this.scoreDisplay = this.scene.add.text(
      this.scene.cameras.main.width,
      0,
      String(this.score),
      {
        font: "100px Inter",
        color: "#000",
        padding: { left: 10, right: 10, top: 10, bottom: 10 },
      },
    );
    this.scoreDisplay.setOrigin(1, 0);
  }

  updateScore(newScore: number): void {
    this.score = newScore;
    if (this.scoreDisplay) {
      this.scoreDisplay.text = String(this.score);
    }
  }

  incrementScore(): void {
    this.score += 1;
  }

  handleResize(gameSize: Phaser.Structs.Size) {
    const { width } = gameSize;
    if (this.scoreDisplay) {
      this.scoreDisplay.setX(width - 10);
    }
  }
}
