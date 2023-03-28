import { AbstractError } from "@src/libs/exceptions/abstract.error";

export class UserNotExistError extends AbstractError {
  constructor(metadata: unknown, code: string) {
    super(metadata, code);
  }
}
