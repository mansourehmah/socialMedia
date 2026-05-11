import { useQuery } from "@tanstack/react-query";
import { fetchPosts, type Post } from "../../lib/posts";
import { getAxiosErrorMessage } from "../../lib/errors";
import { useSession } from "../../stores";
import { CreatePostCard } from "./CreatePostCard";
import { FeedErrorBoundary } from "./FeedErrorBoundary";
import { PostCard } from "./PostCard";

export function Feed() {
  const session = useSession((s) => s.session);
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<
    Post[],
    unknown
  >({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const posts = data ?? [];

  return (
    <FeedErrorBoundary>
      <div className="space-y-5">
        {session ? <CreatePostCard session={session} /> : null}

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-2xl bg-neutral-900/80"
              />
            ))}
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-200">
            <p className="font-medium">Could not load posts</p>
            <p className="mt-1 text-sm text-neutral-400">
              {getAxiosErrorMessage(error, "Network error")}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm hover:bg-neutral-700"
            >
              Retry
            </button>
          </div>
        ) : null}

        {!isLoading && !isError && posts.length === 0 ? (
          <p className="py-12 text-center text-neutral-500">
            No posts yet. Be the first to share something.
          </p>
        ) : null}

        {!isLoading && !isError && posts.length > 0 ? (
          <div className="space-y-5">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : null}

        {isFetching && !isLoading ? (
          <p className="text-center text-xs text-neutral-600">Updating…</p>
        ) : null}
      </div>
    </FeedErrorBoundary>
  );
}
