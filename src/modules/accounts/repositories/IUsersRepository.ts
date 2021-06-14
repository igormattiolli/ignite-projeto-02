import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  comparePassword(password: string, userPassword: string): Promise<boolean>;
  getToken(user: User): Promise<string>;
}

export { IUserRepository };
