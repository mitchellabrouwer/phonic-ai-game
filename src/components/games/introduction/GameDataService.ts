/* eslint-disable @typescript-eslint/no-explicit-any */
type ObserverFunction = (data: any) => void;

class GameDataService {
  private observers: ObserverFunction[] = [];

  public subscribe(observerFunction: ObserverFunction): void {
    this.observers.push(observerFunction);
  }

  public notify(data: any): void {
    console.log("notify", data);
    this.observers.forEach((observer) => observer(data));
  }
}

const gameDataService = new GameDataService();
export default gameDataService;
