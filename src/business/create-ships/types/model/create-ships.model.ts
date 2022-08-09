import { ALPHABET } from '@/shared/const';
import { ShipIndex, ShipSize } from '../dto';

export type AlphabetUnion = typeof ALPHABET[number];
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type StartingPointesShape = Record<ShipIndex, Record<string, ShipSize>>;
export type ShipStoreConfig = [{ size: ShipSize }, { size: ShipSize }, { size: ShipSize }];
