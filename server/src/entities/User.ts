import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "@/enums/Roles";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "string", unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ default: true })
  status: boolean;

  @Column({ type: "string", nullable: true })
  resetToken?: string;

  @Column({ type: "number", nullable: true })
  resetTokenExpires?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: "string", nullable: true })
  updatedBy?: string;

  @Column({ type: "enum", enum: Roles, default: Roles.ADMIN })
  role: Roles;
}
