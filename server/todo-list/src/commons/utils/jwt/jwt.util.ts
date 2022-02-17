import { sign, verify, JwtPayload, SignOptions } from 'jsonwebtoken';
import { ResponseError } from '../error/custom.error';
import { ErrorStatus } from '../types/status.enum';
import { config } from 'dotenv';

config();
const SECRET_KEY = process.env.SECRET_KEY;

export const generateJwt = (userId: string, options?: SignOptions) => {
  try {
    const accessToken = sign({ userId }, '1234', options);
    return accessToken;
  } catch (e) {
    throw new ResponseError(ErrorStatus.BAD_REQUEST, e);
  }
};

export const isValidJwt = (token: string): string | JwtPayload => {
  try {
    const validToken = verify(token, SECRET_KEY);
    return validToken;
  } catch (e) {
    throw new ResponseError(ErrorStatus.BAD_REQUEST, e);
  }
};
