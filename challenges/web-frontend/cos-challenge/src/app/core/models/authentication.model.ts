export interface Authentication {
  authenticated: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  token: string;
  type: number;
  privileges: string;
}
