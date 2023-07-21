import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Author} from "../author/entities/author.entity";
import {Repository} from "typeorm";
import {Book} from "./entities/book.entity";
import {RequestException} from "../common/exceptions/request.exception";

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}


  async create(createBookDto: CreateBookDto) {

    const book = new Book();
    book.title = createBookDto.title;
    book.description = createBookDto.description;

    // 使用authorId查找Author实例
    const author = await this.authorRepository.findOne({ where: { id: createBookDto.authorId } });
    console.log('author', author);
    if(!author){
      throw new RequestException(`无法找到authorId ${createBookDto.authorId} 的数据`)
    }
    book.author = author;

    return this.bookRepository.save(book)
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
