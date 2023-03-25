import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisCacheModule } from "./adapters/cache/redis/redis-cache.module";
import { CryptoService } from "./providers/crypto.provider";

const adapters = [ConfigModule, RedisCacheModule];

@Global()
@Module({
  imports: [...adapters],
  controllers: [],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class InfrastructureModule {}
