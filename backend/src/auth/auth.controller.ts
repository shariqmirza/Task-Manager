import { Body, Controller, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body) {
    return this.authService.register(body.email, body.password);
  }
  @Post('logout')
logout() {
  return { message: 'Logged out' };
}

@Post('login')
async login(@Body() body) {
  return this.authService.login(body.email, body.password);
}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }
}