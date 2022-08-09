import { action, makeAutoObservable } from 'mobx';
import remove from 'lodash/remove';

export class TargetShipsStore {
  public normalizedShort: Record<string, boolean> = {};
  public shots: string[] = [];
  public remainingShips: string[][] = [];
  public debugMode = false;
  public isLastShootHit = false;
  public isLastShootSink = false;
  public isLastShootMiss = false;
  public gameOver = false;

  constructor() {
    makeAutoObservable(this, {
      makeShootAndRecordStatus: action
    });
  }

  makeShootAndRecordStatus = (coordinate: string) => {
    if (!coordinate) {
      return;
    }
    if (coordinate === 'SHOW') {
      this.debugMode = true;
      this.disableShowMode();
      return;
    } else if (this.debugMode) {
      this.debugMode = false;
    }
    this.normalizedShort[coordinate] = true;
    this.shots.push(coordinate);
    const isHit = this.remainingShipsMutation();
    const isSink = this.ifSinkShip(isHit);

    this.isLastShootHit = isHit;
    this.isLastShootMiss = !isHit;
    this.isLastShootSink = isSink;
    if (!this.remainingShips.length) {
      this.gameOver = true;
    }
  };

  disableShowMode = () => {
    setTimeout(() => {
      this.debugMode = false;
    }, 10000);
  };

  initMapping = (shipsLocation: string[][]) => {
    if (!this.remainingShips.length) {
      this.remainingShips = shipsLocation;
    }
  };

  ifSinkShip = (isHit: boolean) => {
    const shipsNumber = this.remainingShips.length;
    if (isHit && !!shipsNumber) {
      const { length: isShipWasSink } = remove(this.remainingShips, (coords) => !coords.length);
      return !!isShipWasSink;
    } else {
      return false;
    }
  };

  remainingShipsMutation = () => {
    const lastShot = this.shots.at(-1);
    if (!lastShot) {
      return false;
    }

    const { length: numberOfHits } = this.remainingShips
      .map((ship) => {
        const { length: shotIndeed } = remove(ship, (coord) => lastShot === coord);
        return shotIndeed;
      })
      .filter(Boolean);

    return !!numberOfHits;
  };
}
