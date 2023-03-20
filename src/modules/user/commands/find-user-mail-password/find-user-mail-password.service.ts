import { Inject, Injectable } from "@nestjs/common";
import { FindUserMailPasswordCommand } from "@modules/user/commands/find-user-mail-password/find-user-mail-password.command";
import * as bcrypt from "bcrypt";
import { UserResponse } from "@src/libs/protos/proto/user.pb";
import { DomainError } from "@src/libs/ddd/domain/enums/domain-error.enum";
import { UserRepository } from "../../domain/database/user.repository";

@Injectable()
export class FindUserMailPasswordService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(command: FindUserMailPasswordCommand): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findOneUserPasswordByMail(
        command.email,
      );

      if (!user) {
        return {
          user: undefined,
          error: DomainError.APIE001,
        };
      }

      const { cred, userId, email, name } = user;

      const isValidPassword = await bcrypt.compare(command.password, cred);

      if (!isValidPassword) {
        return {
          user: undefined,
          error: DomainError.APIE002,
        };
      }

      return {
        user: {
          userId,
          email,
          name,
        },
        error: "",
      };
    } catch (ex) {
      return {
        user: undefined,
        error: String(ex),
      };
    }
  }
}
