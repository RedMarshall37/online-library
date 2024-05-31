import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'; // Импортируем необходимые декораторы из TypeORM
import { User } from '../users/user.entity'; // Импортируем сущность User
import { Book } from '../books/book.entity'; // Импортируем сущность Book

@Entity() // Объявляем класс как сущность базы данных
export class Collection {
  @PrimaryGeneratedColumn() // Определяем поле как первичный ключ с автоинкрементом
  id: number; // Идентификатор коллекции

  @ManyToOne(() => User, user => user.collections) // Определяем отношение "многие к одному" с сущностью User
  @JoinColumn({ name: 'userId' }) // Указываем имя колонки для внешнего ключа
  user: User; // Пользователь коллекции

  @ManyToOne(() => Book, book => book.collections) // Определяем отношение "многие к одному" с сущностью Book
  @JoinColumn({ name: 'bookId' }) // Указываем имя колонки для внешнего ключа
  book: Book; // Книга в коллекции

  @Column() // Определяем поле как колонку в базе данных
  userId: number; // Идентификатор пользователя

  @Column() // Определяем поле как колонку в базе данных
  bookId: number; // Идентификатор книги
}