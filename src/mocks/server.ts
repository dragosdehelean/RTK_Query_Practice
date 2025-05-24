import { setupServer } from 'msw/node'; // corect
import { handlers } from './handlers';

export const server = setupServer(...handlers);