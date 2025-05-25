import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { expect, describe, it, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import UserDetail from './UserDetail';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { server } from '../mocks/server';
import { usersApi } from '../features/users/usersApi';

const BASE_URL = import.meta.env.VITE_API_URL;

// helper de randare cu provider și router
const renderComponent = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );

describe('UserDetail', () => {
  beforeEach(() => {
    // Reset store și starea browserului între teste
    store.dispatch(usersApi.util.resetApiState());
    window.history.pushState({}, '', '/users/1');
  });

  it('shows loading spinner initially', () => {
    renderComponent();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders user details after loading', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('User One')).toBeInTheDocument();
    });

    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
  });

  it('opens edit modal when clicking Edit User button', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('User One')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit User'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue('User One');
    expect(screen.getByLabelText(/email/i)).toHaveValue('user1@example.com');
  });
  it('updates user details successfully', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('User One')).toBeInTheDocument();
    });

    // Click edit button
    fireEvent.click(screen.getByText('Edit User'));

    // Update form fields
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });

    // Submit form
    fireEvent.click(screen.getByText('Save Changes'));

      // Wait for update and modal to close
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

  it('closes modal without saving changes', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('User One')).toBeInTheDocument();
    });

    // Open modal
    fireEvent.click(screen.getByText('Edit User'));

    // Modify input but don't save
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Changed Name' } });

    // Close modal
    fireEvent.click(screen.getByText('Cancel'));

    // Verify original data is still displayed
    expect(screen.getByText('User One')).toBeInTheDocument();
    expect(screen.queryByText('Changed Name')).not.toBeInTheDocument();
  });

  it('shows loading state during update', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('User One')).toBeInTheDocument();
    });

    // Open modal and submit form
    fireEvent.click(screen.getByText('Edit User'));
    fireEvent.click(screen.getByText('Save Changes'));

    // Verify loading state
    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });

  it('shows error state when user fetch fails', async () => {
    // Override handler pentru a simula o eroare
    server.use(
      rest.get(`${BASE_URL}/users`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/user not found/i)).toBeInTheDocument();
    });
  });

  it('validates required fields in edit form', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('User One')).toBeInTheDocument();
    });

    // Open edit modal
    fireEvent.click(screen.getByText('Edit User'));

    // Clear required fields
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: '' } });

    // Try to submit
    fireEvent.click(screen.getByText('Save Changes'));

    // Form shouldn't be submitted due to HTML5 validation
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows error toast when update fails', async () => {
    // Override handler pentru a simula o eroare la update
    server.use(
      rest.put(`${BASE_URL}/users/:id`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('User One')).toBeInTheDocument();
    });

    // Open modal and try to update
    fireEvent.click(screen.getByText('Edit User'));
    fireEvent.click(screen.getByText('Save Changes'));

    // Should show error message
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
})

    