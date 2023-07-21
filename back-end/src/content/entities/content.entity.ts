// src/entities/content.entity.ts
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import {Category} from "../../category/entities/category.entity";
import {Tag} from "../../tag/entities/tag.entity";

@Entity()
export class Content {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('text')
  text: string;

  @Column({
    default: 0
  })
  isDel: number

  @ManyToOne(()=>Tag, (tag)=>tag.contents)
  tag: Tag
}
