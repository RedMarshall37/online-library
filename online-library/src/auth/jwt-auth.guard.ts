import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'; // Импортируем необходимые декораторы и исключения из NestJS
import { AuthGuard } from '@nestjs/passport'; // Импортируем класс AuthGuard из Passport
import { Reflector } from '@nestjs/core'; // Импортируем Reflector для работы с метаданными
import { IS_PUBLIC_KEY } from './skip-auth.decorator'; // Импортируем ключ IS_PUBLIC_KEY из декоратора

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]); // Получаем информацию о доступности маршрута

    if (isPublic) {
      return true; // Если маршрут общедоступный, разрешаем доступ
    }
    return super.canActivate(context); // В противном случае вызываем canActivate из AuthGuard
  }

  handleRequest(err, user, info) {
    // Обработка запроса
    if (err || !user) {
      throw err || new UnauthorizedException(); // Если есть ошибка или пользователь не авторизован, выбрасываем исключение
    }
    return user; // Возвращаем пользователя
  }
}