import React from "react";

export type SingleRating = {
  Source: string;
  Value: string;
};

export type SingleMovieDetail = {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Array<SingleRating>;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Error?: string;
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
  page: number;
  isSubmitted: boolean;
  favouriteList: Array<SingleMovieDetail>;
  loadMovies: (keyword: string, page?: number) => Promise<void>;
  handleChangeSearchKey: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetList: (isResetButton: boolean) => void;
  setNextPage: () => void;
  setPrevPage: () => void;
  handleFavourite: (category: string, content: SingleMovieDetail) => void;
  checkFavourite: (id: string) => boolean;
};
