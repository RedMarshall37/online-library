import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collection, User]),
    UsersModule],
  providers: [CollectionsService, UsersService],
  controllers: [CollectionsController],
})
export class CollectionsModule { }