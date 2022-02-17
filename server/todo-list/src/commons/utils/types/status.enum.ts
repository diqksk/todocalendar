export enum ErrorStatus {
  BAD_REQUEST = 400,
  INVALID_PARAMETER = 400,
  NOT_AUTHORIZED = 401,
  NOT_FOUND = 404,
  ALREADY_EXIST = 409,
  SERVER_ERROR = 500,
}

export enum SuccessStatus {
  SUCCESS = 200,
  REDIRECT = 301,
}
