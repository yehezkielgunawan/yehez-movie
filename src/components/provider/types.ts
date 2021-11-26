import React from "react";

export type SingleRating = {
  Source: string;
  Value: string;
};

export type SingleMovieDetail = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<SingleRating>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type SingleMovie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type MovieListType = {
  Search?: Array<SingleMovie>;
  totalResults?: number;
  Response: string;
  Error?: string;
};

export type ErrMessage = {
  Response: string;
  Error: string;
};

export type MovieContextType = {
  searchKeyword: string;
  movieList: MovieListType;
  movieDetail: SingleMovieDetail;
  page: number;
  isSubmitted: boolean;
  loadMovies: (keyword: string, page?: number) => Promise<void>;
  loadMovieDetails: (id: string) => Promise<void>;
  handleChangeSearchKey: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset: (isResetButton: boolean) => void;
  setNextPage: () => void;
  setPrevPage: () => void;
};
