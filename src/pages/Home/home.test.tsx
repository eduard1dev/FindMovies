import React from 'react';
import { act, fireEvent, render, waitFor } from '../../__test__/test-utils';
import Home from '../Home';
import Api from '../../services/api';
import { mocks } from './__mocks__';

describe('Home screen tests', () => {
  /* test('should show the username into home screen', async () => {
    const { findByText } = render(<Home />);
    expect(await findByText('Eduardo', { exact: false })).toBeTruthy();
  }); */

  test('should call api on useEffect', async () => {
    const apiCall = jest.fn((url) => {
      switch (url) {
        case '3/genre/movie/list?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US':
          return Promise.resolve(mocks.genres);
        case '3/movie/popular?api_key=f0a360a00e6d9881d19efe3c62a0302b&language=en-US&page=1':
          return Promise.resolve(mocks.movies);
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    jest.spyOn(Api, 'get').mockImplementation(apiCall);

    const { findAllByTestId } = render(<Home />);

    expect(await findAllByTestId('genre-item')).toBeTruthy();
    expect((await findAllByTestId('carousel-item')).length).toBeGreaterThan(0);
  });

  test('should set active button when press genre button', async () => {
    const { findAllByTestId, getByTestId } = render(<Home />);

    const genreButtons = await findAllByTestId('genre-item');

    expect(genreButtons[0].props.active).toEqual(false);

    fireEvent.press(genreButtons[0]);

    expect(genreButtons[0].props.active).toEqual(true);

    waitFor(() => expect(getByTestId('carousel')).toBeTruthy());
  });
});
