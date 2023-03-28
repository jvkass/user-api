import { Module, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SESSION_SERVICE_NAME } from "src/libs/protos/proto/session.pb";
import { ValidateJwtGuardService } from "./validate-jwt-guard.service";

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: SESSION_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: configService.getOrThrow<string>(
              "GRPC_AUTH_API_SESSION_PROTO_PACKAGE",
            ),
            url: configService.getOrThrow<string>("GRPC_AUTH_API"),
            protoPath: configService.getOrThrow<string>(
              "GRPC_AUTH_API_SESSION_PROTO_PATH",
            ),
          },
        }),
      },
    ]),
  ],
  providers: [ValidateJwtGuardService],
  exports: [
    ValidateJwtGuardService,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: SESSION_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: configService.getOrThrow<string>(
              "GRPC_AUTH_API_SESSION_PROTO_PACKAGE",
            ),
            url: configService.getOrThrow<string>("GRPC_AUTH_API"),
            protoPath: configService.getOrThrow<string>(
              "GRPC_AUTH_API_SESSION_PROTO_PATH",
            ),
          },
        }),
      },
    ]),
  ],
})
export class ValidateJwtGuardModule {}
