import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GENDER } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(data: {
    name: string;
    gender: GENDER;
    sleepPattern: {
      duration: number;
      date?: string;
    };
  }) {
    const { sleepPattern, ...user } = data;
    return this.prisma.user.create({
      data: {
        ...user,
        sleepPatterns: {
          create: {
            ...sleepPattern,
            date: new Date(sleepPattern.date),
          },
        },
      },
      include: {
        sleepPatterns: true,
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
