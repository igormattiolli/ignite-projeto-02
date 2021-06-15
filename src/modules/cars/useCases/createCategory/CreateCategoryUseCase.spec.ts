import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create a Category", () => {
  beforeEach(() => {
    createCategoryRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      createCategoryRepositoryInMemory
    );
  });
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category teste",
      description: "Category description teste",
    };

    await createCategoryUseCase.execute({
      description: category.description,
      name: category.name,
    });

    const categoryCreated = await createCategoryRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name already exists", async () => {
    // expect(async () => {
    //   const category = {
    //     name: "Category teste",
    //     description: "Category description teste",
    //   };

    //   await createCategoryUseCase.execute({
    //     description: category.description,
    //     name: category.name,
    //   });

    //   await createCategoryUseCase.execute({
    //     description: category.description,
    //     name: category.name,
    //   });
    // }).rejects.toBeInstanceOf(AppError);
    const category = {
      name: "Category teste",
      description: "Category description teste",
    };

    await createCategoryUseCase.execute({
      description: category.description,
      name: category.name,
    });
    await expect(
      createCategoryUseCase.execute({
        description: category.description,
        name: category.name,
      })
    ).rejects.toEqual(new AppError("Category already exist"));
  });
});
