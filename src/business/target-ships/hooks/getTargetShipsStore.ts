import { createContext, useContext } from 'react';
import { TargetShipsStore } from '../store';

export const TargetShipsStoreContext = createContext(new TargetShipsStore());
export const useTargetShipsStore = () => useContext(TargetShipsStoreContext);
