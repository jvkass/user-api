import { Inject, Injectable } from "@nestjs/common";
import { Err, Ok, Result } from "oxide.ts/dist";
import { ICacheMemory } from "@src/infrastructure/interface-adapters/interfaces/cache/cache-memory.interface";
import { AbstractError } from "@src/libs/exceptions/abstract.error";
import { DomainError } from "@src/libs/ddd/domain/enums/domain-error.enum";
import { GetUserResponse } from "./get-user.response.dto";
import { GetUserCommand } from "./get-user.command";
import { UserRepository } from "../../domain/database/user.repository";
import { UserNotExistError } from "../../domain/errors/user-not-exist.errors";

@Injectable()
export class GetUserService {
  constructor(
    @Inject("ICacheMemory") private readonly cacheMemory: ICacheMemory,
    private readonly userRepository: UserRepository,
  ) {}

  async handle(
    command: GetUserCommand,
  ): Promise<Result<GetUserResponse, AbstractError>> {
    const { userId } = command;

    const cacheKey = `ME/${userId}`;

    const hasUserInCache: any = await this.cacheMemory.get(cacheKey);

    if (hasUserInCache) {
      return Ok(hasUserInCache);
    }

    const user = await this.userRepository.findOneUserByUserId(userId);

    if (!user) {
      return Err(new UserNotExistError("", DomainError.APIE003));
    }

    const result = {
      email: user.email,
      name: user.name,
    };

    this.cacheMemory.set(cacheKey, result, 8600);

    return Ok(result);
  }
}
