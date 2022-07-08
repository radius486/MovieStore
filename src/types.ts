export interface Movie {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

export enum SortDir {
  ASC = 'asc',
  DESC = 'desc'
}

export interface MovieDetaild {
  adult: boolean;
  backdropPath: string;
  belongsToCollection: Record<string, unknown>;
  budget: number;
  genres: [];
  homepage: string;
  id: number;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: [];
  productionCountries: [];
  releaseDate: string;
  revenue: number;
  runtime: number;
  spokenLanguages: [];
  status: string;
  tagline: string;
  title: string;
  video: false;
  voteAverage: number;
  voteCount: number;
}
