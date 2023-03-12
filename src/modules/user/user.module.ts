import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@src/infrastructure/adapters/database/typeorm/type-orm.module";
import { InfrastructureModule } from "@src/infrastructure/infrastructure.module";

const httpControllers = [""];

const grpcControllers = [""];

const commandHandlers = [""];

const repositories = [""];

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      forFeature: [],
    }),
    InfrastructureModule,
  ],
  controllers: [
    // ...grpcControllers,
    // ...httpControllers,
  ],
  providers: [
    // ...commandHandlers, ...repositories
  ],
})
export class UserModule {}
