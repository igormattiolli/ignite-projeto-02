import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async findAvailable(
    category_id: string,
    brand: string,
    name: string
  ): Promise<Car[]> {
    const carsAvailable = this.cars.filter(
      (car) =>
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
    );
    return carsAvailable;
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car_id === car.id);
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    const index = this.cars.findIndex((car) => car.id === car_id);
    this.cars[index].available = available;
  }
}

export { CarsRepositoryInMemory };
