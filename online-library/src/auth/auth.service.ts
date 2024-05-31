import { Injectable } from '@nestjs/common'; // Импортируем Injectable из NestJS
import { UsersService } from '../users/users.service'; // Импортируем сервис пользователей
import { JwtService } from '@nestjs/jwt'; // Импортируем сервис JWT
import * as bcrypt from 'bcryptjs'; // Импортируем модуль bcrypt для хеширования паролей
import { CreateUserDto } from 'src/users/dto/create-user.dto'; // Импортируем DTO для создания пользователя
import { InjectRepository } from '@nestjs/typeorm'; // Импортируем декоратор InjectRepository из TypeORM
import { User } from 'src/users/user.entity'; // Импортируем сущность User
import { Repository } from 'typeorm'; // Импортируем класс Repository из TypeORM

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) // Инжектируем репозиторий пользователей
    private usersRepository: Repository<User>,
    private usersService: UsersService, // Сервис пользователей
    private jwtService: JwtService, // Сервис JWT
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username); // Находим пользователя по имени пользователя
    if (user && await bcrypt.compare(pass, user.password)) { // Проверяем пароль пользователя
      const { password, ...result } = user; // Исключаем пароль из данных пользователя
      return result; // Возвращаем данные пользователя без пароля
    }
    return null; // Если пользователь не найден или пароль неверный, возвращаем null
  }

  async login(user: any) {
    const userFromDB = await this.usersService.findOne(user.username); // Находим пользователя в базе данных
    const payload = { username: user.username, isAdmin: userFromDB.isAdmin }; // Создаем payload для JWT
    return {
      access_token: this.jwtService.sign(payload), // Генерируем JWT и возвращаем его
    };
  }

  async register(createUserDto: CreateUserDto) {
    const payload = { username: createUserDto.username, isAdmin: false }; // Создаем payload для JWT
    this.usersService.create(createUserDto); // Создаем пользователя
    return {
      access_token: this.jwtService.sign(payload), // Генерируем JWT и возвращаем его
    };
  }

  async makeAdmin(username: string) {
    return this.usersService.makeAdmin(username); // Делаем пользователя администратором
  }

  async removeAdmin(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } }); // Находим пользователя по имени пользователя
    user.isAdmin = false; // Устанавливаем isAdmin в false
    return this.usersRepository.save(user); // Сохраняем изменения
  }
}
