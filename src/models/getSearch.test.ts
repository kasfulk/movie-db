import { AxiosError, AxiosResponse } from "axios";
import { getSearch, SearchParams, SearchResponse } from "./getSearch"; // Update the path accordingly
import { http } from "@/services/fetcher/axios";

// Mocking the axios module
jest.mock("../services/fetcher/axios");

describe("getSearch function", () => {
  it("fetches search results successfully from an API", async () => {
    // Mock AxiosResponse object
    const mockResponse: AxiosResponse<SearchResponse> = {
      data: {
        // Provide your mock response data here
        // Make sure it matches the SearchResponse interface
        // ...
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    // Mock axios.get to return the mockResponse
    (http.get as jest.MockedFunction<typeof http.get>).mockResolvedValue(mockResponse);

    const searchParams: SearchParams = {
      query: "example",
      page: 1,
    };
    const result = await getSearch(searchParams);

    expect(result).toEqual(mockResponse.data);
    expect(http.get).toHaveBeenCalledWith("/3/search/movie", {
      params: {
        include_adult: false,
        language: "en-US",
        ...searchParams,
      },
    });
  });

  it("fetches search results erroneously from an API", async () => {
    // Mock AxiosError object
    const mockError: AxiosError = {
      response: {
        status: 500,
        statusText: "Internal Server Error",
        data: {}, // You can provide error response data here
        headers: {},
        config: {},
      },
      config: {},
      name: "AxiosError",
      message: "Request failed with status code 500",
      isAxiosError: true,
    };

    // Mock axios.get to throw the mockError
    (http.get as jest.MockedFunction<typeof http.get>).mockRejectedValue(mockError);

    const searchParams: SearchParams = {
      query: "example",
      page: 1,
    };
    const result = await getSearch(searchParams);

    expect(result).toEqual(mockError.response);
    expect(http.get).toHaveBeenCalledWith("/3/search/movie", {
      params: {
        include_adult: false,
        language: "en-US",
        ...searchParams,
      },
    });
  });
});
