// src/collections/collection.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Book } from '../books/book.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.collections)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, book => book.collections)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column()
  userId: number;

  @Column()
  bookId: number;
}
