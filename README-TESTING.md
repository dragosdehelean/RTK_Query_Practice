# ✅ React RTK Query Testing Guide

## 🧪 Types of Tests Implemented

### 1. Unit Tests (`*.test.ts`)
- Purpose: Test isolated logic (selectors, API endpoints, utility functions).
- Tools: Jest, @testing-library/react

### 2. Integration Tests (recommended with MSW)
- Purpose: Test interaction between components and API layer.
- Tools: Jest, MSW

> For example, `selectPostViewModels.test.ts` checks selector logic given a mocked Redux state.

### 3. End-to-End Tests (optional but ideal)
- Tools: Cypress (needs to be installed separately)
- Tests the real flow: user interaction + navigation + side-effects

## ⚙️ Setup

```bash
npm install --save-dev jest ts-jest @testing-library/react @testing-library/jest-dom msw
```

## 📁 Test File Structure

```
src/
  features/
    posts/
      postsApi.test.ts
      selectors.test.ts
      usePosts.test.ts
    users/
      usersApi.test.ts
  setupTests.ts
jest.config.ts
```

## 🧵 Example Explanation

### `selectors.test.ts`
```ts
const mockState = {
  posts: { ids: ['1'], entities: { '1': { id: '1', title: 'Post', userId: 1 } } },
  users: { ids: ['1'], entities: { '1': { id: 1, name: 'User' } } }
};
const result = selectPostViewModels(mockState);
// ✅ Validates that selector combines post and user info correctly.
```

## 🧠 Best Practices

- 🧩 Test selectors with mock state, not real store.
- 🔌 Use MSW to mock API for integration tests.
- 🚦 Add Cypress for full E2E testing later (`tests/e2e` folder recommended).

---

> Ready to scale: Add more tests as your app grows. Focus first on selectors + logic-heavy hooks.