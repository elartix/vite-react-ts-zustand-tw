// local dependencies
import { ROLE } from '@/constants';

export type UserModel = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  streetAddress: string;
  cityStateZip: string;
  phone: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  role: ROLE
};

export type UserModelResponse = {
  users: UserModel[];
};
