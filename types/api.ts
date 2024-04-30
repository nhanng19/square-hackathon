import { NextApiRequest } from "next";
import { MetaDataType, SquareDataType } from "./user";

export interface NextApiUserRequest extends NextApiRequest {
  user: { username: string };
}

export interface RefreshTokenResponse {
  squareData: SquareDataType;
  metaData: MetaDataType;
  message: string;
}
