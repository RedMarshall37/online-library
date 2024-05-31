import { Injectable, NotFoundException } from '@nestjs/common'; // Импортируем декораторы и исключения из NestJS
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; // Импортируем репозиторий из TypeORM
import { Book } from './book.entity'; // Импортируем сущность Book
import { CreateBookDto } from './dto/create-book.dto'; // Импортируем DTO для создания книги

@Injectable() // Декоратор, обозначающий сервис как инъекцию зависимости
export class BooksService {
  constructor(
    @InjectRepository(Book) // Инжектируем репозиторий Book
    private booksRepository: Repository<Book>, // Приватное свойство для работы с книгами
  ) {}

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find(); // Находим все книги в базе данных
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } }); // Находим книгу по ID
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`); // Если книга не найдена, выбрасываем ошибку
    }
    return book; // Возвращаем найденную книгу
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(createBookDto); // Создаем новую книгу на основе DTO
    return this.booksRepository.save(book); // Сохраняем книгу в базе данных
  }

  async update(id: number, updateBookDto: CreateBookDto): Promise<Book> {
    await this.booksRepository.update(id, updateBookDto); // Обновляем информацию о книге по ID
    const updatedBook = await this.booksRepository.findOne({ where: { id } }); // Находим обновленную книгу
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`); // Если книга не найдена, выбрасываем ошибку
    }
    return updatedBook; // Возвращаем обновленную книгу
  }

  async remove(id: number): Promise<void> {
    const result = await this.booksRepository.delete(id); // Удаляем книгу по ID
    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`); // Если книга не найдена, выбрасываем ошибку
    }
  }
}