import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MovieComponent } from './pages/movie/movie.component';
import { Error404Component } from './pages/error404/error404.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { MovieService } from './services/movie.service';
import { WatchlistService } from './services/watchlist.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    Error404Component,
    WatchlistComponent,
  ],
  schemas: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [MovieService, WatchlistService],
  bootstrap: [AppComponent],
})
export class AppModule {}
