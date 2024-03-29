import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Headers,
  BadRequestException,
  HttpException,
  HttpCode,
  Inject,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { routesV1 } from "@src/infrastructure/configs/app.routes";
import { AbstractError } from "@src/libs/exceptions/abstract.error";
import { match, Result } from "oxide.ts/dist";
import { EmailExistError } from "../../domain/errors/email-exist.errors";
import { UserInvalidError } from "../../domain/errors/user-invalid.errors";
import { CreateUserCommand } from "./create-user.command";
import { CreateUserRequestDTO } from "./create-user.request.dto";
import { CreateUserService } from "./create-user.service";

@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor(private readonly service: CreateUserService) {}

  @Post(`${routesV1.user.createUser}`)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Create User by email, name and password",
    tags: ["user"],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() body: CreateUserRequestDTO): Promise<any> {
    const command = new CreateUserCommand({
      email: body.email,
      name: body.name,
      password: body.password,
    });

    const result: Result<{ passwordEncrypt: string }, AbstractError> =
      await this.service.handle(command);

    return match(result, {
      Ok: (response: any) => response,
      Err: (error: AbstractError) => {
        if (error instanceof EmailExistError) {
          throw new BadRequestException(error.code);
        }

        if (error instanceof UserInvalidError) {
          throw new BadRequestException(error.code);
        }

        throw error;
      },
    });
  }
}
