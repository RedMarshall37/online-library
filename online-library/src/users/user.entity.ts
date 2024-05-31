import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'; // Импортируем необходимые декораторы из TypeORM
import { Collection } from '../collections/collection.entity'; // Импортируем сущность Collection

@Entity() // Объявляем класс как сущность базы данных
export class User {
  @PrimaryGeneratedColumn() // Определяем поле как первичный ключ с автоинкрементом
  id: number; // Идентификатор пользователя

  @Column({ unique: true }) // Определяем поле как колонку в базе данных с уникальным значением
  username: string; // Имя пользователя

  @Column() // Определяем поле как колонку в базе данных
  password: string; // Пароль пользователя

  @Column({ unique: true }) // Определяем поле как колонку в базе данных с уникальным значением
  email: string; // Электронная почта пользователя

  @Column({ default: false }) // Определяем поле как колонку в базе данных с значением по умолчанию
  isAdmin: boolean; // Роль администратора

  @CreateDateColumn() // Определяем поле как колонку в базе данных для даты создания записи
  createdAt: Date; // Дата создания пользователя

  @OneToMany(() => Collection, collection => collection.user) // Определяем отношение "один ко многим" с сущностью Collection
  collections: Collection[]; // Коллекции пользователя
}