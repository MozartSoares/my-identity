import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async login(authDto: LoginDto) {
    const user = await this.validateUser(authDto);
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };
    const response = {
      user,
      tokens: {
        access: await this.jwt.signAsync(payload, {
          expiresIn: '1d',
          secret: process.env.JWT_SECRET_TOKEN_KEY,
        }),
        refresh: await this.jwt.signAsync(payload, {
          expiresIn: '1d',
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
      },
    };
    return response;
  }

  async validateUser(authDto: LoginDto) {
    const user = await this.userService.findByEmail(authDto.username);

    if (user && (await compare(authDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
