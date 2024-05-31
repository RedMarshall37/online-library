import { createParamDecorator, SetMetadata } from '@nestjs/common'; // Импортируем декораторы из NestJS

export const IS_PUBLIC_KEY = 'isPublic'; // Ключ для метаданных о доступности маршрута
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true); // Декоратор для пометки маршрута как общедоступного