import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisCacheModule } from "./adapters/cache/redis/redis-cache.module";

const adapters = [ConfigModule, RedisCacheModule];

@Global()
@Module({
  imports: [...adapters],
  controllers: [],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
