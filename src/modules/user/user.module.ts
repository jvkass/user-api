import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@src/infrastructure/adapters/database/typeorm/type-orm.module";
import { InfrastructureModule } from "@src/infrastructure/infrastructure.module";
import { CreateUserHttpController } from "./commands/create-user/create-user.http.controller";
import { CreateUserService } from "./commands/create-user/create-user.service";
import { UserRepository } from "./domain/database/user.repository";
import { UserMailOrmEntity } from "./domain/entities/user-mail.orm-entity";
import { UserPasswordOrmEntity } from "./domain/entities/user-password.orm-entity";
import { UserOrmEntity } from "./domain/entities/user.orm-entity";

const httpControllers = [CreateUserHttpController];

const grpcControllers = [""];

const commandHandlers = [CreateUserService];

const repositories = [UserRepository];

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      forFeature: [UserOrmEntity, UserPasswordOrmEntity, UserMailOrmEntity],
    }),
    InfrastructureModule,
  ],
  controllers: [
    // ...grpcControllers,
    ...httpControllers,
  ],
  providers: [...commandHandlers, ...repositories],
})
export class UserModule {}
