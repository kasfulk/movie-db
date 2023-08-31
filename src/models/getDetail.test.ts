import { AxiosError, AxiosResponse } from "axios";
import { getDetail, DetailResponse } from "./getDetail"; // Update the path accordingly
import { http } from "@/services/fetcher/axios";

// Mocking the axios module
jest.mock("../services/fetcher/axios");

describe("getDetail function", () => {
  it("fetches successfully data from an API", async () => {
    // Mock AxiosResponse object
    const mockResponse: AxiosResponse<DetailResponse> = {
      data: {
        // Provide your mock response data here
        // Make sure it matches the DetailResponse interface
        // ...
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    // Mock axios.get to return the mockResponse
    (http.get as jest.MockedFunction<typeof http.get>).mockResolvedValue(
      mockResponse,
    );

    const movieId = "123"; // Provide a movie ID
    const result = await getDetail(movieId);

    expect(result).toEqual(mockResponse.data);
    expect(http.get).toHaveBeenCalledWith(`/3/movie/${movieId}`, {
      params: {
        language: "en-US",
      },
    });
  });

  it("fetches erroneously data from an API", async () => {
    // Mock AxiosError object
    const mockError: AxiosError = {
      response: {
        status: 404,
        statusText: "Not Found",
        data: {}, // You can provide error response data here
        headers: {},
        config: {},
      },
      config: {},
      name: "AxiosError",
      message: "Request failed with status code 404",
      isAxiosError: true,
    };

    // Mock axios.get to throw the mockError
    (http.get as jest.MockedFunction<typeof http.get>).mockRejectedValue(
      mockError,
    );

    const movieId = "123"; // Provide a movie ID
    const result = await getDetail(movieId);

    expect(result).toEqual(mockError.response);
    expect(http.get).toHaveBeenCalledWith(`/3/movie/${movieId}`, {
      params: {
        language: "en-US",
      },
    });
  });
});
