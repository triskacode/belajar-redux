import { BaseException } from "./base.exception";

export interface BadRequestException extends BaseException {
  data: {
      message: string[];
      statusCode: 400;
      error: string;
  };
  status: 400;
}
