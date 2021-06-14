// eslint-disable-next-line import/no-extraneous-dependencies
import { compare } from "bcrypt";
// eslint-disable-next-line import/no-extraneous-dependencies
import { sign } from "jsonwebtoken";
import { Repository, getRepository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async create({
    name,
    email,
    driver_license,
    password,
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      id,
      avatar,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async comparePassword(
    password: string,
    userPassword: string
  ): Promise<boolean> {
    const passwordMatch = await compare(password, userPassword);

    return passwordMatch;
  }

  async getToken(user: User): Promise<string> {
    const token = sign({}, "f1dc246d3b2001bc6ae3a1ef45ad1003", {
      subject: user.id,
      expiresIn: "1d",
    });
    return token;
  }
}

export { UserRepository };
