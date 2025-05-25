# RTK Query Users and Posts

This project demonstrates the use of **RTK Query** for managing API calls in a React application. It includes features for fetching and displaying users and posts, with comprehensive testing using Vitest, MSW, and Cypress.

## Project Structure

### [src/](./src/)
Contains the main source code for the application.

- **[app/](./src/app/)**: Application-wide configurations, including the Redux store.
- **[features/](./src/features/)**: Contains feature-specific logic and tests.
  - **[posts/](./src/features/posts/)**: Logic related to posts, including API calls, selectors, and tests.
  - **[users/](./src/features/users/)**: Logic related to users, including API calls and tests.
- **[mocks/](./src/mocks/)**: MSW configuration for API mocking in tests.
- **[pages/](./src/pages/)**: React components with their respective tests.
- **[test/](./src/test/)**: Test setup and configuration.

### Key Files

- **[App.tsx](./src/App.tsx)**: The root component of the application.
- **[main.tsx](./src/main.tsx)**: Entry point for the React application.
- **[store.ts](./src/app/store.ts)**: Redux store configuration.
- **[postsApi.ts](./src/features/posts/postsApi.ts)**: API logic for posts.
- **[usersApi.ts](./src/features/users/usersApi.ts)**: API logic for users.
- **[PostsList.tsx](./src/pages/PostsList.tsx)**: Component for displaying a list of posts.
- **[UserDetail.tsx](./src/pages/UserDetail.tsx)**: Component for displaying user details.
- **[handlers.ts](./src/mocks/handlers.ts)**: MSW request handlers for testing.
- **[server.ts](./src/mocks/server.ts)**: MSW server setup for testing.
- **[setup.ts](./src/test/setup.ts)**: Test environment configuration.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Start the JSON Server (for API):
   ```bash
   npm run server
   ```

4. Open the application in your browser at `http://localhost:5173`.

## Testing

The project includes different types of tests:

1. Unit Tests (`*.test.ts/tsx`):
   ```bash
   npm run test
   ```

2. End-to-End Tests (Cypress):
   ```bash
   npm run cypress:open
   ```

## Features

- Fetch and display a list of users and posts
- View details for individual users
- Comprehensive test coverage with Vitest and Cypress
- Mock Service Worker (MSW) for API mocking in tests
- Type-safe API calls with RTK Query

## License

This project is licensed under the MIT License.
