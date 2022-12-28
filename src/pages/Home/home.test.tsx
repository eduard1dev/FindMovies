import React from "react";
import { act, fireEvent, render, waitFor } from "../../__test__/test-utils";
import Home from "../Home";
import * as services from "../../services/api";
import { mocks } from "./__mocks__";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "../../routes/stack.routes";

describe("Home screen tests", () => {
  const apiCall = jest.fn(({ url }) => {
    switch (url) {
      case "3/genre/movie/list?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US":
        return Promise.resolve(mocks.genres.data);
      case "3/movie/popular?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US&page=1":
        return Promise.resolve(mocks.movies.data);
      default:
        return Promise.reject(new Error("not found"));
    }
  });

  jest.spyOn(services, "default").mockImplementation(apiCall);

  afterEach(() => {
    apiCall.mockClear();
  });

  test("should call api on useEffect", async () => {
    const { getAllByTestId, findAllByTestId } = render(<Home />);

    // ...
    // Wait until the callback does not throw an error. In this case, that means
    // it'll wait until the mock function has been called once.
    await act(async () => {
      expect(apiCall).toHaveBeenCalledTimes(2);
    });

    const genreItens = await findAllByTestId("genre-item");

    expect(genreItens.length).toBeGreaterThan(0);

    const carousel = await findAllByTestId("carousel-item");

    expect(carousel.length).toBeGreaterThan(0);
    // ...
  });

  test("should set active button when press genre button and show carousel", async () => {
    const { getAllByTestId, findAllByTestId } = render(<Home />);
    // ...
    // Wait until the callback does not throw an error. In this case, that means
    // it'll wait until the mock function has been called once.
    await waitFor(async () => {
      expect(apiCall).toHaveBeenCalledTimes(2);
      const genreButtons = await findAllByTestId("genre-item");

      expect(genreButtons[0].props.active).toEqual(false);

      fireEvent.press(genreButtons[0]);

      expect(genreButtons[0].props.active).toEqual(true);

      const carousel = getAllByTestId("carousel");

      expect(carousel).toBeTruthy();
    });
    // ...
  });

  test("should go to details page when press carousel item", async () => {
    const stackRoutes = render(
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    );

    // ...
    // Wait until the callback does not throw an error. In this case, that means
    // it'll wait until the mock function has been called once.
    await waitFor(async () => {
      expect(apiCall).toHaveBeenCalledTimes(2);
      const carouselButtons = stackRoutes.getAllByTestId("carousel-item");

      fireEvent.press(carouselButtons[0]);

      const detailsBannerImage = stackRoutes.getAllByTestId(
        "details-banner-image"
      );

      expect(detailsBannerImage).toBeTruthy();
    });
    // ...
  });
});
