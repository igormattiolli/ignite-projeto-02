/* eslint-disable import/no-extraneous-dependencies */
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUserRepository } from "../IUsersRepository";

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];
  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { driver_license, email, name, password });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
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

export { UserRepositoryInMemory };
