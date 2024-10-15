import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto) {
    //Valida se já existe o usuário com esse email
    const user = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });
    if (user) throw new ConflictException('User already exists');

    //Cria o usuário, aplicando hash pra criptografar a senha
    const newUser = await this.prisma.user.create({
      data: {
        ...userDto,
        password: await hash(userDto.password, 10),
      },
    });

    //Retorna o usuário sem a senha
    const { password, ...result } = newUser;

    return result;
  }
}
