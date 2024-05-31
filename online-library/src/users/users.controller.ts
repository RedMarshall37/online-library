import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req) {
    const { username } = req.user; // Получаем имя текущего пользователя из запроса
    return this.usersService.findOne(username);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }
}
