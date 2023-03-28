import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ValidateJwtGuardModule } from "./adapters/auth/jwt-auth-guard/validate-jwt-guard.module";
import { ValidateJwtGuardService } from "./adapters/auth/jwt-auth-guard/validate-jwt-guard.service";
import { RedisCacheModule } from "./adapters/cache/redis/redis-cache.module";
import { CryptoService } from "./providers/crypto.provider";

const adapters = [ConfigModule, RedisCacheModule, ValidateJwtGuardModule];

@Global()
@Module({
  imports: [...adapters],
  controllers: [],
  providers: [CryptoService, ValidateJwtGuardService],
  exports: [CryptoService, ValidateJwtGuardService],
})
export class InfrastructureModule {}
