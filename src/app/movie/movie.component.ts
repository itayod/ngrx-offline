import { Component, OnInit, Input } from '@angular/core';
import { IMovies } from '../app.models';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
    @Input() movie: IMovies;
    constructor() { }

    ngOnInit() {

    }

    addToFovorites(movie: IMovies) {
        console.log(movie);
    }

    removeFromFavorites(movie: IMovies) {
        console.log(movie);
    }
}
