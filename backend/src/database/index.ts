import 'reflect-metadata';
import { Author } from '@app/entities/Author';
import { DataSource } from 'typeorm';
import { Book } from '@app/entities/Book';

const database = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Author, Book],
  synchronize: true,
  logging: false,
});

export default database;
