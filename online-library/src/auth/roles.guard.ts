import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'; // Импортируем необходимые декораторы и классы из NestJS
import { Reflector } from '@nestjs/core'; // Импортируем Reflector для работы с метаданными
import { JwtService } from '@nestjs/jwt'; // Импортируем сервис JWT
import { ISADMIN_KEY } from './isadmin.decorator'; // Импортируем ключ ISADMIN_KEY из декоратора

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdminGuard = this.reflector.getAllAndOverride<string>(ISADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]); // Получаем информацию о наличии декоратора Admin на методе или классе

    if (!isAdminGuard) {
      return true; // Если декоратор Admin не найден, разрешаем доступ
    }

    const req = context.switchToHttp().getRequest(); // Получаем HTTP-запрос
    const authHeader = req.headers.authorization; // Получаем заголовок авторизации
    const token = authHeader.split(' ')[1]; // Получаем токен из заголовка
    const user = this.jwtService.verify(token); // Проверяем и верифицируем токен JWT
    return user.isAdmin; // Проверяем, является ли пользователь администратором
  }
}