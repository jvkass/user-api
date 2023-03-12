import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmWriteAndReplicaConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: "postgres",
  entities: [],
  host: configService.getOrThrow<string>("DB_HOST"),
  port: configService.getOrThrow<number>("DB_PORT"),
  username: configService.getOrThrow<string>("DB_USERNAME"),
  database: configService.getOrThrow<string>("DB_NAME"),
  password: configService.getOrThrow<string>("DB_PASSWORD"),
  autoLoadEntities: true,
  connectTimeoutMS: 5000,
  synchronize: false,
  migrationsRun: false,
  logging: ["error", "migration", "schema"],
  replication: {
    master: {
      host: configService.getOrThrow<string>("DB_HOST"),
      port: configService.getOrThrow<number>("DB_PORT"),
      username: configService.getOrThrow<string>("DB_USERNAME"),
      password: configService.getOrThrow<string>("DB_PASSWORD"),
      database: configService.getOrThrow<string>("DB_NAME"),
    },
    slaves: [],
  },
});
