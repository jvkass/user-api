import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserPasswordOrmEntity } from "@modules/user/domain/entities/user-password.orm-entity";
import { UserMailOrmEntity } from "@modules/user/domain/entities/user-mail.orm-entity";
import { v4 as UUID } from "uuid";

@Entity("user")
export class UserOrmEntity {
  constructor(
    name: string,
    mails: UserMailOrmEntity[],
    passwords: UserPasswordOrmEntity[],
    isActive: boolean,
  ) {
    this.id = UUID();
    this.name = name;
    this.isActive = isActive;
    this.mails = mails;
    this.passwords = passwords;
    this.deletedDate = null;
    this.createdDate = new Date();
    this.updatedDate = null;
  }

  @Column()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  name: string;

  @OneToMany(() => UserMailOrmEntity, (userMail) => userMail.user, {
    cascade: true,
  })
  mails: UserMailOrmEntity[];

  @OneToMany(() => UserPasswordOrmEntity, (userPassword) => userPassword.user, {
    cascade: true,
  })
  passwords: UserPasswordOrmEntity[];

  @Column({ nullable: true, type: "date", name: "last_login" })
  lastLogin: string;

  @Column({ nullable: true, type: "int", name: "is_active" })
  isActive: boolean;

  @CreateDateColumn({
    type: "timestamptz",
    update: false,
    name: "created_date",
  })
  createdDate: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    name: "updated_date",
  })
  updatedDate: Date | null;

  @DeleteDateColumn({
    type: "timestamptz",
    name: "deleted_date",
  })
  deletedDate: Date | null;
}
