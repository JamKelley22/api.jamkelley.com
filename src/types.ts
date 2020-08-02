import { MysqlError } from 'mysql';

export class Error {
  error: boolean | unknown;
  mySQLError: MysqlError | unknown;
  code: ErrorCode | unknown;
  message: string | unknown;

  constructor(data: Record<string, unknown>) {
    this.error = data.error;
    this.mySQLError = data.mySQLError;
    this.code = data.code;
    this.message = data.message;
  }
}

export enum ErrorCode {
  NOT_FOUND
}
