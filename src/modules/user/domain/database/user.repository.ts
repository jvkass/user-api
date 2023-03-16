import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IUser } from "@src/interface-adapters/interfaces/user/user.interface";
import { UserOrmEntity } from "../entities/user.orm-entity";
import { UserMailOrmEntity } from "../entities/user-mail.orm-entity";

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

  async findOneUserByMail(mail: string): Promise<IUser> {
    const masterQueryRunner = this.dataSource.createQueryRunner("master");

    try {
      const user = await this.dataSource
        .createQueryBuilder(UserOrmEntity, "user")
        .select("user.id", "userId")
        .addSelect("user.name", "name")
        .addSelect("userMail.mail", "email")
        .innerJoin(
          UserMailOrmEntity,
          "userMail",
          "user.id = userMail.user_id AND userMail.is_active is true",
        )
        .where("user.is_active is true")
        .andWhere("userMail.mail = :mail", { mail })
        .andWhere("userMail.is_active is true")
        .limit(1)
        .setQueryRunner(masterQueryRunner)
        .getRawOne();

      return user;
    } finally {
      await masterQueryRunner.release();
    }
  }
}
