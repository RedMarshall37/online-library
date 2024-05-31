import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Импортируем InjectRepository для инъекции репозитория
import { Repository } from 'typeorm'; // Импортируем Repository из TypeORM
import { User } from './user.entity'; // Импортируем сущность User
import { CreateUserDto } from './dto/create-user.dto'; // Импортируем DTO для создания пользователя
import * as bcrypt from 'bcryptjs'; // Импортируем bcrypt для хеширования пароля

@Injectable() // Объявляем сервис как инжектируемый провайдер
export class UsersService {
  constructor(
    @InjectRepository(User) // Инжектируем репозиторий User
    private usersRepository: Repository<User>, // Приватное свойство для работы с репозиторием
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    // Проверяем, существует ли пользователь с таким же email
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists'); // Выбрасываем исключение при существующем пользователе
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const user = this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });

    // Сохраняем пользователя в базе данных
    return this.usersRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } }); // Находим пользователя по имени пользователя
  }
  
  findAll() {
    return this.usersRepository.find(); // Находим всех пользователей в базе данных
  }
  async makeAdmin(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } }); // Находим пользователя по имени пользователя
    user.isAdmin = true; // Устанавливаем пользователю роль администратора
    return this.usersRepository.save(user); // Сохраняем изменения в базе данных
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } }); // Находим пользователя по имени пользователя
  }
}
