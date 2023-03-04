import { Module, DynamicModule } from "@nestjs/common";
import { TypeOrmModule as OrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { typeOrmWriteAndReplicaConfig } from "./configs/typeorm.config";

type TypeOrmModuleOptions = {
  forFeature: EntityClassOrSchema[];
};

@Module({})
export class TypeOrmModule {
  static forRoot(options: TypeOrmModuleOptions): DynamicModule {
    const moduleWriteAndReplica: DynamicModule = OrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: typeOrmWriteAndReplicaConfig,
      inject: [ConfigService],
    });

    const imports: DynamicModule[] = [moduleWriteAndReplica];
    const exports: DynamicModule[] = [moduleWriteAndReplica];

    if (options.forFeature.length > 0) {
      imports.push(OrmModule.forFeature(options.forFeature));
    }

    return {
      global: true,
      module: TypeOrmModule,
      imports: [...imports],
      providers: [],
      exports: [...exports],
    };
  }
}
