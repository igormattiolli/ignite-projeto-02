import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalByUsersUseCase } from "./ListRentalByUsersUseCase";

class ListRentalByUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRentalByUsersUseCase = container.resolve(
      ListRentalByUsersUseCase
    );

    const rentals = await listRentalByUsersUseCase.execute({ user_id: id });

    return response.status(200).json(rentals);
  }
}

export { ListRentalByUsersController };
