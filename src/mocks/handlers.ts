import { rest } from 'msw';

export const handlers = [
  rest.get('/posts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: 'Mock Post 1', userId: 1 },
        { id: 2, title: 'Mock Post 2', userId: 2 }
      ])
    );
  }),

  rest.get('/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'User One', email: 'user1@example.com' },
        { id: 2, name: 'User Two', email: 'user2@example.com' }
      ])
    );
  })
];