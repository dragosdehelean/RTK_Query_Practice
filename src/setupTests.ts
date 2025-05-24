import 'whatwg-fetch';
// import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Start MSW before all tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());