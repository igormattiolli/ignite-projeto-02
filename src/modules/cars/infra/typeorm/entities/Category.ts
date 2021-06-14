import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidV4 } from "uuid";

@Entity("categories")
export class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  create_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
