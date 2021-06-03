import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuario existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect");
    }
    // Senha correta
    const passwordMatch = await this.usersRepository.comparePassword(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }
    // Gerar token

    const token = await this.usersRepository.getToken(user);

    const tokenResponse: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
    return tokenResponse;
  }
}

export { AuthenticateUserUseCase };
