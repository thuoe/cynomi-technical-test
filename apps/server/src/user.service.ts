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
    const sleepPatternInput = {
      ...sleepPattern,
      date: new Date(sleepPattern.date),
    };
    return this.prisma.user.upsert({
      where: {
        name: user.name,
      },
      update: {
        sleepPatterns: {
          create: sleepPatternInput,
        },
      },
      create: {
        ...user,
        sleepPatterns: {
          create: sleepPatternInput,
        },
      },
      include: {
        sleepPatterns: true,
      },
    });
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { sleepPatterns: true },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
      include: { sleepPatterns: true },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({ include: { sleepPatterns: true } });
  }

  async deleteUsers() {
    return this.prisma.user.deleteMany();
  }
}
