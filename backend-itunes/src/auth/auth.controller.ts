import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')//<- Look Here
  signUp(@Body() body: { email: string; password: string }) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('signin')//<- Look Here
  signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signin(body.email, body.password);
  }
}
