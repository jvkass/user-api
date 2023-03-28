export class GetUserCommand {
  constructor(props: GetUserCommand) {
    this.userId = props.userId;
  }

  readonly userId: string;
}
