import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
// Casos de usos (caso de uso criar)
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specficationsRepository: ISpecificationsRepository
  ) {}
  // será inserido a interface implementada a sua escolha
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlredyExists =
      await this.specficationsRepository.findByName(name);

    if (specificationAlredyExists) {
      throw new Error("Specification already exists!");
    }

    await this.specficationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
