import { AxiosError, AxiosResponse } from "axios";
import { http } from "@/services/fetcher/axios";

export interface SearchParams {
  query: string;
  page: number;
}

interface Result {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  title: string;
  release_date: string;
  popularity: number;
}

export interface SearchResponse {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export const getSearch = async (params: SearchParams) => {
  const url = "/3/search/movie";
  try {
    const response = await http.get(url, {
      params: {
        include_adult: false,
        language: "en-US",
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    const errorResponse = error as AxiosError;
    const response = errorResponse.response as AxiosResponse;
    return response;
  }
};
