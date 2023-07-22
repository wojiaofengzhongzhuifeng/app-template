// src/entities/tag.entity.ts
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import {Category} from "../../category/entities/category.entity";
import {Content} from "../../content/entities/content.entity";
import {BaseEntity} from "../../common/base-module/base.entity";

@Entity()
export class Tag extends BaseEntity{



  // @PrimaryGeneratedColumn()
  // id: number;

  @Column()
  name: string;

  @Column()
  description: string;



  @ManyToOne(()=>Category, (category)=>category.tags)
  category: Category

  @OneToMany(()=>Content, (content)=>content.tag)
  contents: Content[]
}
