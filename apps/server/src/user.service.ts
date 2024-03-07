import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser({ name, gender }: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        name,
        gender,
      },
    });
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async deleteUsers() {
    return this.prisma.user.deleteMany();
  }
}
