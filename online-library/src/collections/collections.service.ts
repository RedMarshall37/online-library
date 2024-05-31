import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>, // Инжекция репозитория для работы с коллекциями
  ) {}

  async addBookToCollection(userId: number, bookId: number): Promise<Collection> {
    const collection = this.collectionsRepository.create({ userId, bookId }); // Создаем новую запись коллекции
    return this.collectionsRepository.save(collection); // Сохраняем запись в базе данных
  }

  async removeBookFromCollection(userId: number, bookId: number): Promise<void> {
    const result = await this.collectionsRepository.delete({ userId, bookId }); // Удаляем запись из коллекции
    if (result.affected === 0) {
      throw new NotFoundException(`Book with userId, bookId ${{ userId, bookId }} not found`); // Если ничего не удалено, выбрасываем ошибку
    }
  }

  async getUserCollection(userId: number): Promise<Collection[]> {
    return this.collectionsRepository.find({ where: { userId }, relations: ['book'] }); // Получаем коллекцию пользователя с загруженными книгами
  }
}