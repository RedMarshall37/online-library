import { Controller, Post, Get, Param, Request, Delete } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { AuthUser } from 'src/auth/users.decorator';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService, private userService: UsersService) {}

  @Post('add/:bookId')
  async addBookToCollection(@Param('bookId') bookId: number, @AuthUser() user: any,) {
    let userFromDB: Promise<User> = this.userService.findOne(user.username);
    return this.collectionsService.addBookToCollection((await userFromDB).id, bookId);
  }

  @Get('user')
  async getUserCollection(@AuthUser() user: any) {
    let userFromDB: Promise<User> = this.userService.findOne(user.username);
    console.log((await userFromDB).id);
    return this.collectionsService.getUserCollection((await userFromDB).id);
  }

  @Delete('remove/:bookId')
  async removeBookToCollection(@Param('bookId') bookId: number, @AuthUser() user: any,) {
    let userFromDB: Promise<User> = this.userService.findOne(user.username);
    return this.collectionsService.removeBookFromCollection((await userFromDB).id, bookId);
  }
}