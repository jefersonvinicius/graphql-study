import database from '@app/database';
import { Author } from '@app/entities/Author';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

export class AuthorsController {
  private authorRepository: Repository<Author>;

  constructor() {
    this.authorRepository = database.getRepository(Author);
  }

  store = async (request: Request, response: Response) => {
    const { name, bio, birthDate } = request.body;

    const author = await this.authorRepository.save({
      name,
      birthDate,
      bio,
    });

    return response.json(author);
  };
}
