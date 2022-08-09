import random from 'lodash/random';
import { action, makeAutoObservable, transaction } from 'mobx';

import { ALPHABET, NUMERIC } from '@/shared/const';
import { MakePointsDTO, PlaceShipWithDirectionDTO, ShipIndex } from '../types/dto';
import { ShipStoreConfig, StartingPointesShape, Direction } from '../types/model';

export class CreateShipsStore {
  public shipsLocation: Record<string, boolean> = {};
  public normalizedLocation: string[][] = [];
  private _config: ShipStoreConfig;
  private _startingPoints: StartingPointesShape = {} as StartingPointesShape;
  private _startingRange = 1;
  private _alphaRange = ALPHABET;
  private _numRange = NUMERIC;
  private _randomize = random;

  constructor(config: ShipStoreConfig) {
    makeAutoObservable(this, {
      makeStartingPoint: action,
      placeShipWithDirection: action
    });
    this._config = config;
    this.placeShips();
  }

  private placeShips() {
    this._config.map((item, index) => {
      // #1 randomize first coordinate
      this.makeStartingPoint({ index, size: item.size } as MakePointsDTO);
      // #3 abstracted some conditions in this entry point - check #4
      this.placeShipWithDirection({ shipIndex: index } as PlaceShipWithDirectionDTO);
    });
  }

  private _getRandomCoordinate = () => {
    return (
      this._alphaRange[this._randomize(this._startingRange, this._alphaRange.length - 1)] +
      String(this._randomize(this._startingRange, this._alphaRange.length))
    );
  };

  makeStartingPoint({ index, size }: MakePointsDTO) {
    // #2 check if it's not reserved already - randomize recursively if it's not free;
    const randomCoordinate = this._getRandomCoordinate();
    const ifDuplicatedIndex = !!this._startingPoints[index] || !!this.shipsLocation[randomCoordinate];
    const ifDuplicatedCoordinate =
      !!ifDuplicatedIndex && Object.keys(this._startingPoints[index] ?? {})?.[0] === randomCoordinate;
    if (!ifDuplicatedIndex && !ifDuplicatedCoordinate) {
      this._startingPoints[index] = { [randomCoordinate]: size };
      return randomCoordinate;
    } else {
      this.makeStartingPoint({ index, size });
      return false;
    }
  }

  getStartingPointCoordinateByIndex(index: ShipIndex) {
    return Object.keys(this._startingPoints[index] ?? [])?.[0];
  }

  getStartingPointSizeByIndex(index: ShipIndex) {
    return Object.values(this._startingPoints[index] ?? [])?.[0];
  }

  placeShipWithDirection = ({ shipIndex }: PlaceShipWithDirectionDTO): boolean => {
    // #4 baking some data here to start drawing a ship
    const directionsSet = ['UP', 'DOWN', 'LEFT', 'RIGHT'] as const;
    const randomDirection = directionsSet[this._randomize(directionsSet.length - 1)];

    const shipSize = this.getStartingPointSizeByIndex(shipIndex);
    const startingPoint = this.getStartingPointCoordinateByIndex(shipIndex);

    if (!shipSize && startingPoint) {
      throw new Error('Attempt to place ship failed - no starting point found');
    }

    const shipLeftover = shipSize - 1;

    // #5 we need these indexes to verify if if given ship can be placed with random inputs
    const [alpha, num] = startingPoint.split('');
    const currentAlphaIndex = this._alphaRange.findIndex((value) => value === alpha);
    const currentNumIndex = this._numRange.findIndex((value) => value === num);

    // #6 conditions to check if we are not hitting the board edges
    const isDirectionAllowed = this.isDirectionAllowed(
      randomDirection,
      currentAlphaIndex,
      shipLeftover,
      currentNumIndex
    );

    // #7 attempting to draw a ship with the recursive call as a fallback;
    return isDirectionAllowed
      ? this.placeIfNotOverlapping(randomDirection, shipIndex)
      : this.placeShipWithDirection({ shipIndex });
  };

  placeIfNotOverlapping = (direction: Direction, shipIndex: ShipIndex) => {
    const shipSize = this.getStartingPointSizeByIndex(shipIndex);
    const startingPoint = this.getStartingPointCoordinateByIndex(shipIndex);

    const [alpha, num] = startingPoint.split('');

    const currentAlphaIndex = this._alphaRange.findIndex((value) => value === alpha);
    const currentNumIndex = this._numRange.findIndex((value) => value === num);

    const operate = (one: number, second: number) =>
      direction === 'DOWN' || direction === 'RIGHT' ? one + second : one - second;

    const iteratee = [...Array(shipSize)];

    const getNextPrevIndex = (direction: string, i: number) => {
      let nextPrevIndex;
      if (direction === 'UP' || direction === 'DOWN') {
        nextPrevIndex = this._alphaRange[operate(currentAlphaIndex, i)] + num;
      } else {
        nextPrevIndex = alpha + this._numRange[operate(currentNumIndex, i)];
      }

      return nextPrevIndex;
    };

    const isOverlapping =
      iteratee.map((_, i) => i && this.shipsLocation[getNextPrevIndex(direction, i)]).filter(Boolean).length > 0;

    if (isOverlapping) {
      return this.placeShipWithDirection({ shipIndex });
    }

    this.shipsLocation[this._alphaRange[currentAlphaIndex] + num] = true;

    if (!this.normalizedLocation[shipIndex]) {
      this.normalizedLocation[shipIndex] = [];
    }
    this.normalizedLocation[shipIndex].push(this._alphaRange[currentAlphaIndex] + num);

    return (
      iteratee.map((_, i) => {
        if (!i) {
          return;
        }
        this.normalizedLocation[shipIndex].push(getNextPrevIndex(direction, i));
        return (this.shipsLocation[getNextPrevIndex(direction, i)] = true);
      }).length > 0
    );
  };

  isDirectionAllowed = (
    direction: Direction,
    currentAlphaIndex: number,
    shipLeftover: number,
    currentNumIndex: number
  ) => {
    let allowedDirection = false;
    switch (direction) {
      case 'UP':
        if (currentAlphaIndex > shipLeftover) {
          allowedDirection = true;
        }
        break;
      case 'DOWN':
        if (this._alphaRange.length - currentAlphaIndex > shipLeftover) {
          allowedDirection = true;
        }
        break;
      case 'LEFT':
        if (currentNumIndex > shipLeftover) {
          allowedDirection = true;
        }
        break;
      case 'RIGHT':
        if (this._numRange.length - currentNumIndex > shipLeftover) {
          allowedDirection = true;
        }
        break;
      default:
        break;
    }
    return allowedDirection;
  };
}
