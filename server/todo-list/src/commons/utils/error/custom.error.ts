export class ResponseError extends Error {
  constructor(private readonly code: number, readonly msg: string) {
    super(msg);
  }
}
