import { Module } from '@nestjs/common'; // Импортируем модуль NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Импортируем модуль TypeORM
import { BooksService } from './books.service'; // Импортируем сервис для работы с книгами
import { BooksController } from './books.controller'; // Импортируем контроллер для обработки запросов к книгам
import { Book } from './book.entity'; // Импортируем сущность Book
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Импортируем гвард для проверки JWT-токена
import { RolesGuard } from '../auth/roles.guard'; // Импортируем гвард для проверки роли пользователя
import { Reflector } from '@nestjs/core'; // Импортируем Reflector для работы с ролями пользователей
import { JwtService } from '@nestjs/jwt'; // Импортируем сервис для работы с JWT-токенами

@Module({
  imports: [TypeOrmModule.forFeature([Book])], // Импортируем модель Book для работы с базой данных
  providers: [BooksService, JwtAuthGuard, RolesGuard, Reflector, JwtService], // Указываем провайдеры (сервисы) модуля
  controllers: [BooksController], // Указываем контроллеры модуля
})
export class BooksModule {} // Экспортируем модуль для работы с книгами