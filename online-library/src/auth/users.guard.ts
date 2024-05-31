import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'; // Импортируем необходимые декораторы и исключения из NestJS
import { Reflector } from '@nestjs/core'; // Импортируем Reflector для работы с метаданными
import { JwtService } from '@nestjs/jwt'; // Импортируем сервис JWT
import { UsersService } from 'src/users/users.service'; // Импортируем сервис пользователей
import { USER_KEY } from './users.decorator'; // Импортируем ключ USER_KEY из декоратора

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const UserGuard = this.reflector.getAllAndOverride<string>(USER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]); // Получаем информацию о наличии декоратора Users на методе или классе

    if (!UserGuard) {
      return true; // Если декоратор Users не найден, разрешаем доступ
    }

    const request = context.switchToHttp().getRequest(); // Получаем HTTP-запрос
    const userId = request.params.id; // Получаем ID пользователя из запроса
    const authHeader = request.headers.authorization; // Получаем заголовок авторизации
    const token = authHeader.split(' ')[1]; // Получаем токен из заголовка
    if (!token) {
      throw new UnauthorizedException(); // Если токен не предоставлен, выбрасываем исключение о неавторизованном доступе
    }

    const user = this.jwtService.verify(token); // Проверяем и верифицируем токен JWT
    request.user = user; // Добавляем пользователя в объект запроса
    return user.id == userId; // Проверяем, соответствует ли ID пользователя, указанный в токене, ID пользователя в запросе
  }
}
