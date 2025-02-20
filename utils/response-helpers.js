export class ResData {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    if (data !== undefined) {
      this.data = data;
    }
  }
}

export class CustomError extends Error {
  constructor(status, meesage) {
    super(meesage);
    this.status = status;
  }
}
