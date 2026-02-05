// outsource dependencies
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { get as _get, isEqual } from 'es-toolkit/compat';


// local dependencies
import { config } from '@/constants';
import { type UserModel } from '@/types/models/user';
import { storeLogger } from '@/services/store-logger';


const storeName = `${config('NAME')} - ${config('SID')} - App Global`;

export type AppState = {
  initialized: boolean,
  health: boolean,
  firstName: string,
  lastName: string,
  user?: UserModel | null
}

export type AppAction = {
  initialize: (state: Partial<AppState | NonNullable<unknown>>) => void,
  updateFirstName: (firstName: AppState['firstName']) => void,
  updateLastName: (lastName: AppState['lastName']) => void
}

export type AppControllerStateAction = AppState & AppAction;

const initialAppState: AppState = {
  initialized: false,
  health: false,
  firstName: '',
  lastName: ''
};

export const useAppControllerStore = create<AppControllerStateAction>()(
  storeLogger(
    devtools(
      persist<AppControllerStateAction>(
        (set, get) => ({
          ...initialAppState,
          initialize: async () => {
            try {
              const response = await fetch('/api/actuator/health');
              const health = await response.json();

              set((state) => {
                return {
                  ...state,
                  health: isEqual(_get(health, 'status'), 'UP'),
                  initialized: true
                };
              });
            } catch (error) {
              set((state) => {
                return {
                  ...state,
                  health: false,
                  initialized: false
                };
              });
            }
          },
          updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
          updateLastName: (lastName) => set(() => ({ lastName: lastName })),
        }),
        {
          name: storeName, // unique name for this store
          // getStorage: () => sessionStorage, // default is localStorage
        }
      ),
      {
        name: storeName,
        enabled: import.meta.env.NODE_ENV === 'development',
      }
    ),
    storeName,
  ),
);
