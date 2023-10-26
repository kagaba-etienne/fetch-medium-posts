import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { post } from './app.service';

@Controller('medium/feed')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':handle')
  async getPosts(@Param('handle') handle: string): Promise<post[]> {
    const posts = await this.appService.getPosts(handle);
    return posts;
  }
}
