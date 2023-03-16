import { Inject, Injectable } from "@nestjs/common";
import { CreateUserCommand } from "@modules/user/commands/create-user/create-user.command";
import { AbstractError } from "@src/libs/exceptions/abstract.error";
import { Result, Err, Ok } from "oxide.ts/dist";
import { UserMailOrmEntity } from "../../domain/entities/user-mail.orm-entity";
import { UserPasswordOrmEntity } from "../../domain/entities/user-password.orm-entity";
import { UserOrmEntity } from "../../domain/entities/user.orm-entity";
import { UserRepository } from "../../domain/database/user.repository";
import { UserInvalidError } from "../../domain/errors/user-invalid.errors";

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(
    command: CreateUserCommand,
  ): Promise<Result<any, AbstractError>> {
    const { email, name, password } = command;

    try {
      const mailEntity = new UserMailOrmEntity(email, true);
      const passwordEntity = new UserPasswordOrmEntity(password, true);
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
