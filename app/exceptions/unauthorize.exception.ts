import { BaseException } from "./base.exception";

export interface UnauthorizeException extends BaseException {
  status: 401;
  data: {
    message: string;
    statusCode: 401;
  };
}
