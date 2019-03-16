import {Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {IMovie} from './movies';

@Controller('movies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies() {
    return this.appService.getMovies();
  }

  @Post('add')
  addMovie(movie: IMovie) {
    return this.appService.addMovie(movie);
  }

}
