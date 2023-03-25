import { Inject, Injectable } from "@nestjs/common";
import { CreateUserCommand } from "@modules/user/commands/create-user/create-user.command";
import { AbstractError } from "@src/libs/exceptions/abstract.error";
import { Result, Err, Ok } from "oxide.ts/dist";
import { CryptoService } from "@src/infrastructure/providers/crypto.provider";
import { UserMailOrmEntity } from "../../domain/entities/user-mail.orm-entity";
import { UserPasswordOrmEntity } from "../../domain/entities/user-password.orm-entity";
import { UserOrmEntity } from "../../domain/entities/user.orm-entity";
import { UserRepository } from "../../domain/database/user.repository";
import { UserInvalidError } from "../../domain/errors/user-invalid.errors";
import { EmailExistError } from "../../domain/errors/email-exist.errors";

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async handle(
    command: CreateUserCommand,
  ): Promise<Result<any, AbstractError>> {
    const { email, name, password } = command;

    try {
      const existUser = await this.userRepository.findOneUserByMail(email);

      if (existUser) {
        return Err(new EmailExistError(""));
      }

      const passwordCrypto = await this.cryptoService.encryptWithBcrypt(
        password,
      );

      const mailEntity = new UserMailOrmEntity(email, true);
      const passwordEntity = new UserPasswordOrmEntity(passwordCrypto, true);
      const userEntity = new UserOrmEntity(
        name,
        [mailEntity],
        [passwordEntity],
        true,
      );
      await this.userRepository.save(userEntity);

      return Ok(true);
    } catch (error) {
      return Err(new UserInvalidError(""));
    }
  }
}
