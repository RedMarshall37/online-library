// src/auth/auth.controller.ts
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { Admin } from './isadmin.decorator';
import { SkipAuth } from './skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SkipAuth()
  async login(@Request() req) {
    console.log(req.body);
    return this.authService.login(req.body);
  }

  @Post('register')
  @SkipAuth()
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @Admin()
  @Post('make-admin')
  async makeAdmin(@Request() req) {
    return this.authService.makeAdmin(req.body.username);
  }

  @Admin()
  @Post('remove-admin')
  async removeAdmin(@Request() req) {
    return this.authService.removeAdmin(req.body.username);
  }
}
