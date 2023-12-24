import { Observable, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResult, Results } from '../store/models/movies';

const API_KEY = environment.apiKey;
const BASE_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  constructor() {}

  getTopRatedMovies = (page: number): Observable<ApiResult> => {
    return this.http
      .get<ApiResult>(
        `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`
      )
      .pipe(delay(10000));
  };

  getMovieDetails = (id: string): Observable<Results> => {
    return this.http.get<Results>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  };
}
