# 🧪 React RTK Query Testing Guide

## Types of Tests

### 1. Unit Tests (`*.test.ts/tsx`)
- Purpose: Test isolated logic (selectors, API endpoints, components)
- Tools: Vitest, @testing-library/react
- Location: Colocated with source files (e.g., `postsApi.test.ts` next to `postsApi.ts`)

### 2. Integration Tests with MSW
- Purpose: Test components with mocked API layer
- Tools: Vitest, MSW (Mock Service Worker)
- Location: `src/mocks/` for handlers and server setup
- Examples: Component tests that verify API integration

### 3. End-to-End Tests
- Tool: Cypress
- Location: `cypress/e2e/`
- Tests complete user flows with real UI interaction

## Project Test Structure

```
src/
  features/
    posts/
      postsApi.test.ts     # API endpoint tests
      postsApi.ts
      selectors.test.ts    # Redux selector tests
      selectors.ts
    users/
      usersApi.test.ts     # API endpoint tests
      usersApi.ts
  mocks/
    handlers.ts            # MSW API mock handlers
    server.ts             # MSW server setup
  pages/
    PostsList.test.tsx    # Component tests
    UserDetail.test.tsx   # Component tests
  test/
    setup.ts             # Test environment setup
cypress/
  e2e/
    posts.cy.ts          # E2E test suite
```

## Test Setup

### Vitest Configuration
Project uses Vitest for unit and integration testing:
- `vitest.config.ts` - Test runner configuration
- `src/test/setup.ts` - Global test setup

### MSW Setup
Mock Service Worker intercepts and mocks API calls:
- `src/mocks/handlers.ts` - API route mocks
- `src/mocks/server.ts` - MSW server configuration

### Cypress Setup
End-to-end testing configuration:
- `cypress.config.ts` - Cypress configuration
- `cypress/e2e/` - Test specs
- `cypress/support/` - Support files and commands

## Running Tests

```bash
# Run unit and integration tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run cypress:open

# Run specific test file
npm run test src/features/posts/postsApi.test.ts
```

## Best Practices

1. **Colocation**: Keep test files next to the code they test
2. **Mocking**:
   - Use MSW for API mocks
   - Mock only what's necessary
3. **Testing Strategy**:
   - Unit test complex logic and selectors
   - Integration test components with API calls
   - E2E test critical user flows
4. **Coverage**:
   - Aim for high coverage of business logic
   - Focus on testing behavior, not implementation
5. **Maintenance**:
   - Keep tests focused and readable
   - Update tests when changing code

## Example Tests

### API Test (`postsApi.test.ts`)
```ts
describe('posts api', () => {
  it('fetches posts successfully', async () => {
    const result = await store.dispatch(postsApi.endpoints.getPosts.initiate())
    expect(result.data).toBeDefined()
    expect(result.data.length).toBeGreaterThan(0)
  })
})
```

### Component Test (`PostsList.test.tsx`)
```ts
test('renders posts from API', async () => {
  render(<PostsList />)
  expect(await screen.findByText(/loading/i)).toBeInTheDocument()
  expect(await screen.findByText(/post title/i)).toBeInTheDocument()
})
```

### E2E Test (`posts.cy.ts`)
```ts
describe('Posts Feature', () => {
  it('displays posts and navigates to details', () => {
    cy.visit('/')
    cy.get('[data-testid="post-list"]').should('be.visible')
    cy.contains('Post Title').click()
    cy.url().should('include', '/posts/')
  })
})
```