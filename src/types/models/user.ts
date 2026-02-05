// local dependencies
import { type Role } from '@/constants';

export type UserModel = {
  id: string,
  firstName: string,
  lastName: string,
  name: string,
  streetAddress: string,
  cityStateZip: string,
  phone: string,
  username: string,
  password: string,
  email: string,
  avatar: string,
  role: Role
};

export type UserModelResponse = {
  users: UserModel[]
};
