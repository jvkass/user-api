export class FindUserMailPasswordCommand {
  constructor(props: FindUserMailPasswordCommand) {
    this.email = props.email;
    this.password = props.password;
  }

  readonly email: string;

  readonly password: string;
}
