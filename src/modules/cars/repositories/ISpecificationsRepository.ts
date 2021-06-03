import { Specification } from "../entities/Specification";

interface ISpecificationDTO {
  name: string;
  description: string;
}
// Interface da regra de negocios
interface ISpecificationsRepository {
  create({ description, name }: ISpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationDTO, ISpecificationsRepository };
