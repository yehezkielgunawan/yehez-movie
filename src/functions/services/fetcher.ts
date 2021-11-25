import axios, { AxiosResponse } from "axios";

import { MovieListType, SingleMovieDetail } from "components/provider/types";
import { API_KEY, BASE_URL } from "constants/base";

export const getMoviesRes = async (keyword: string, page?: number) => {
  return axios
    .get(`${BASE_URL}?apikey=${API_KEY}&s=${keyword}&page=${page ? page : 1}`)
    .then((res: AxiosResponse<MovieListType>) => res.data);
};

export const getMovieDetailsRes = async (imdbID: string) => {
  return axios
    .get(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`)
    .then((res: AxiosResponse<SingleMovieDetail>) => res.data);
};
