import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";
import { Roles } from "@/enums/Roles";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "boolean", default: true })
  status: boolean;

  @Column({ type: "enum", enum: Roles, default: Roles.ADMIN })
  role: Roles;

  @Column({ type: "varchar", nullable: true })
  resetToken?: string;

  @Column({ type: "bigint", nullable: true })
  resetTokenExpires?: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "datetime", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;
}
