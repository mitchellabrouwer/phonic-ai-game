import Phaser from "phaser";

export default class AnimationManager {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createAnimations(): void {
    this.scene.anims.create({
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

    this.scene.anims.create({
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
  }

  // eslint-disable-next-line class-methods-use-this
  playAnimation(sprite: Phaser.GameObjects.Sprite, animationKey: string): void {
    sprite.play(animationKey);
  }
}
