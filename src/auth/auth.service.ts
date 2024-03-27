import { ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,

  ) { }

  async signUp(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
  
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          firstName: dto.firstName, // Ensure firstName is included
          lastName: dto.lastName,
        },
      });
      delete user.password; // Make sure password is not returned in the response
  
      return this.signToken(user.id, user.email);
    } catch (error) {
      this.logger.error(`Error occurred during sign-up: ${error.message}`, error.stack);
      
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      throw new InternalServerErrorException('Error occurred during sign-up');
    }
  }
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if (!user) throw new ForbiddenException("Credentials Is Incorrect")

    const pwMatches = await argon.verify(user.password, dto.password)
    if (!pwMatches) throw new ForbiddenException("Credentials Is Incorrect")
    return this.signToken(user.id, user.email)
  }

  signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    }).then((token) => {
      return {
        access_token: token,
      };
    });
  }

}
