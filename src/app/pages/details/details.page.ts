import {
  Input,
  OnInit,
  inject,
  signal,
  Component,
  WritableSignal,
} from '@angular/core';
import {
  IonCard,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonCardTitle,
  IonBackButton,
  IonCardHeader,
  IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Results } from 'src/app/store/models/movies';
import { HttpErrorResponse } from '@angular/common/http';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { MovieService } from 'src/app/services/movie-service.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  imports: [
    IonCard,
    IonTitle,
    DatePipe,
    IonHeader,
    IonContent,
    IonToolbar,
    IonButtons,
    IonCardTitle,
    CurrencyPipe,
    IonCardHeader,
    IonBackButton,
    IonCardContent,
  ],
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private movieService = inject(MovieService);
  imageUrl: string = 'https://image.tmdb.org/t/p/w500';
  movieDetails: WritableSignal<Results | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe({
      next: (movie) => this.movieDetails.set(movie),
      complete: () => console.log('[completed] API call ..'),
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  constructor() {
    addIcons({ cashOutline, calendarOutline });
  }

  ngOnInit() {}
}
