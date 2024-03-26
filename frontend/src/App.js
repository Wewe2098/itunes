// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders search form and favorites list', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText('Search');
  const searchButton = screen.getByRole('button', { name: 'Search' });
  const favoritesHeading = screen.getByText('Favorites');
  
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(favoritesHeading).toBeInTheDocument();
});

test('searches and displays results', async () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText('Search');
  const searchButton = screen.getByRole('button', { name: 'Search' });

  // Mocking fetch requests
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [{ trackId: 1, trackName: 'Test Track', artistName: 'Test Artist' }]
        })
    })
  );

  userEvent.type(searchInput, 'Test');
  userEvent.click(searchButton);

  // Search results
  const searchResult = await screen.findByText('Test Track - Test Artist');
  expect(searchResult).toBeInTheDocument();
});
