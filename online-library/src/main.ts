// Импорт необходимых модулей и компонентов NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Функция для инициализации приложения
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Создаем экземпляр приложения
  app.enableCors(); // Включаем CORS для разрешения запросов с других доменов
  await app.listen(3000); // Прослушиваем порт 3000
}
bootstrap(); // Запускаем приложение