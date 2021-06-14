import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return openByUser;
  }
  async create({
    car_id,
    expect_return_date,
    user_id,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expect_return_date,
      user_id,
      end_date,
      id,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(rental_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ id: rental_id });
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    // const rentalQuery = this.repository
    //   .createQueryBuilder() // serve para montar uma chamada
    //   .where("user_id = :user_id", { user_id });
    // const rentals = await rentalQuery.getMany();

    const rentals = await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });
    return rentals;
  }
}

export { RentalsRepository };
