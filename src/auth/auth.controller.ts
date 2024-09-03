// import { Controller, Post, Body } from '@nestjs/common';
// import { UserService } from '../users/user.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly userService: UserService) {}

//   @Post('register')
//   async register(
//     @Body() body: { username: string; password: string; role: string },
//   ) {
//     const { username, password, role } = body;
//     return await this.userService.register(username, password, role);
//   }

//   @Post('login')
//   async login(@Body() body: { username: string; password: string }) {
//     const { username, password } = body;
//     return await this.userService.login(username, password);
//   }
// }

import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // return this.authService.login(req.user);
  }
}
