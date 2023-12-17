import { Scene } from "phaser";
import levels from "../../../levels/levels";
import { DifficultyLevel, GameVariables } from "../../../types/types";

const breakpoint = {
  sm: 640,
  md: 768,
  lg: 1024,
};

const scaling = {
  sm: 0.2,
  md: 0.5,
  lg: 0.7,
};

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
  private onReady: () => void;

  private lives: number;

  private livesText: Phaser.GameObjects.Text | null = null;

  private hearts: Phaser.GameObjects.Sprite[];

  private difficulty: DifficultyLevel;

  private land: number;

  private letter: string;

  private balloons: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[];

  private popped: boolean[];

  private letters: Phaser.GameObjects.Text[];

  private background: Phaser.GameObjects.TileSprite | null;

  private score: number;

  private scoreDisplay: Phaser.GameObjects.Text | null;

  private gameOver: boolean = false;

  private scaleFactor: number;

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
    this.background = null;
    this.balloons = [];
    this.popped = [];
    this.letters = [];
    this.hearts = [];
    this.score = 0;
    this.scoreDisplay = null;
    this.scaleFactor = 1;
  }

  public create(): void {
    this.background = this.add
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

    this.scale.on("resize", (gameSize: Phaser.Structs.Size) => {
      console.log(gameSize.width);
      console.log(gameSize.height);

      this.resizeBackground(gameSize.width, gameSize.height);
    });

    for (let i = 0; i < this.lives; i += 1) {
      this.hearts.push(
        this.add.sprite(120 * i + 60, 60, "hearts", "heartFull"),
      );
    }

    this.livesText = this.add
      .text(0, 0, `Lives: ${this.lives}`, {
        font: "30px Inter",
        color: "#000",
      })
      .setVisible(false);

    this.updateHeartsDisplay();

    this.scoreDisplay = this.add.text(0, 0, String(this.score), {
      font: "100px Inter",
      color: "#000",
      padding: { left: 10, right: 10, top: 10, bottom: 10 },
    });

    this.scoreDisplay.setX(this.cameras.main.width - 20);

    this.anims.create({
      key: "redSlashAnimation",
      frames: [
        { key: "redSlash1" },
        { key: "redSlash2" },
        { key: "redSlash3" },
        { key: "redSlash4" },
        { key: "redSlash5" },
        { key: "redSlash6" },
        { key: "redSlash7" },
        { key: "redSlash8" },
      ],
      frameRate: 20,
    });

    this.anims.create({
      key: "greenSlashAnimation",
      frames: [
        { key: "greenSlash1" },
        { key: "greenSlash2" },
        { key: "greenSlash3" },
        { key: "greenSlash4" },
        { key: "greenSlash5" },
        { key: "greenSlash6" },
        { key: "greenSlash7" },
        { key: "greenSlash8" },
        { key: "greenSlash9" },
        { key: "greenSlash10" },
      ],
      frameRate: 20,
    });

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
        .image(this.cameras.main.width, this.cameras.main.height, "balloon")
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
            const greenSlash = this.add.sprite(
              this.balloons[index].x,
              this.balloons[index].y,
              "frame1",
            );
            greenSlash.play("greenSlashAnimation").setScale(0.5);
            this.sound.play("correct");
            this.score += 1;
            if (this.scoreDisplay?.text) {
              this.scoreDisplay.text = String(this.score);
            }
            greenSlash.on("animationcomplete", () => {
              greenSlash.destroy();
              this.balloons[index].destroy();
              this.popped[index] = true;
              this.letters[index].destroy();
              this.sound.play("hiss");
            });
          } else {
            const redSlash = this.add.sprite(
              this.balloons[index].x - 50,
              this.balloons[index].y - 80,
              "frame1",
            );
            redSlash.play("redSlashAnimation");
            this.sound.play("incorrect");
            redSlash.on("animationcomplete", () => {
              redSlash.destroy();
            });

            this.loseLife();
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
    if (!this.gameOver) {
      this.isWin();
    }

    this.letters.forEach((letter, index) => {
      const xOffset = -40;
      const yOffset = -100;
      letter.setPosition(
        this.balloons[index].x + xOffset,
        this.balloons[index].y + yOffset,
      );
    });
  }

  private releaseBalloons() {
    this.balloons.forEach((balloon, index) => {
      if (!this.popped[index]) {
        balloon.setPosition(this.cameras.main.width, this.cameras.main.height);
      }
    });
  }

  private updateHeartsDisplay() {
    const isSmallScreen = this.cameras.main.width < breakpoint.md;

    if (isSmallScreen) {
      this.hearts.forEach((heart, index) => {
        heart.setVisible(index === 0);
        if (index === 0 && this.livesText) {
          this.livesText.setX(heart.x - 5);
          this.livesText.setY(heart.y);
          this.livesText.setText(String(this.lives));
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

  private resizeBackground(width: number, height: number) {
    this.cameras.main.setSize(width, height);
    this.cameras.main.setBounds(0, 0, width, height);

    if (this.background) {
      this.background.setSize(width, height);
    }

    this.updateHeartsDisplay();

    if (this.scoreDisplay) {
      this.scoreDisplay.setX(this.cameras.main.width - 10);
    }

    this.resizeGameElements(width);
    this.releaseBalloons();
  }

  private resizeGameElements(width: number) {
    if (width < breakpoint.sm) {
      this.scaleFactor = scaling.sm;
    } else if (width >= breakpoint.sm && width < breakpoint.md) {
      this.scaleFactor = scaling.md;
    } else if (width >= breakpoint.md && width < breakpoint.lg) {
      this.scaleFactor = scaling.lg;
    } else {
      this.scaleFactor = 1; // Default scale for larger screens
    }

    this.balloons.forEach((balloon) => {
      balloon.setScale(this.scaleFactor);
    });

    this.letters.forEach((letter) => {
      letter.setFontSize(this.scaleFactor * 100);
    });
  }

  private loseLife() {
    this.lives -= 1;
    const heartIndex = this.lives;

    if (heartIndex >= 0 && heartIndex < this.hearts.length) {
      this.hearts[heartIndex].setFrame("heartEmpty");
    }
    if (this.livesText) {
      this.livesText.setText(String(this.lives));
    }

    if (this.lives === 0) this.loseGame();
  }

  private isWin() {
    if (
      this.popped.filter((isPopped) => isPopped).length ===
      this.letters.filter((letter) => letter.text === this.letter).length
    ) {
      this.winGame();
    }
    return false;
  }

  private winGame() {
    this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.5,
    );

    const message = "You Won!";
    this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      message,
      {
        font: "90px Inter",
        color: "#ffffff",
        padding: { left: 10, right: 10, top: 10, bottom: 10 },
      },
    );
    console.log("win game");
    this.gameOver = true;
  }

  private loseGame() {
    this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.5,
    );

    const message = "Try again!";
    this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      message,
      {
        font: "100px Inter",
        color: "#ffffff",
        padding: { left: 10, right: 10, top: 10, bottom: 10 },
      },
    );
    console.log("try again");
  }
}
