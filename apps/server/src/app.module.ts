import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { UserController } from './user.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
