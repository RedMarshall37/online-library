import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'; // Импортируем необходимые декораторы из TypeORM
import { Collection } from '../collections/collection.entity'; // Импортируем сущность Collection

@Entity() // Объявляем класс как сущность базы данных
export class Book {
  @PrimaryGeneratedColumn() // Определяем поле как первичный ключ с автоинкрементом
  id: number; // Идентификатор книги

  @Column() // Определяем поле как колонку в базе данных
  title: string; // Название книги

  @Column() // Определяем поле как колонку в базе данных
  author: string; // Автор книги

  @Column({ nullable: true }) // Определяем поле как колонку в базе данных с возможным значением null
  description: string; // Описание книги

  @CreateDateColumn() // Определяем поле как колонку в базе данных для даты создания записи
  createdAt: Date; // Дата создания записи о книге

  @OneToMany(() => Collection, collection => collection.book) // Определяем отношение "один ко многим" с сущностью Collection
  collections: Collection[]; // Коллекции, в которых содержится книга
}