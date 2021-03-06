import { createContext, ReactNode, useContext, useState } from "react";
import createPersistedState from "use-persisted-state";

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
  favouriteList: [],
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
  handleFavourite: () => {
    return;
  },
  checkFavourite: () => {
    return false;
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
  const useFavourite = createPersistedState("favourite");
  const [movieList, setMovieList] = useState<MovieListType>(INITIAL_MOVIE_LIST);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [favouriteList, setFavouriteList] = useFavourite<
    Array<SingleMovieDetail>
  >([]);

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

  const handleFavourite = (category: string, content: SingleMovieDetail) => {
    if (category === "set") {
      setFavouriteList([...favouriteList, content]);
      toast({
        status: "success",
        title: "Successfully added to favourite list.",
      });
    } else if (category === "delete") {
      const remainingFavourite = favouriteList.filter(
        (favourite) => favourite.imdbID !== content.imdbID
      );
      toast({
        status: "warning",
        title: "Removed from favourite list.",
      });
      setFavouriteList(remainingFavourite);
    }
  };

  const checkFavourite = (id: string) => {
    return favouriteList.some((item) => item.imdbID === id);
  };

  return (
    <MovieContext.Provider
      value={{
        searchKeyword,
        movieList,
        page,
        isSubmitted,
        favouriteList,
        loadMovies,
        handleChangeSearchKey,
        handleResetList,
        setNextPage,
        setPrevPage,
        handleFavourite,
        checkFavourite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
