// src/entities/book.entity.ts
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {Author} from "../../author/entities/author.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'authorId' }) // 确保字段名与上面定义的 authorId 列名相同
  author: Author;
}
