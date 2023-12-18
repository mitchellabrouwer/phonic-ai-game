import Phaser from "phaser";

export default class MessageDisplay {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  showMessage(message: string): void {
    this.scene.add.text(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY,
      message,
      {
        font: "90px Inter",
        color: "#ffffff",
        padding: { left: 10, right: 10, top: 10, bottom: 10 },
      },
    );
  }
}
