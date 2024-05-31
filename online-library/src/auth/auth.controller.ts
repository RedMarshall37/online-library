import { Controller, Request, Post, UseGuards } from '@nestjs/common'; // Импортируем декораторы и классы из NestJS
import { AuthService } from './auth.service'; // Импортируем сервис аутентификации
import { RolesGuard } from './roles.guard'; // Импортируем Guard ролей
import { Admin } from './isadmin.decorator'; // Импортируем декоратор для доступа администратора
import { SkipAuth } from './skip-auth.decorator'; // Импортируем декоратор для пропуска аутентификации

@Controller('auth') // Указываем контроллеру базовый путь
export class AuthController {
  constructor(private authService: AuthService) {} // Внедряем сервис аутентификации

  @Post('login')
  @SkipAuth() // Пропускаем аутентификацию для этого метода
  async login(@Request() req) {
    return this.authService.login(req.body); // Вызываем метод логина из сервиса аутентификации
  }

  @Post('register')
  @SkipAuth() // Пропускаем аутентификацию для этого метода
  async register(@Request() req) {
    return this.authService.register(req.body); // Вызываем метод регистрации из сервиса аутентификации
  }

  @Admin() // Применяем Guard для доступа только администраторам
  @Post('make-admin')
  async makeAdmin(@Request() req) {
    return this.authService.makeAdmin(req.body.username); // Вызываем метод для назначения администратора из сервиса аутентификации
  }

  @Admin() // Применяем Guard для доступа только администраторам
  @Post('remove-admin')
  async removeAdmin(@Request() req) {
    return this.authService.removeAdmin(req.body.username); // Вызываем метод для удаления администратора из сервиса аутентификации
  }
}