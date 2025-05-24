import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../features/users/usersApi';
import { postsApi } from '../features/posts/postsApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, postsApi.middleware),
});

// ✅ Adaugă setupStore pentru testare
export const setupStore = () =>
  configureStore({
    reducer: {
      [postsApi.reducerPath]: postsApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware, usersApi.middleware),
  });