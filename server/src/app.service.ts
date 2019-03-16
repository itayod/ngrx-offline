import { Injectable } from '@nestjs/common';
import {movies, IMovie} from './movies';

@Injectable()
export class AppService {
  private movies: IMovie[];

  constructor() {
    this.movies = movies;
  }

  getMovies() {
    return this.movies;
  }

  addMovie(movie: IMovie) {
    const id = Math.max(...this.movies.map(m => m.id));
    this.movies.push({id, ...movie});

    return id;
  }

}
