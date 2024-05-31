import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // Импортируем модуль TypeORM для работы с базой данных
import { ConfigModule } from '@nestjs/config'; // Импортируем модуль ConfigModule для работы с конфигурацией
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ // Инициализация глобальной конфигурации
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ // Настройка подключения к базе данных через TypeORM
      type: 'postgres', // Тип базы данных (PostgreSQL)
      host: process.env.DB_HOST || 'localhost', // Хост базы данных
      port: parseInt(process.env.DB_PORT, 10) || 5432, // Порт базы данных
      username: process.env.DB_USERNAME || 'postgres', // Имя пользователя базы данных
      password: process.env.DB_PASSWORD || 'postgres', // Пароль пользователя базы данных
      database: process.env.DB_NAME || 'online_library', // Имя базы данных
      autoLoadEntities: true, // Автоматическая загрузка сущностей (моделей) из указанных директорий
      synchronize: true, // Автоматическое создание таблиц в базе данных при запуске приложения
    }),
    UsersModule,
    BooksModule,
    AuthModule,
  ],
  controllers: [AppController], // Указываем контроллеры приложения
  providers: [AppService], // Указываем сервисы приложения
})
export class AppModule {} // Экспортируем модуль приложения