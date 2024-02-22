export class AppError extends Error {
  errorCode: number;
  errorMessage: string;
  constructor(errorCode: number, errorMessage: string) {
    super();
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}
