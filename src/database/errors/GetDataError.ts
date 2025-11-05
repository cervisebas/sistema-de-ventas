export class GetDataError extends Error {
  public cause: unknown;
  public classOrigin: unknown;

  constructor(classOrigin: unknown, error: unknown) {
    super();
    this.cause = error;
    this.classOrigin = classOrigin;
  }

  public getError() {
    return {
      cause: this.cause,
      classOrigin: this.classOrigin,
    };
  }
}
