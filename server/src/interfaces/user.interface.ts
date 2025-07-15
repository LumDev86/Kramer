import { User } from "@/entities/User";
import { Roles } from "@enums/Roles";

export interface IUser{
    id: string;
    name?: string;
    email: string;
    password: string;
    status: boolean;
    role: Roles;
    resetToken?: string;
    resetTokenExpires?: number;
    createdAt: Date;
    updatedAt?: Date;
    updatedBy?: string;
}

export interface UserLoginFields {
    email: string;
    password: string;
}


export function mapUserEntityToIUser(userEntity: User): IUser {
  return {
    id: userEntity.id,
    name: userEntity.name,
    email: userEntity.email,
    password: userEntity.password,
    status: userEntity.status,
    role: userEntity.role,
    resetToken: userEntity.resetToken,
    resetTokenExpires: userEntity.resetTokenExpires,
    createdAt: userEntity.createdAt,
    updatedAt: userEntity.updatedAt,
  };
}