import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({ data: { email, password: hashed } });
    return this.generateToken(user.id);
  }

  async signin(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return this.generateToken(user.id);
  }

  private generateToken(userId: number) {
    const payload = { sub: userId };
    return { accessToken: this.jwtService.sign(payload) };
  }
}


// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { PrismaService } from './prisma.service';

// @Injectable()
// export class AuthService {
//   constructor(
//     private prisma: PrismaService,
//     private jwtService: JwtService,
//   ) {}

//   async signUp(email: string, password: string) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await this.prisma.user.create({
//       data: { email, password: hashedPassword },
//     });
//     return this.generateToken(user.id);
//   }

//   async signIn(email: string, password: string) {
//     const user = await this.prisma.user.findUnique({ where: { email } });
//     if (!user) throw new Error('Invalid credentials');

//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) throw new Error('Invalid credentials');

//     return this.generateToken(user.id);
//   }

//   private generateToken(userId: number) {
//     return {
//       accessToken: this.jwtService.sign({ userId }), //Here it's done slightly differently
//     };
//   }
// }
