import { createContext, ReactNode, useContext, useState } from "react";

import { useAppToast } from "components/ui/AppToast";
import { getMoviesRes } from "functions/services/fetcher";

import { MovieContextType, MovieListType, SingleMovieDetail } from "./types";

export const INITIAL_MOVIE_LIST: MovieListType = {
  Response: "",
};

export const INITIAL_DETAIL_MOVIE: SingleMovieDetail = {
  Response: "",
};

export const MovieContext = createContext<MovieContextType>({
  searchKeyword: "",
  movieList: INITIAL_MOVIE_LIST,
  page: 1,
  isSubmitted: false,
  loadMovies: async () => {
    return;
  },
  handleChangeSearchKey: () => {
    return;
  },
  handleResetList: () => {
    return;
  },
  setNextPage: () => {
    return;
  },
  setPrevPage: () => {
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
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const loadMovies = async (keyword: string, page?: number) => {
    return await getMoviesRes(keyword, page).then((res: MovieListType) => {
      if (res.Response === "False") {
        toast({
          status: "error",
          title: res.Error,
          description: "Please try again later or with another keyword",
        });
      }
      setMovieList(res);
      setIsSubmitted(true);
    });
  };

  const handleChangeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setSearchKeyword(e.target.value);
  };

  const handleResetList = (isResetButton: boolean) => {
    setMovieList(INITIAL_MOVIE_LIST);
    setPage(1);
    setIsSubmitted(false);
    isResetButton && setSearchKeyword("");
  };

  const setNextPage = () => {
    return setPage(page + 1);
  };

  const setPrevPage = () => {
    return setPage(page - 1);
  };

  return (
    <MovieContext.Provider
      value={{
        searchKeyword,
        movieList,
        page,
        isSubmitted,
        loadMovies,
        handleChangeSearchKey,
        handleResetList,
        setNextPage,
        setPrevPage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
