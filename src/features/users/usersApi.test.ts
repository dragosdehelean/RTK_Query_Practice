import { usersApi } from './usersApi';

describe('usersApi endpoints', () => {
  test('should have getUsers endpoint defined', () => {
    expect(usersApi.endpoints.getUsers).toBeDefined();
  });
});