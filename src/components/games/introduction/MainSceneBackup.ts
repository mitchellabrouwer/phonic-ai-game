import { Scene } from "phaser";
import levels from "../../../levels/levels";
import { DifficultyLevel, GameVariables } from "../../../types/types";

const difficultyLetterCountMap: Record<DifficultyLevel, number> = {
  easy: 1, // 1 extra letter
  medium: 2, // 2 extra letters
  hard: 3, // 3 extra letters
  extra: 4, // 4 extra letters
  master: 5, // 5 extra letters
};

export default class MainScene extends Scene {
  private readonly padding: number = 20; // Example padding value

  private onReady: () => void;

  private lives: number;

  private difficulty: DifficultyLevel;

  private land: number;

  private letter: string;

  private onComplete: (gameVariables: GameVariables) => void;

  constructor(
    onReady: () => void,
    onComplete: (gameVariables: GameVariables) => void,
    gameVariables: GameVariables,
  ) {
    super("MainScene");
    this.onReady = onReady;
    this.lives = gameVariables.lives;
    this.difficulty = gameVariables.difficulty;
    this.land = gameVariables.land;
    this.letter = gameVariables.letter;
    this.onComplete = onComplete;
  }

  public create(): void {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.add.image(centerX, centerY, "background");

    this.onReady();
    this.createLetters();
  }

  private getLandLetters() {
    const landLevels = levels[this.land];
    if (!landLevels) return [];
    return landLevels.map((level) => level.letter);
  }

  private getLettersForDifficulty(): string[] {
    const allLandLetters = this.getLandLetters();
    const extraLetterCount = difficultyLetterCountMap[this.difficulty];

    const letters = [this.letter];

    for (
      let i = 0;
      letters.length - 1 < extraLetterCount && i < allLandLetters.length;
      i += 1
    ) {
      if (allLandLetters[i] !== this.letter) {
        letters.push(allLandLetters[i]);
      }
    }

    return letters;
  }

  private static getRepeatedLetters(
    letters: string[],
    repeatFactor: number,
  ): string[] {
    return letters.flatMap((letter) => Array(repeatFactor).fill(letter));
  }

  private createLetters(): void {
    const letters = MainScene.getRepeatedLetters(
      this.getLettersForDifficulty(),
      4,
    );

    letters.forEach((letter) => {
      const x =
        Math.random() * (this.cameras.main.width - this.padding * 2) +
        this.padding;
      const y =
        Math.random() * (this.cameras.main.height - this.padding * 2) +
        this.padding;

      const letterObject = this.add
        .text(0, 0, letter, {
          font: "60px Inter",
          color: "#000",
          padding: { left: 10, right: 10, top: 10, bottom: 10 },
        })
        .setName("letterText")
        .setOrigin(0.5);

      // Define the bubble size and color
      const bubbleColor = 0xffffff; // Change this to the desired color
      const bubbleRadius =
        Math.max(letterObject.width, letterObject.height) / 2 + 10;

      // Create a texture for the bubble
      const bubbleTexture = `bubble-${letter}`;
      this.createBubbleTexture(bubbleTexture, bubbleRadius, bubbleColor);

      // Create a sprite using the bubble texture
      const bubble = this.physics.add.sprite(0, 0, "soccerBall");

      // Set the container interactive
      bubble.setInteractive();

      bubble
        .on("pointerdown", () => {
          console.log("Letter clicked:", letterObject.text);
          // Additional logic for click event
        })
        .on("pointerover", () => {
          this.game.canvas.style.cursor = "pointer";
        })
        .on("pointerout", () => {
          this.game.canvas.style.cursor = "default";
        });

      this.animateLetter(bubble);

      // this.animateLetter(container);

      // container
      //   .setInteractive(
      //     new Phaser.Geom.Circle(0, 0, bubbleRadius),
      //     Phaser.Geom.Circle.Contains,
      //   )
      //   .on("pointerdown", () => {
      //     const textObject = container.getByName(
      //       "letterText",
      //     ) as Phaser.GameObjects.Text;
      //     console.log("Letter clicked:", textObject.text);
      //   })
      //   .on("pointerover", () => {
      //     this.game.canvas.style.cursor = "pointer";
      //   })
      //   .on("pointerout", () => {
      //     this.game.canvas.style.cursor = "default";
      //   });
    });
  }

  private createBubbleTexture(
    key: string,
    radius: number,
    color: number,
  ): void {
    const graphics = this.make.graphics();
    graphics.fillStyle(color, 1);
    graphics.fillCircle(radius, radius, radius);
    graphics.generateTexture(key, radius * 2, radius * 2);
    graphics.destroy();
  }

  // eslint-disable-next-line class-methods-use-this
  private animateLetter(bubble: Phaser.Physics.Arcade.Sprite): void {
    // Apply an initial velocity to the bubble
    // Random horizontal and vertical velocities
    const velocityX = Phaser.Math.Between(-200, 200);
    const velocityY = Phaser.Math.Between(-200, 200);

    bubble.setVelocity(velocityX, velocityY);

    // Optional: Set the bubble to bounce when it collides with world bounds
    bubble.setBounce(1); // Bounce with full energy (1 = 100% energy conservation)

    // Optional: Make the bubble collide with the world bounds
    bubble.setCollideWorldBounds(true);
  }
}
