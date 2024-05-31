import { SetMetadata } from '@nestjs/common'; // Импортируем SetMetadata из NestJS

export const ISADMIN_KEY = 'AdminGuard'; // Ключ для метаданных о доступе администратора
export const Admin = () => SetMetadata(ISADMIN_KEY, true); // Декоратор для пометки маршрута как доступного только для администратора