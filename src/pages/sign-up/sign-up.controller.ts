// outsource dependencies
import _ from 'lodash';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


// local dependencies
import { config } from '@/constants';
import { UserModel } from '@/types/models/user';
import { storeLogger } from '@/services/store-logger';


const storeName = `${config('NAME')} - ${config('SID')} - App SignUp`;

export type SignUpState = {
  initialized: boolean,
  isLoading: boolean,
  health: boolean,
  user?: Partial<UserModel> | null,
  submitErrorMessage: string | null
}

export type SignUpAction = {
  initialize: (state: Partial<SignUpState | NonNullable<unknown>>) => void
  signUp: (user: SignUpState['user']) => void,
  resetSubmitErrorMessage: () => void
}

export type SignUpControllerStateAction = SignUpState & SignUpAction;

const initialSignUpState: SignUpState = {
  isLoading: false,
  initialized: false,
  health: false,
  submitErrorMessage: null,
  user: null
};

export const useSignUpControllerStore = create<SignUpControllerStateAction>()(
  storeLogger(
    devtools(
      persist<SignUpControllerStateAction>(
        (set, get) => ({
          ...initialSignUpState,
          initialize: async () => {
            try {
              const response = await fetch('/api/actuator/health');
              const health = await response.json();

              set((state) => {
                return {
                  ...state,
                  health: _.isEqual(_.get(health, 'status'), 'UP'),
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
          resetSubmitErrorMessage: () => set(() => ({ submitErrorMessage: null })),
          signUp: async (user) => {
            set((state) => ({ ...state, isLoading: true }));

            try {
              const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ ...user })
              });
              const json = await response.json();
              // console.log(json)
              set((state) => {
                return {
                  ...state,
                  user: _.get(json, 'data.user', null),
                  isLoading: false,
                };
              });
            } catch (error) {
              set((state) => {
                return {
                  ...state,
                  isLoading: false,
                  // @ts-ignore
                  submitErrorMessage: error?.message
                };
              });
            }
          }
          // signUp: (user) => set((state) => ({ ...state, user })),
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
