import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './Prisma/prisma.service';
import { PrismaPromise, Todos } from '@prisma/client';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('addTodo')
  async addTodo( @Body() todo: { title: string } ): Promise<string> {
    try {
      const newTodo = await this.prisma.todos.create({
        data: {
          title: todo.title,
        }
      });

      return JSON.stringify( newTodo );
    } catch ( error ) {
      return JSON.stringify( error );
    }
  }

  @Get('getTodos')
  getPrueba(): PrismaPromise<Todos[]> {
    return this.prisma.todos.findMany();
  }
}
