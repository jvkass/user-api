import {
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import {
  SessionServiceClient,
  SESSION_SERVICE_NAME,
} from "src/libs/protos/proto/session.pb";

const accessTokenInvalid = "APP-E004";

@Injectable()
export class ValidateJwtGuardService implements OnModuleInit {
  private readonly logger: Logger = new Logger(ValidateJwtGuardService.name);

  private sessionServiceClient: SessionServiceClient;

  constructor(
    @Inject(SESSION_SERVICE_NAME) private readonly clientSession: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.sessionServiceClient =
      this.clientSession.getService<SessionServiceClient>(SESSION_SERVICE_NAME);
  }

  async validateAccessToken(accessToken: string): Promise<any> {
    const validToken = await firstValueFrom(
      this.sessionServiceClient.validateSessionLogin({
        accessToken,
      }),
    );

    if (!validToken.isValid) {
      throw new Error(accessTokenInvalid);
    }

    return validToken;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = request?.headers?.authorization?.replace(
        "Bearer ",
        "",
      );

      if (accessToken === undefined) {
        throw new Error(accessTokenInvalid);
      }

      const validToken = await this.validateAccessToken(accessToken);

      request.user = validToken.sessionLogin;

      return true;
    } catch (ex) {
      this.logger.error(ex);
      if (ex instanceof Error) {
        throw new UnauthorizedException(ex.message);
      }

      throw new InternalServerErrorException();
    }
  }
}
