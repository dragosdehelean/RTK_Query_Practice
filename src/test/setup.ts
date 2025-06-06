/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import 'whatwg-fetch'; // adaugă această linie

import { server } from '../mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());