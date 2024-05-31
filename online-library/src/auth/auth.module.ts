import { Module } from '@nestjs/common'; // Импортируем модуль из NestJS
import { AuthService } from './auth.service'; // Импортируем сервис аутентификации
import { UsersModule } from '../users/users.module'; // Импортируем модуль пользователей
import { PassportModule } from '@nestjs/passport'; // Импортируем модуль Passport для аутентификации
import { JwtModule } from '@nestjs/jwt'; // Импортируем модуль JWT для создания и верификации JWT-токенов
import { AuthController } from './auth.controller'; // Импортируем контроллер аутентификации
import { JwtStrategy } from './jwt.strategy'; // Импортируем стратегию JWT
import { jwtConstants } from './constants'; // Импортируем константы секретного ключа JWT
import { JwtAuthGuard } from './jwt-auth.guard'; // Импортируем Guard JWT
import { APP_GUARD } from '@nestjs/core'; // Импортируем APP_GUARD для добавления Guard
import { RolesGuard } from './roles.guard'; // Импортируем Guard ролей
import { TypeOrmModule } from '@nestjs/typeorm'; // Импортируем модуль TypeORM для работы с базой данных
import { User } from '../users/user.entity'; // Импортируем сущность пользователя
import { Collection } from '../collections/collection.entity'; // Импортируем сущность коллекции
import { CollectionsModule } from '../collections/collections.module'; // Импортируем модуль коллекций
import { UsersGuard } from './users.guard'; // Импортируем Guard пользователей

@Module({
  imports: [
    UsersModule, // Импортируем модуль пользователей
    PassportModule, // Импортируем модуль Passport для аутентификации
    TypeOrmModule.forFeature([User, Collection]), // Импортируем сущности для использования в TypeORM
    JwtModule.register({ // Регистрируем модуль JWT и настраиваем его
      secret: jwtConstants.secret // Устанавливаем секретный ключ для подписи JWT
    }),
    CollectionsModule, // Импортируем модуль коллекций
  ],
  providers: [
    AuthService, // Предоставляем сервис аутентификации
    JwtStrategy, // Предоставляем стратегию JWT
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Используем Guard JWT для всего приложения
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Используем Guard ролей для всего приложения
    },
    {
      provide: APP_GUARD,
      useClass: UsersGuard, // Используем Guard пользователей для всего приложения
    },
  ],
  controllers: [AuthController], // Предоставляем контроллер аутентификации
})
export class AuthModule {} // Экспортируем модуль аутентификации