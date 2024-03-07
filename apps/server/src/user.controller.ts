import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('greeting')
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('/user/:id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(Number(id));
  }

  @Post('/user')
  createUser(
    @Body()
    data: {
      name: string;
      gender: 'male' | 'female' | 'other';
      sleepPattern: { duration: number; date?: string };
    },
  ): Promise<User> {
    return this.userService.createUser({ ...data });
  }

  @Delete('/user/:id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(Number(id));
  }

  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Delete('/users')
  deleteUsers(): Promise<{ count }> {
    return this.userService.deleteUsers();
  }
}
