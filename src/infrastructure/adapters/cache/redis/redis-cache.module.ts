import { Module, CacheModule, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-store";
import { RedisCacheService } from "./redis-cache.service";

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: configService.getOrThrow<string>("REDIS_HOST"),
      }),
    }),
  ],
  providers: [
    {
      provide: "ICacheMemory",
      useClass: RedisCacheService,
    },
  ],
  exports: [
    {
      provide: "ICacheMemory",
      useClass: RedisCacheService,
    },
  ],
})
export class RedisCacheModule {}
