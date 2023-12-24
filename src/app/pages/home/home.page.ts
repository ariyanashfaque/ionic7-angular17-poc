import {
  IonImg,
  IonItem,
  IonList,
  IonLabel,
  IonAlert,
  IonBadge,
  IonHeader,
  IonAvatar,
  IonContent,
  IonSkeletonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from '@ionic/angular/standalone';
import { catchError, finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ApiResult, Results } from 'src/app/store/models/movies';
import { MovieService } from 'src/app/services/movie-service.service';

@Component({
  imports: [
    IonImg,
    IonItem,
    IonList,
    IonLabel,
    IonAlert,
    DatePipe,
    IonBadge,
    IonHeader,
    IonAvatar,
    IonContent,
    RouterModule,
    IonSkeletonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  error: string = ``;
  currentPage: number = 1;
  isLoading: boolean = false;
  moviesResults: Results[] = [];
  skeletonTexts: any[] = new Array(5);
  imageUrl: string = 'https://image.tmdb.org/t/p/w500';

  private movieService = inject(MovieService);

  constructor() {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies = (event?: InfiniteScrollCustomEvent) => {
    if (!event) {
      this.isLoading = true;
    }

    this.movieService.getTopRatedMovies(this.currentPage).subscribe({
      next: (movies: ApiResult) => {
        this.moviesResults.push(...movies.results);

        if (event) {
          event.target.disabled = this.currentPage === movies.total_pages;
        }
      },
      complete: () => (this.isLoading = false),
      error: (err: HttpErrorResponse) => console.log(err),
    });
  };

  loadMoreMovies = (event: InfiniteScrollCustomEvent) => {
    this.currentPage += 1;
    this.loadMovies(event);
  };
}
