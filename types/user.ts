export interface DBUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  salt: string;
  avatar: string;
  createdAt: string;
  userDeniedSquare?: boolean;
  squareData?: SquareDataType;
  metaData?: MetaDataType;
}

export interface CreateUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  salt: string;
  avatar: string;
}

export interface BasicUserData {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface SquareDataType {
  tokens?: string;
  refreshToken?: string;
  expiresAt?: string;
  merchantId?: string;
  userId?: string;
}

export interface MetaDataType {
  scopes?: string;
  squareTokenLastUpdated?: string;
  iv?: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LastModifiedData {
  [key: string]: {
    id: string;
  };
}

export interface MerchantData {
  [key: string]: string;
}

export interface AuthStatus {
  isAuthed: boolean;
  userDeniedSquare: boolean;
}
