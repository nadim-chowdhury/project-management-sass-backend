// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../users/user.service';
// import { User } from '../users/user.entity';
// import * as bcrypt from 'bcryptjs';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async validateUser(email: string, password: string): Promise<any> {
//     const user = await this.userService.findByEmail(email);
//     if (user && bcrypt.compareSync(password, user.password)) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: User) {
//     const payload = { email: user.email, sub: user.id, role: user.role };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async validatePassword(user: UserEntity, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
