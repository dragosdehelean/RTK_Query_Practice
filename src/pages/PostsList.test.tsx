import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import PostsList from './PostsList';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { BrowserRouter } from 'react-router-dom';

// helper de randare cu provider și router
const renderComponent = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <PostsList />
      </BrowserRouter>
    </Provider>
  );

describe('PostsList', () => {
  it('shows loading spinner initially', () => {
    renderComponent();
    expect(screen.getByRole('status')).toBeInTheDocument(); // spinner
  });

  it('renders posts after loading', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Posts')).toBeInTheDocument();
    });

    expect(screen.getAllByRole('heading', { level: 5 }).length).toBeGreaterThan(0); // titluri postări
    expect(screen.getByText('Mock Post 1')).toBeInTheDocument();
  });

  it('displays author names as links', async () => {
    renderComponent();

    await waitFor(() => screen.getByText('Mock Post 1'));

    const authorLink = screen.getByRole('link', { name: /user one/i });
    expect(authorLink).toHaveAttribute('href', '/users/1');
  });

});