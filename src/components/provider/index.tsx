import { createContext, ReactNode, useContext, useState } from "react";

import { getMovieDetailsRes, getMoviesRes } from "functions/services/fetcher";

import { MovieContextType, MovieListType, SingleMovieDetail } from "./types";

const INITIAL_MOVIE_LIST: MovieListType = {
  Search: [],
  totalResults: 0,
  Response: "True",
};

const INITIAL_DETAIL_MOVIE: SingleMovieDetail = {
  Title: "",
  Year: "",
  Rated: "",
  Released: "",
  Runtime: "",
  Genre: "",
  Director: "",
  Writer: "",
  Actors: "",
  Plot: "",
  Language: "",
  Country: "",
  Awards: "",
  Poster: "",
  Ratings: [],
  Metascore: "",
  imdbRating: "",
  imdbVotes: "",
  imdbID: "",
  Type: "",
  DVD: "",
  BoxOffice: "",
  Production: "",
  Website: "",
  Response: "",
};

export const MovieContext = createContext<MovieContextType>({
  movieList: INITIAL_MOVIE_LIST,
  movieDetail: INITIAL_DETAIL_MOVIE,
  loadMovies: async () => {
    return;
  },
  loadMovieDetails: async () => {
    return;
  },
});

export const useMovieContext = () => {
  return useContext(MovieContext);
};

type MovieProviderProps = {
  children: ReactNode;
};

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movieList, setMovieList] = useState<MovieListType>(INITIAL_MOVIE_LIST);
  const [movieDetail, setMovieDetail] =
    useState<SingleMovieDetail>(INITIAL_DETAIL_MOVIE);

  const loadMovies = async (keyword: string, page?: number) => {
    return await getMoviesRes(keyword, page).then((res: MovieListType) =>
      setMovieList(res)
    );
  };

  const loadMovieDetails = async (id: string) => {
    return await getMovieDetailsRes(id).then((res: SingleMovieDetail) =>
      setMovieDetail(res)
    );
  };

  return (
    <MovieContext.Provider
      value={{
        movieList,
        movieDetail,
        loadMovies,
        loadMovieDetails,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
