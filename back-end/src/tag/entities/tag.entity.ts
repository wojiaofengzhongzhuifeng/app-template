// src/entities/tag.entity.ts
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Book } from '../../book/entities/book.entity';
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


  categoryId: number

  @OneToMany(()=>Content, (content)=>content.tag)
  contents: Content[]
}
