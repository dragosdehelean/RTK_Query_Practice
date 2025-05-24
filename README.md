# RTK Query Users and Posts

This project demonstrates the use of **RTK Query** for managing API calls in a React application. It includes features for fetching and displaying users and posts.

## Project Structure

### [src/](./src/)
Contains the main source code for the application.

- **[app/](./src/app/)**: Application-wide configurations, including the Redux store.
- **[features/](./src/features/)**: Contains feature-specific logic.
  - **[posts/](./src/features/posts/)**: Logic related to posts, including API calls and selectors.
  - **[users/](./src/features/users/)**: Logic related to users, including API calls.
- **[pages/](./src/pages/)**: React components for different pages of the application.

### Key Files

- **[App.tsx](./src/App.tsx)**: The root component of the application.
- **[main.tsx](./src/main.tsx)**: Entry point for the React application.
- **[store.ts](./src/app/store.ts)**: Redux store configuration.
- **[postsApi.ts](./src/features/posts/postsApi.ts)**: API logic for posts.
- **[usersApi.ts](./src/features/users/usersApi.ts)**: API logic for users.
- **[PostsList.tsx](./src/pages/PostsList.tsx)**: Component for displaying a list of posts.
- **[UserDetail.tsx](./src/pages/UserDetail.tsx)**: Component for displaying user details.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the application in your browser at `http://localhost:3000`.

## Features

- Fetch and display a list of users and posts.
- View details for individual users.
- Demonstrates the use of **RTK Query** for API integration.

## License

This project is licensed under the MIT License.
