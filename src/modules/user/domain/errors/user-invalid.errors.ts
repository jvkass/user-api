import { DomainError } from "@src/libs/ddd/domain/enums/domain-error.enum";
import { AbstractError } from "@src/libs/exceptions/abstract.error";

export class UserInvalidError extends AbstractError {
  constructor(metadata: unknown) {
    super(metadata, DomainError.APIE002);
  }
}
