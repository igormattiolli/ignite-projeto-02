import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationDTO {
  name: string;
  description: string;
}
// Interface da regra de negocios
interface ISpecificationsRepository {
  create({ description, name }: ISpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationDTO, ISpecificationsRepository };
