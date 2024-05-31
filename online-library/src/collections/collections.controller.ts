import { Controller, Post, Get, Param, Request, Delete } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { AuthUser } from 'src/auth/users.decorator';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Controller('collections') // Указываем префикс для всех роутов в этом контроллере
export class CollectionsController {
  constructor(private collectionsService: CollectionsService, private userService: UsersService) {}

  @Post('add/:bookId') // Обработчик POST запроса на добавление книги в коллекцию
  async addBookToCollection(@Param('bookId') bookId: number, @AuthUser() user: any,) {
    let userFromDB: Promise<User> = this.userService.findOne(user.username); // Находим пользователя в базе данных
    return this.collectionsService.addBookToCollection((await userFromDB).id, bookId); // Добавляем книгу в коллекцию пользователя
  }

  @Get('user') // Обработчик GET запроса на получение коллекции пользователя
  async getUserCollection(@AuthUser() user: any) {
    let userFromDB: Promise<User> = this.userService.findOne(user.username); // Находим пользователя в базе данных
    return this.collectionsService.getUserCollection((await userFromDB).id); // Получаем коллекцию пользователя
  }

  @Delete('remove/:bookId') // Обработчик DELETE запроса на удаление книги из коллекции
  async removeBookToCollection(@Param('bookId') bookId: number, @AuthUser() user: any,) {
    let userFromDB: Promise<User> = this.userService.findOne(user.username); // Находим пользователя в базе данных
    return this.collectionsService.removeBookFromCollection((await userFromDB).id, bookId); // Удаляем книгу из коллекции пользователя
  }
}