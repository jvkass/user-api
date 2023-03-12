export class CreateUserCommand {
  constructor(props: CreateUserCommand) {
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
  }

  readonly email: string;

  readonly name: string;

  readonly password: string;
}
