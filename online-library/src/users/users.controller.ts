import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users') // Указываем путь префикса для всех роутов в этом контроллере
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Внедряем UsersService через конструктор

  @UseGuards(JwtAuthGuard) // Используем гвард для защиты роутов
  @Get('me') // Обработчик GET запроса на /users/me
  async getCurrentUser(@Request() req) {
    const { username } = req.user; // Получаем имя текущего пользователя из запроса
    return this.usersService.findOne(username); // Вызываем метод сервиса для получения пользователя
  }

  @Get() // Обработчик GET запроса на /users
  async getAllUsers() {
    return this.usersService.findAll(); // Вызываем метод сервиса для получения всех пользователей
  }
}
