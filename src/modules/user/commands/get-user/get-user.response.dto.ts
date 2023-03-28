import { ApiProperty } from "@nestjs/swagger";

export class GetUserResponse {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly name: string;
}
