import database from '@app/database';
import { Author } from '@app/entities/Author';
import { Book } from '@app/entities/Book';

describe('Author', () => {
  beforeAll(async () => {
    await database.initialize();
  });

  it('should be created', async () => {
    const author = new Author();
    author.name = 'Jeferson';
    author.bio = 'Lorem';
    author.birthDate = new Date('2001-11-23T08:00:00.000Z');

    const saved = await database.manager.save(author);

    expect(saved.id).toStrictEqual(expect.any(Number));
    expect(saved.createdAt).toStrictEqual(expect.any(Date));
    expect(saved.updatedAt).toStrictEqual(saved.createdAt);
  });

  it('should create relationships', async () => {
    const authorRepository = database.getRepository(Author);
    const bookRepository = database.getRepository(Book);
    const saved = await authorRepository.save({
      name: 'jeferson',
      bio: 'Lorem',
      birthDate: new Date('2020-10-20T10:10:00.000Z'),
    });
    const book = await bookRepository.save({
      name: 'any',
      releasedAt: new Date('2001-11-23T10:20:00.000Z'),
    });
    saved.books = [book];
    const saved2 = await authorRepository.save(saved);

    const author = await authorRepository.findOne({ where: { id: saved.id }, relations: { books: true } });

    expect(author).toMatchObject({
      id: saved.id,
      name: 'jeferson',
      bio: 'Lorem',
      birthDate: new Date('2020-10-20T10:10:00.000Z'),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      books: [
        {
          id: saved2.books[0].id,
          name: 'any',
          releasedAt: new Date('2001-11-23T10:20:00.000Z'),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ],
    });
  });
});
