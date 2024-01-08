// outsource dependencies
import _ from 'lodash';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


// local dependencies
import { config } from '@/constants';
import { UserModel } from '@/types/models/user.ts';
import { storeLogger } from '@/services/store-logger';


const storeName = `${config('NAME')} - ${config('SID')} - App`;

export type AppState = {
  initialized: boolean,
  health: boolean,
  firstName: string,
  lastName: string,
  user?: UserModel | null
}

export type AppAction = {
  initialize: (state: Partial<AppState | {}>) => void
  updateFirstName: (firstName: AppState['firstName']) => void
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
            const response = await fetch('/api/actuator/health');
            const health = await response.json();

            set((state) => {
              return {
                ...state,
                health: _.isEqual(_.get(health, 'status'), 'UP'),
                initialized: true
              };
            });
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
        enabled: process.env.NODE_ENV === 'development',
      }
    ),
    storeName,
  ),
);
