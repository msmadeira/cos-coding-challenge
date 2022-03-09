import { Authentication } from '../models/authentication.model';

export const mockedAuthentication: Authentication = {
  token: 'mocked-token',
  privileges: 'mocked-privileges',
  userId: 'mocked-user-id',
  authenticated: true,
  internalUserId: 1,
  type: 1,
  internalUserUUID: 'mocked-user-uuid'
};
