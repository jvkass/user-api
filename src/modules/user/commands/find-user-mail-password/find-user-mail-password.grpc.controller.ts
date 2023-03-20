import { Controller, Inject } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import {
  UserMailPasswordRequest,
  UserResponse,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
} from "@src/libs/protos/proto/user.pb";
import { FindUserMailPasswordCommand } from "@modules/user/commands/find-user-mail-password/find-user-mail-password.command";
import { FindUserMailPasswordService } from "@modules/user/commands/find-user-mail-password/find-user-mail-password.service";

@Controller(USER_PACKAGE_NAME)
export class FindUserMailPasswordGrpcController {
  constructor(private readonly service: FindUserMailPasswordService) {}

  @GrpcMethod(USER_SERVICE_NAME, "FindUserByMailPassword")
  async findByMailPassword(
    data: UserMailPasswordRequest,
  ): Promise<UserResponse> {
    const command = new FindUserMailPasswordCommand(data);
    try {
      return this.service.handle(command);
    } catch (ex: unknown) {
      return { user: undefined, error: String(ex) };
    }
  }
}
