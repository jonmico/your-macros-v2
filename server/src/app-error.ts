export class AppError extends Error {
  errorCode: number;
  // errorMessage: string;
  constructor(errorCode: number, message: string) {
    super(message);
    this.errorCode = errorCode;
    // this.errorMessage = errorMessage;
  }
}
