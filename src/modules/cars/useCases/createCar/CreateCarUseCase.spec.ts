import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "car",
      description: "car suv",
      daily_rate: 12,
      license_plate: "111",
      fine_amount: 122,
      brand: "tes",
      category_id: "ds",
    });

    expect(car).toHaveProperty("id");
  });

  it("should be able to create a car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "car",
        description: "car suv",
        daily_rate: 12,
        license_plate: "111",
        fine_amount: 122,
        brand: "tes",
        category_id: "ds",
      });
      await createCarUseCase.execute({
        name: "car2",
        description: "car suv",
        daily_rate: 12,
        license_plate: "111",
        fine_amount: 122,
        brand: "tes",
        category_id: "ds",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "car123",
      description: "car suv",
      daily_rate: 12,
      license_plate: "1211",
      fine_amount: 122,
      brand: "tes",
      category_id: "ds",
    });

    expect(car.available).toBe(true);
  });
});
