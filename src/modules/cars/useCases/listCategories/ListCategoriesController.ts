// eslint-disable-next-line import/no-extraneous-dependencies
import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategtoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const all = await listCategoriesUseCase.execute();

    return response.json(all);
  }
}
export { ListCategoriesController };