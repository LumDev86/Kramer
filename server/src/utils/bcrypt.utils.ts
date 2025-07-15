import bcrypt from "bcryptjs";
import { IUser } from "@interfaces/user.interface";


export class BcryptUtils {
    
    static createHash(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    static isValidPassword(user: IUser, password: string) {
        return bcrypt.compareSync(password, user.password);
    }

    static async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
