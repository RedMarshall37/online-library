// auth.service.ts

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userFromDB = await this.usersService.findOne(user.username);
    const payload = { username: user.username, isAdmin: userFromDB.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const payload = { username: createUserDto.username, isAdmin: false };
    this.usersService.create(createUserDto);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async makeAdmin(username: string) {
    return this.usersService.makeAdmin(username);
  }

  async removeAdmin(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    user.isAdmin = false;
    return this.usersRepository.save(user);
  }
}
