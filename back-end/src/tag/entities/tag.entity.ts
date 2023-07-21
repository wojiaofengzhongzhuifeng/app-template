// src/entities/tag.entity.ts
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import {Category} from "../../category/entities/category.entity";
import {Content} from "../../content/entities/content.entity";

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    default: 0
  })
  isDel: number

  @ManyToOne(()=>Category, (category)=>category.tags)
  category: Category

  @OneToMany(()=>Content, (content)=>content.tag)
  contents: Content[]
}
