import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(
    username: string,
    password: string,
    role: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      role,
    });
    return await this.usersRepository.save(newUser);
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    const accessToken = jwt.sign(payload, 'your_jwt_secret_key', {
      expiresIn: '1h',
    });

    return { accessToken };
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ username });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async createUser(
    email: string,
    password: string,
    role: string,
  ): Promise<User> {
    const newUser = this.userRepository.create({ email, password, role });
    return await this.userRepository.save(newUser);
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    // Save user to database
    return await this.userRepository.save(user);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
