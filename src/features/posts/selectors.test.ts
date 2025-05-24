import { selectPostViewModels } from "./selectors";
import { EntityState } from "@reduxjs/toolkit";
import { Post } from "./postsApi";
import { User } from "../users/usersApi";

describe("selectPostViewModels", () => {
  test("should return post view models from posts and users entities", () => {
    const postsData: EntityState<Post> = {
      ids: [1],
      entities: {
        1: { id: 1, title: "Test Post", userId: 1 },
      },
    };

    const usersData: EntityState<User> = {
      ids: [1],
      entities: {
        1: { id: 1, name: "Test User", email: "test@example.com" },
      },
    };

    const result = selectPostViewModels(postsData, usersData);

    expect(result).toEqual([
      {
        id: 1,
        title: "Test Post",
        userId: 1,
        userName: "Test User",
      },
    ]);
  });

  test("should return empty array if postsData is undefined", () => {
    const usersData: EntityState<User> = {
      ids: [],
      entities: {},
    };

    const result = selectPostViewModels(undefined, usersData);

    expect(result).toEqual([]);
  });

  test('should return "Unknown" if user not found', () => {
    const postsData: EntityState<Post> = {
      ids: [1],
      entities: {
        1: { id: 1, title: "Test Post", userId: 99 },
      },
    };

    const usersData: EntityState<User> = {
      ids: [1],
      entities: {
        1: { id: 1, name: "Test User", email: 'test@example.com' },
      },
    };

    const result = selectPostViewModels(postsData, usersData);

    expect(result).toEqual([
      {
        id: 1,
        title: "Test Post",
        userId: 99,
        userName: "Unknown",
      },
    ]);
  });
});
