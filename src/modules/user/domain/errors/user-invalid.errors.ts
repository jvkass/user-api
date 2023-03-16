import { AbstractError } from "@src/libs/exceptions/abstract.error";

export class UserInvalidError extends AbstractError {
  constructor(metadata: unknown) {
    super(metadata, "Erro ao realizar o cadastro");
  }
}
