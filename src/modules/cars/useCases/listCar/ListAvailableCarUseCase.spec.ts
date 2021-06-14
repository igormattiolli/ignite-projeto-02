import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarUseCase } from "./ListAvailableCarUseCase";

let listAvailableCarUseCase: ListAvailableCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarUseCase = new ListAvailableCarUseCase(
      carsRepositoryInMemory
    );
  });
  it("should be able to list all avaiables cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car2",
      description: "car",
      daily_rate: 12,
      license_plate: "11112311",
      fine_amount: 122,
      brand: "tes",
      category_id: "2e7c112d-8310-49f5-a1de-caedbb913e25",
    });
    const cars = await listAvailableCarUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car",
      description: "car",
      daily_rate: 12,
      license_plate: "11112311",
      fine_amount: 122,
      brand: "tesq",
      category_id: "2e7c112d-8310-49f5-a1de-caedbb913e25",
    });
    const cars = await listAvailableCarUseCase.execute({ brand: "tesq" });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "car1",
      daily_rate: 12,
      license_plate: "111122311",
      fine_amount: 122,
      brand: "tesq",
      category_id: "2e7c112d-8310-49f5-a1de-caedbb913e25",
    });
    const cars = await listAvailableCarUseCase.execute({ name: "car1" });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car11",
      description: "car11",
      daily_rate: 12,
      license_plate: "1111122311",
      fine_amount: 122,
      brand: "tesq",
      category_id: "123",
    });
    const cars = await listAvailableCarUseCase.execute({ category_id: "123" });
    expect(cars).toEqual([car]);
  });
});
