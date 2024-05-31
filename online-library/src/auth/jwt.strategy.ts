import { Strategy, ExtractJwt } from 'passport-jwt'; // Импортируем классы для стратегии JWT из Passport
import { PassportStrategy } from '@nestjs/passport'; // Импортируем класс для стратегии паспорта из NestJS
import { Injectable } from '@nestjs/common'; // Импортируем Injectable из NestJS
import { jwtConstants } from './constants'; // Импортируем константы секретного ключа JWT

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекаем JWT из заголовка авторизации
      ignoreExpiration: false, // Не игнорируем срок действия токена
      secretOrKey: jwtConstants.secret, // Устанавливаем секретный ключ
    });
  }

  async validate(payload: any) {
    return { username: payload.username, isAdmin: payload.isAdmin }; // Возвращаем объект с данными пользователя из JWT
  }
}