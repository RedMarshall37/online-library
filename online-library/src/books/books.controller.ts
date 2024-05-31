import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Admin } from 'src/auth/isadmin.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Admin()
  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Admin()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Admin()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
