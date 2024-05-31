import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'; // Импортируем необходимые декораторы из NestJS
import { BooksService } from './books.service'; // Импортируем сервис для работы с книгами
import { CreateBookDto } from './dto/create-book.dto'; // Импортируем DTO для создания книги
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Импортируем гвард для проверки JWT-токена
import { RolesGuard } from '../auth/roles.guard'; // Импортируем гвард для проверки роли пользователя
import { Admin } from 'src/auth/isadmin.decorator'; // Импортируем декоратор для проверки роли администратора

@Controller('books') // Указываем префикс для всех роутов в этом контроллере
export class BooksController {
  constructor(private readonly booksService: BooksService) {} // Инжектируем сервис для работы с книгами через конструктор

  @Get() // Обработчик GET запроса на получение всех книг
  async findAll() {
    return this.booksService.findAll(); // Вызываем метод сервиса для получения всех книг
  }

  @Get(':id') // Обработчик GET запроса на получение книги по ID
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id); // Вызываем метод сервиса для получения книги по ID
  }

  @Admin() // Применяем декоратор, который проверяет, является ли пользователь администратором
  @Post() // Обработчик POST запроса на создание новой книги
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto); // Вызываем метод сервиса для создания новой книги
  }

  @Admin() // Применяем декоратор, который проверяет, является ли пользователь администратором
  @Patch(':id') // Обработчик PATCH запроса на обновление информации о книге
  async update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.booksService.update(+id, updateBookDto); // Вызываем метод сервиса для обновления информации о книге по ID
  }

  @Admin() // Применяем декоратор, который проверяет, является ли пользователь администратором
  @Delete(':id') // Обработчик DELETE запроса на удаление книги по ID
  async remove(@Param('id') id: string) {
    return this.booksService.remove(+id); // Вызываем метод сервиса для удаления книги по ID
  }
}