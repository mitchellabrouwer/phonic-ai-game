import Phaser from "phaser";
import {
  DifficultyLevel,
  GameStats,
  GameVariables,
} from "../../../../types/types";
import AnimationManager from "./AnimationManager";
import BalloonManager from "./BalloonManager";
import LetterManager from "./LetterManager";
import LivesManager from "./LivesManager";
import ScoreManager from "./ScoreManager";
import { letterOffsets, scaling } from "./gameConstants";
import {
  getLettersForDifficulty,
  getRepeatedLetters,
  getScreenBreakpoint,
} from "./utils";

export default class MainScene extends Phaser.Scene {
  private livesManager: LivesManager;

  private scoreManager: ScoreManager;

  private balloonManager: BalloonManager;

  private letterManager: LetterManager;

  private animationManager: AnimationManager;

  private background: Phaser.GameObjects.TileSprite | null;

  private gameOver: boolean = false;

  private difficulty: DifficultyLevel;

  private land: number;

  private letter: string;

  public lives: number;

  private onComplete: ({ time, livesLeft }: GameStats) => void;

  constructor(
    gameVariables: GameVariables,
    onComplete: ({ time, livesLeft }: GameStats) => void,
  ) {
    super("MainScene");

    this.difficulty = gameVariables.difficulty;
    this.land = gameVariables.land;
    this.letter = gameVariables.letter;
    this.lives = gameVariables.lives || 3;
    this.gameOver = false;
    this.background = null;
    this.onComplete = onComplete;

    this.livesManager = new LivesManager(this);
    this.scoreManager = new ScoreManager(this);
    // this.messageDisplay = new MessageDisplay(this);
    this.balloonManager = new BalloonManager(this);
    this.letterManager = new LetterManager(this);
    this.animationManager = new AnimationManager(this);
  }

  create(): void {
    const { width, height } = this.cameras.main;
    const letters = getRepeatedLetters(
      getLettersForDifficulty(this.land, this.difficulty, this.letter),
      4,
    );

    this.background = this.add
      .tileSprite(0, 0, width, height, "background")
      .setOrigin(0);

    this.livesManager.createHearts(this.lives);
    this.scoreManager.createScoreDisplay();
    this.animationManager.createAnimations();

    this.scale.on("resize", this.handleResizeGame, this);

    letters.forEach((letter, index) => {
      this.balloonManager.createBalloon(
        letter,
        width,
        height,
        (hitLetter, balloon) => {
          if (hitLetter === this.letter) {
            this.handleCorrectHit(balloon, index);
          } else {
            this.handleIncorrectHit(balloon);
          }
        },
      );
      this.letterManager.createLetter(letter, width, height);
    });
    this.livesManager.updateHeartsDisplay(width);
    this.physics.add.collider(
      this.balloonManager.balloons,
      this.balloonManager.balloons,
    );
  }

  update(): void {
    const breakpoint = getScreenBreakpoint(this.cameras.main.width);
    const xOffset = letterOffsets[breakpoint].x;
    const yOffset = letterOffsets[breakpoint].y;

    if (!this.gameOver) {
      this.isWin();
      this.onComplete({ livesLeft: this.lives, time: 10 });
    }

    this.letterManager.letters.forEach((letter, index) => {
      letter.setPosition(
        this.balloonManager.balloons[index].x + xOffset,
        this.balloonManager.balloons[index].y + yOffset,
      );
    });
  }

  handleCorrectHit(balloon: Phaser.Physics.Arcade.Image, index: number) {
    const greenSlash = this.add.sprite(balloon.x, balloon.y, "frame1");
    greenSlash.play("greenSlashAnimation").setScale(0.5);
    this.sound.play("correct");
    this.scoreManager.incrementScore();

    greenSlash.on("animationcomplete", () => {
      this.sound.play("hiss");
      greenSlash.destroy();
      balloon.destroy();
      this.scoreManager.incrementScore();
      this.balloonManager.popped[index] = true;
      this.balloonManager.balloons[index].destroy();
      this.letterManager.letters[index].destroy();
    });
  }

  handleIncorrectHit(balloon: Phaser.Physics.Arcade.Image) {
    const redSlash = this.add.sprite(balloon.x - 50, balloon.y - 80, "frame1");
    redSlash.play("redSlashAnimation");
    this.sound.play("incorrect");
    redSlash.on("animationcomplete", () => {
      redSlash.destroy();
    });

    this.livesManager.loseLife();
  }

  handleResizeGame(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    const screenSize = getScreenBreakpoint(width);
    const scaleFactor = scaling[screenSize];

    this.cameras.main.setSize(width, height);
    this.cameras.main.setBounds(0, 0, width, height);

    if (this.background) this.background.setSize(width, height);

    this.livesManager.updateHeartsDisplay(width);
    this.scoreManager.handleResize(gameSize);

    this.letterManager.handleResize(gameSize, scaleFactor);
    this.balloonManager.handleResize(gameSize, scaleFactor);
    this.balloonManager.releaseBalloons(width, height);
  }

  private isWin() {
    if (
      this.balloonManager.popped.filter((isPopped) => isPopped).length ===
      this.letterManager.letters.filter((letter) => letter.text === this.letter)
        .length
    ) {
      this.winGame();
    }
    return false;
  }

  private winGame() {
    this.gameOver = true;
    this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.5,
    );

    const message = "You Win!";
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
  }

  loseGame() {
    this.gameOver = true;
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
