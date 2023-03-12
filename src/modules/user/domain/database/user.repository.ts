import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserOrmEntity } from "../entities/user.orm-entity";

@Injectable()
export class UserRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async save(userEntity: UserOrmEntity): Promise<void> {
    await this.userRepository.save(userEntity);
  }

  async update(id: string, data: any): Promise<void> {
    await this.userRepository.update(id, data);
  }

  createEntityByUserId(userId: string): UserOrmEntity {
    return this.userRepository.create({
      id: userId,
    });
  }
}
