import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

//middleware
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  //valida o JWT token recebido antes de permitir o acesso a uma rota
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Token not found');
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET_TOKEN_KEY,
      });

      request['user'] = payload;
    } catch (error: unknown) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  //pegar os headers para ter acesso aos tokens
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type == 'Bearer' ? token : undefined;
  }
}
