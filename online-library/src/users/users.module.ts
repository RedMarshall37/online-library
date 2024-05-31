import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Импортируем модуль TypeORM
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Импорт и регистрация репозитория для работы с сущностью User
  providers: [UsersService], // Указываем провайдеры (сервисы) модуля
  controllers: [UsersController], // Указываем контроллеры модуля
  exports: [UsersService], // Экспортируем UsersService для возможности его использования в других модулях
})
export class UsersModule {} // Экспортируем модуль пользователей