import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // We are returning the user object without the password
    const { password, ...user } = await this.userService.create(createUserDto);
    return user;
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
}
