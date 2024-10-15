import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private user: UserService,
    private auth: AuthService,
  ) {}

  //Cadastro de usuários
  @Post('register') //POST /auth/register
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.user.create(dto);
  }

  //Login de usuários
  @Post('login') //POST /auth/login
  async login(@Body() dto: LoginDto) {
    return await this.auth.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh') //POST /auth/refresh
  async refresh(@Request() req) {
    //Implementar
  }
}
