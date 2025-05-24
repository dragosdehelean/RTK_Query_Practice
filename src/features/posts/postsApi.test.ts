import { postsApi } from './postsApi';

describe('postsApi endpoints', () => {
  test('should have getPosts endpoint defined', () => {
    expect(postsApi.endpoints.getPosts).toBeDefined();
  });
});