import { ExceptionBase } from "./exception.base";

export abstract class AbstractError extends ExceptionBase {
  static readonly message: "Abstract Invalid";

  public code = "";

  constructor(metadata: unknown, code: string) {
    super("", metadata);

    this.code = code;
  }
}
