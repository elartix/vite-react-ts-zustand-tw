// outsource dependencies
import { create } from 'zustand';


// local dependencies
import { UserModel } from '@/types/models/user.ts';


// Define the interface of the state
interface State {
  user: UserModel[]
}
