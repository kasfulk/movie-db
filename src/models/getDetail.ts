import { AxiosError, AxiosResponse } from "axios";
import { http } from "@/services/fetcher/axios";

interface Genres {
  id: number;
  name: string;
}

interface ProductionCompanies {
  id: number;
  logo_path: number;
  name: string;
  origin_country: string;
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface DetailResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getDetail = async (movieId: string) => {
  const url = "/3/movie/" + movieId;
  try {
    const response = await http.get(url, {
      params: {
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    const errorResponse = error as AxiosError;
    const response = errorResponse.response as AxiosResponse;
    return response;
  }
};
