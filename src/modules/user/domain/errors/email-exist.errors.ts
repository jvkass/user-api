import { DomainError } from "@src/libs/ddd/domain/enums/domain-error.enum";
import { AbstractError } from "@src/libs/exceptions/abstract.error";
import { Domain } from "domain";

export class EmailExistError extends AbstractError {
  constructor(metadata: unknown) {
    super(metadata, DomainError.APIE001);
  }
}
