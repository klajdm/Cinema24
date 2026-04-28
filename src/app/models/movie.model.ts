export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: number;
  imdbID: string;
  imdbRating?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Awards?: string;
  Plot?: string;
  Runtime?: string;
  Language?: string;
  Country?: string;
  Ratings?: { Source: string; Value: string }[];
}
