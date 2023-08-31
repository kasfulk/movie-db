import { useQuery } from "react-query";
import { SearchParams, getSearch, SearchResponse } from "@/models/getSearch";

export const useSearchQuery = (params: SearchParams) => {
  return useQuery<SearchResponse>(
    ["search"],
    async () => await getSearch(params),
  );
};
