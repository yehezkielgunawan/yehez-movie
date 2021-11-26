import { createContext, ReactNode, useContext, useState } from "react";

import { useAppToast } from "components/ui/AppToast";
import { getMovieDetailsRes, getMoviesRes } from "functions/services/fetcher";

import { MovieContextType, MovieListType, SingleMovieDetail } from "./types";

const INITIAL_MOVIE_LIST: MovieListType = {
  Response: "",
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
  searchKeyword: "",
  movieList: INITIAL_MOVIE_LIST,
  movieDetail: INITIAL_DETAIL_MOVIE,
  loadMovies: async () => {
    return;
  },
  loadMovieDetails: async () => {
    return;
  },
  handleChangeSearchKey: () => {
    return;
  },
  handleReset: () => {
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
  const toast = useAppToast();
  const [movieList, setMovieList] = useState<MovieListType>(INITIAL_MOVIE_LIST);
  const [movieDetail, setMovieDetail] =
    useState<SingleMovieDetail>(INITIAL_DETAIL_MOVIE);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const loadMovies = async (keyword: string, page?: number) => {
    return await getMoviesRes(keyword, page).then((res: MovieListType) => {
      if (res.Response === "False") {
        toast({
          status: "error",
          title: res.Error,
          description: "Please try again later or with another keyword",
        });
      }
      return setMovieList(res);
    });
  };

  const loadMovieDetails = async (id: string) => {
    return await getMovieDetailsRes(id).then((res: SingleMovieDetail) =>
      setMovieDetail(res)
    );
  };

  const handleChangeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setSearchKeyword(e.target.value);
  };

  const handleReset = (isResetButton: boolean) => {
    setMovieList(INITIAL_MOVIE_LIST);
    isResetButton && setSearchKeyword("");
  };

  return (
    <MovieContext.Provider
      value={{
        searchKeyword,
        movieList,
        movieDetail,
        loadMovies,
        loadMovieDetails,
        handleChangeSearchKey,
        handleReset,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
