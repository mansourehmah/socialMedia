import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addComment, togglePostLike } from "../../lib/posts";
import type { Post } from "../../lib/posts";
import { getAxiosErrorMessage } from "../../lib/errors";
import { formatRelativeTime } from "../../lib/formatTime";
import { useSession } from "../../stores";
import { UserAvatar } from "./UserAvatar";

type Props = { post: Post };

function displayHandle(post: Post): string {
  const u = post.user;
  if (u?.username) return `@${u.username}`;
  if (u?.email) return `@${u.email.split("@")[0]}`;
  if (u?.id) return `@${u.id.slice(0, 12)}`;
  return "@user";
}

export function PostCard({ post }: Props) {
  const session = useSession((s) => s.session);
  const queryClient = useQueryClient();
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const authorId = post.user?.id ?? post.userId;
  const currentUserId = session?.user.id;
  const isOwnPost =
    currentUserId != null &&
    authorId != null &&
    currentUserId === authorId;
  const canLike = session != null && !isOwnPost;

  const likeMutation = useMutation({
    mutationFn: () => togglePostLike(post.id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err: unknown) => {
      toast.error(getAxiosErrorMessage(err, "Could not update like"));
    },
  });

  const commentMutation = useMutation({
    mutationFn: () => addComment(post.id, commentText.trim()),
    onSuccess: () => {
      setCommentText("");
      setCommentOpen(false);
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Comment added");
    },
    onError: (err: unknown) => {
      toast.error(getAxiosErrorMessage(err, "Could not add comment"));
    },
  });

  const user = post.user;
  const name = user?.name ?? "User";
  const likes = post._count?.likes ?? 0;
  const comments = post._count?.comments ?? 0;
  const liked = post.liked === true;

  return (
    <article className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 shadow-sm">
      <header className="flex gap-3">
        <UserAvatar src={user?.image} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-neutral-100">{name}</p>
          <p className="truncate text-sm text-neutral-500">
            {displayHandle(post)} · {formatRelativeTime(post.createdAt)}
          </p>
        </div>
      </header>
      <p className="mt-3 whitespace-pre-wrap text-neutral-100">
        {post.content}
      </p>
      <footer className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-400">
        <button
          type="button"
          disabled={!canLike || likeMutation.isPending}
          title={
            !session
              ? "Sign in to like posts"
              : isOwnPost
                ? "You can't like your own post"
                : liked
                  ? "Unlike"
                  : "Like"
          }
          onClick={() => {
            if (canLike) likeMutation.mutate();
          }}
          className="inline-flex items-center gap-1.5 rounded-lg px-1 py-0.5 disabled:cursor-not-allowed disabled:opacity-45 enabled:hover:text-rose-400"
          aria-pressed={liked}
          aria-disabled={!canLike}
        >
          {likeMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart
              className="h-4 w-4"
              fill={liked ? "currentColor" : "none"}
              strokeWidth={1.75}
            />
          )}
          <span>{likes}</span>
        </button>
        <button
          type="button"
          onClick={() => setCommentOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg px-1 py-0.5 hover:text-neutral-200"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
          <span>{comments}</span>
        </button>
      </footer>
      {commentOpen && (
        <div className="mt-3 flex flex-col gap-2 border-t border-neutral-800 pt-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment…"
            disabled={commentMutation.isPending}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-neutral-600"
          />
          <button
            type="button"
            disabled={
              !commentText.trim() || commentMutation.isPending
            }
            onClick={() => commentMutation.mutate()}
            className="self-end rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-40 enabled:hover:bg-blue-500"
          >
            {commentMutation.isPending ? "Sending…" : "Send"}
          </button>
        </div>
      )}
    </article>
  );
}
