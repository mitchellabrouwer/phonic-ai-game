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

function getLandLetters(land: number) {
  const landLevels = levels[land];
  if (!landLevels) return [];
  return landLevels.map((level) => level.letter);
}

function getLettersForDifficulty(
  land: number,
  difficulty: DifficultyLevel,
  letter: string,
): string[] {
  const allLandLetters = getLandLetters(land);
  const extraLetterCount = difficultyLetterCountMap[difficulty];

  const letters = [letter];

  for (
    let i = 0;
    letters.length - 1 < extraLetterCount && i < allLandLetters.length;
    i += 1
  ) {
    if (allLandLetters[i] !== letter) {
      letters.push(allLandLetters[i]);
    }
  }

  return letters;
}

function getRepeatedLetters(letters: string[], repeatFactor: number): string[] {
  return letters.flatMap((letter) => Array(repeatFactor).fill(letter));
}

export default class MainScene extends Scene {
  private readonly padding: number = 20; // Example padding value

  private onReady: () => void;

  private lives: number;

  private difficulty: DifficultyLevel;

  private land: number;

  private letter: string;

  private balloons: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[];

  private letters: Phaser.GameObjects.Text[];

  private hearts: Phaser.GameObjects.Sprite[];

  private onComplete: (gameVariables: GameVariables) => void;

  constructor(
    onReady: () => void,
    onComplete: (gameVariables: GameVariables) => void,
    gameVariables: GameVariables,
  ) {
    super("MainScene");
    this.onReady = onReady;
    this.lives = gameVariables.lives || 3;
    this.difficulty = gameVariables.difficulty;
    this.land = gameVariables.land;
    this.letter = gameVariables.letter;
    this.onComplete = onComplete;
    this.balloons = [];
    this.letters = [];
    this.hearts = [];
  }

  public create(): void {
    this.add
      .tileSprite(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        "background",
      )
      .setOrigin(0);
    // .setScrollFactor(2)
    // .setScale(2.3, 2);

    this.anims.create({
      key: "slashAnimation",
      frames: [
        { key: "slash1" },
        { key: "slash2" },
        { key: "slash3" },
        { key: "slash4" },
        { key: "slash5" },
        { key: "slash6" },
        { key: "slash7" },
        { key: "slash8" },
        { key: "slash9" },
        { key: "slash10" },
      ],
      frameRate: 20,
    });

    for (let i = 0; i < this.lives; i += 1) {
      this.hearts.push(
        this.add.sprite(120 * i + 60, 60, "hearts", "heartFull"),
      );
    }

    this.onReady();
    this.createLetters();
  }

  private createLetters(): void {
    const letters = getRepeatedLetters(
      getLettersForDifficulty(this.land, this.difficulty, this.letter),
      4,
    );

    letters.forEach((letter, index) => {
      this.balloons[index] = this.physics.add
        .image(1024, 1042, "balloon")
        .setCircle(75)
        .setVelocity(
          Phaser.Math.Between(-100, 100),
          Phaser.Math.Between(-100, 100),
        )
        .setBounce(1)
        .setCollideWorldBounds(true)
        .setInteractive();

      this.balloons[index]
        .on("pointerdown", () => {
          if (letter === this.letter) {
            // play animation and remove balloon
            const offset = 120;
            const slash = this.add.sprite(
              this.balloons[index].x - offset,
              this.balloons[index].y,
              "frame1",
            );
            slash.play("slashAnimation");
            slash.on("animationcomplete", () => {
              slash.destroy();
              this.balloons[index].destroy();
              this.letters[index].destroy();
              this.sound.play("correct");
              this.sound.play("hiss");
            });

            // play correct sound
          } else {
            this.sound.play("incorrect");
            this.lives -= 1;
            this.loseHeart(this.lives);
          }
        })
        .on("pointerover", () => {
          this.game.canvas.style.cursor = "pointer";
        })
        .on("pointerout", () => {
          this.game.canvas.style.cursor = "default";
        });

      this.letters[index] = this.add.text(0, 0, letter, {
        font: "100px Inter",
        color: "#000",
        padding: { left: 10, right: 10, top: 10, bottom: 10 },
      });
    });
  }

  public update(): void {
    this.letters.forEach((letter, index) => {
      const xOffset = -40;
      const yOffset = -100;
      letter.setPosition(
        this.balloons[index].x + xOffset,
        this.balloons[index].y + yOffset,
      );
    });
  }

  private loseHeart(heartIndex: number) {
    if (heartIndex >= 0 && heartIndex < this.hearts.length) {
      this.hearts[heartIndex].setFrame("heartEmpty");
    }
  }
}
