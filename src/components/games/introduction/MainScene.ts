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

      const bubble = this.add.graphics().fillStyle(0xffffff, 1);
      const bubbleRadius =
        Math.max(letterObject.width, letterObject.height) / 2 + 10;
      bubble.fillCircle(0, 0, bubbleRadius);

      const container = this.add.container(x, y).add(bubble).add(letterObject);

      this.animateLetter(container);

      container
        .setInteractive(
          new Phaser.Geom.Circle(0, 0, bubbleRadius),
          Phaser.Geom.Circle.Contains,
        )
        .on("pointerdown", () => {
          const textObject = container.getByName(
            "letterText",
          ) as Phaser.GameObjects.Text;
          console.log("Letter clicked:", textObject.text);
        })
        .on("pointerover", () => {
          this.game.canvas.style.cursor = "pointer";
        })
        .on("pointerout", () => {
          this.game.canvas.style.cursor = "default";
        });
    });
  }

  private animateLetter(letterObject: Phaser.GameObjects.Container): void {
    const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
      targets: letterObject,
      x: { from: letterObject.x, to: Math.random() * this.cameras.main.width },
      y: { from: letterObject.y, to: Math.random() * this.cameras.main.height },
      duration: 2000,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    };

    this.tweens.add(tweenConfig);
  }
}
