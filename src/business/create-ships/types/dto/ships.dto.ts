export type ShipIndex = 0 | 1 | 2;
export type ShipSize = 4 | 5;

export type MakePointsDTO = { index: ShipIndex; size: ShipSize };
export type PlaceShipWithDirectionDTO = { shipIndex: ShipIndex };
