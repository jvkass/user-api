import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserOrmEntity } from "@modules/user/domain/entities/user.orm-entity";
import { v4 as UUID } from "uuid";

@Entity("user_password")
export class UserPasswordOrmEntity {
  constructor(password: string, isActive: boolean) {
    this.id = UUID();
    this.createdDate = new Date();
    this.isActive = true;
    this.updatedDate = null;
    this.deletedDate = null;
    this.password = password;
    this.isActive = isActive;
  }

  @Column()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", nullable: false, name: "user_id" })
  @ManyToOne(() => UserOrmEntity, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: UserOrmEntity;

  @Column({ nullable: false, type: "varchar", length: 255 })
  password: string;

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
