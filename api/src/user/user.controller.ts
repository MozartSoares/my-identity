import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private user: UserService) {}

  @Get()
  async getUsers() {
    return await this.user.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user = await this.user.findByid(id);
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
    try {
      const userId = await this.user.update(id, userDto);
      return userId;
    } catch (e) {
      throw new Error(e);
    }
  }
}
