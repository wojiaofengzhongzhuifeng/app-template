// src/entities/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import {Tag} from "../../tag/entities/tag.entity";
import {BaseEntity} from "../../common/base-module/base.entity";

@Entity()
export class Category extends BaseEntity{

  // @PrimaryGeneratedColumn()
  // id: number;

  @Column()
  name: string;

  @Column()
  description: string;


  @OneToMany(()=>Tag, (tag)=>tag.category)
  tags: Tag[]
}
