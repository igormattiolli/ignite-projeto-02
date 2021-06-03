import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
  ICreateCategoryDTO,
  ICategoriesRepository,
} from "../ICategoriesRepository";

// singleton (cria apenas uma instancia global), lugares que precisão de apenas um instancia

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;
  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }
  //   return CategoriesRepository.INSTANCE;
  // }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const categorySelect = await this.repository.findOne({ name });

    return categorySelect;
  }
}

export { CategoriesRepository };
