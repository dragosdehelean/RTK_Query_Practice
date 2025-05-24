/**
 * This is the main entry point of the React application, which utilizes React Router for navigation.
 * The project is designed to demonstrate the use of RTK Query (Redux Toolkit Query) for managing
 * API data fetching and caching in a TypeScript-based React application.
 *
 * ## Project Overview
 * - The application consists of two main pages:
 *   1. **PostsList**: Displays a list of posts fetched from an API.
 *   2. **UserDetail**: Displays detailed information about a specific user, based on the `userId` parameter in the URL.
 * - Navigation is handled using React Router, with links and routes defined for the pages.
 *
 * ## Key Components
 * - **Router**: Wraps the application to enable client-side routing.
 * - **Routes**: Defines the available routes in the application.
 * - **Link**: Provides navigation between pages without a full page reload.
 * - **PostsList**: A component responsible for rendering a list of posts.
 * - **UserDetail**: A component responsible for rendering detailed information about a user.
 *
 * ## Route Structure
 * - `/`: Displays the `PostsList` component.
 * - `/users/:userId`: Displays the `UserDetail` component, where `:userId` is a dynamic parameter representing the user's ID.
 *
 * ## Purpose
 * This project serves as a live coding exercise to demonstrate:
 * - The integration of RTK Query for efficient data fetching and caching.
 * - The use of TypeScript for type safety and improved developer experience.
 * - The implementation of React Router for seamless navigation between pages.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostsList from './pages/PostsList';
import UserDetail from './pages/UserDetail';



const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Posts</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </Router>
  );
};

export default App;