import { createContext, useContext } from 'react';

import { CREATE_SHIPS_CONFIG } from '../const';
import { CreateShipsStore } from '../store';
import { ShipStoreConfig } from '../types/model';

export const ShipsStoreContext = createContext(new CreateShipsStore(CREATE_SHIPS_CONFIG as ShipStoreConfig));
export const useCreateShipsStore = () => useContext(ShipsStoreContext);
