import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwt')) // ✅ Protect this route with JWT guard
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // ✅ this comes from the decoded JWT
  }
}
