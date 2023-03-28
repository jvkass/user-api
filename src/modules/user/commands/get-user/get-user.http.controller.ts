import {
  Controller,
  HttpStatus,
  HttpCode,
  Get,
  UseGuards,
  BadRequestException,
  Inject,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ValidateJwtGuardService } from "@src/infrastructure/adapters/auth/jwt-auth-guard/validate-jwt-guard.service";
import { routesV1 } from "@src/infrastructure/configs/app.routes";
import { IUserInterceptor, User } from "@src/libs/decorators/user.decorator";
import { match, Result } from "oxide.ts/dist";
import { AbstractError } from "@src/libs/exceptions/abstract.error";
import { UserNotExistError } from "../../domain/errors/user-not-exist.errors";
import { GetUserCommand } from "./get-user.command";
import { GetUserResponse } from "./get-user.response.dto";
import { GetUserService } from "./get-user.service";

@Controller(routesV1.version)
export class GetUserHttpController {
  constructor(private readonly service: GetUserService) {}

  @Get(`${routesV1.user.me}`)
  @HttpCode(HttpStatus.OK)
  @UseGuards(ValidateJwtGuardService)
  @ApiOperation({ summary: "Get informations of account user", tags: ["user"] })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async me(@User() user: IUserInterceptor): Promise<GetUserResponse> {
    const { userId } = user;

    const result: Result<GetUserResponse, AbstractError> =
      await this.service.handle(
        new GetUserCommand({
          userId,
        }),
      );

    return match(result, {
      Ok: (response: GetUserResponse) => response,
      Err: (error: AbstractError) => {
        if (error instanceof UserNotExistError) {
          throw new BadRequestException(error.code);
        }

        throw error;
      },
    });
  }
}
