import { useQuery } from "react-query";
import { getDetail, DetailResponse } from "@/models/getDetail";

export const useDetail = (movieId: string) => {
  return useQuery<DetailResponse>(
    ["detail", movieId],
    async () => await getDetail(movieId),
  );
};
