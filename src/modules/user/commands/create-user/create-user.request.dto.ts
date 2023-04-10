import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MaxLength, MinLength, ValidateIf } from "class-validator";

export class CreateUserRequestDTO {
  @ApiProperty({
    example: "vitor@gmail.com",
    description: "User email address",
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: "Vitor",
    description: "Name complete for user",
  })
  readonly name: string;

  @ApiProperty({
    example: "O8E9Hx1b!e3A",
    description: "Password for user",
  })
  @MinLength(5)
  readonly password: string;
}
