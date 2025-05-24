import { renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../app/store";
import { usePosts } from "./usePosts";

test("usePosts should be defined", () => {
  expect(usePosts).toBeDefined();
});

test("usePosts returns mocked posts from MSW", async () => {
  const store = setupStore();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  const { result } = renderHook(() => usePosts(), {
    wrapper,
  });

  await waitFor(() => {
    expect(result.current.posts.length).toBeGreaterThan(0);
  });

  expect(result.current.posts[0]).toHaveProperty("title");
});
