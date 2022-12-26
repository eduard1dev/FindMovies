import React from "react";
import { act, fireEvent, render, waitFor } from "../../__test__/test-utils";
import Home from "../Home";
import { api } from "../../services/api";
import { mocks } from "./__mocks__";

describe("Home screen tests", () => {
  test("should call api on useEffect", async () => {
    const apiCall = jest.fn(({ url }) => {
      switch (url) {
        case "3/genre/movie/list?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US":
          return Promise.resolve({ data: mocks.genres });
        case "3/movie/popular?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US&page=1":
          return Promise.resolve({ data: mocks.movies });
        default:
          return Promise.reject(new Error("not found"));
      }
    });

    jest.spyOn(api, "get").mockImplementation(apiCall);

    const { findAllByTestId } = render(<Home />);

    expect((await findAllByTestId("genre-item")).length).toBeGreaterThan(0);
    expect((await findAllByTestId("carousel-item")).length).toBeGreaterThan(0);
  });

  test("should set active button when press genre button and show carousel", async () => {
    const { findAllByTestId, getByTestId } = render(<Home />);

    const genreButtons = await findAllByTestId("genre-item");

    expect(genreButtons[0].props.active).toEqual(false);

    fireEvent.press(genreButtons[0]);

    expect(genreButtons[0].props.active).toEqual(true);

    const carousel = getByTestId("carousel");

    waitFor(() => expect(carousel).toBeTruthy());
  });
});
