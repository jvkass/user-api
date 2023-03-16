import { AbstractError } from "@src/libs/exceptions/abstract.error";

export class EmailExistError extends AbstractError {
  constructor(metadata: unknown) {
    super(metadata, "Já existe um usuário com esse email");
  }
}
