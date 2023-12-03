interface Response {
  status: number;
  message: string;
  code: string;
}

export class CustomError extends Error {
  response: {
    status: number;
    message: string;
    code: string;
  };

  constructor(response: Response) {
    super();
    this.response = response;
  }
}
