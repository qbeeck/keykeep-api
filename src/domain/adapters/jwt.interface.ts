export interface JwtServicePayload {
  username: string;
}

export interface JwtService {
  checkToken(token: string): Promise<any>;
  createToken(
    payload: JwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}
