import { rest } from "msw";

const BASE_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  rest.get(`${BASE_URL}/posts`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: "Mock Post 1", userId: 1 },
        { id: 2, title: "Mock Post 2", userId: 2 },
      ])
    );
  }),

  rest.get(`${BASE_URL}/users`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: "User One", email: "user1@example.com" },
        { id: 2, name: "User Two", email: "user2@example.com" },
      ])
    );
  }),

  rest.put(`${BASE_URL}/users/:id`, async (req, res, ctx) => {
    const updatedUser = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        id: Number(req.params.id),
        ...updatedUser,
      })
    );
  }),
];
