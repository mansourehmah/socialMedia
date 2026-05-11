import { axiosInstance } from "./axios";
import type { ResponseType } from "../types";

function unwrapListBody(body: unknown): unknown {
  const o = asRecord(body);
  if (o && "data" in o) return o.data;
  return body;
}

export type PostUser = {
  id: string;
  name: string;
  email?: string;
  username?: string | null;
  image?: string | null;
};

export type Post = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  userId?: string;
  user?: PostUser | null;
  _count?: { likes?: number; comments?: number };
  liked?: boolean;
};

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return null;
}

function normalizeUser(raw: unknown): PostUser | null {
  const o = asRecord(raw);
  if (!o) return null;
  const id = o.id != null ? String(o.id) : "";
  if (!id) return null;
  const user: PostUser = {
    id,
    name: o.name != null ? String(o.name) : "User",
    username: o.username != null ? String(o.username) : null,
    image: o.image != null ? String(o.image) : null,
  };
  if (o.email != null) {
    return { ...user, email: String(o.email) };
  }
  return user;
}

function normalizeCount(raw: unknown): Post["_count"] {
  const o = asRecord(raw);
  if (!o) return undefined;
  const likes = o.likes;
  const comments = o.comments;
  const out: NonNullable<Post["_count"]> = {};
  if (typeof likes === "number") out.likes = likes;
  if (typeof comments === "number") out.comments = comments;
  return Object.keys(out).length > 0 ? out : undefined;
}

export function normalizePost(raw: unknown): Post {
  const o = asRecord(raw);
  if (!o) {
    return {
      id: "",
      content: "",
      createdAt: new Date().toISOString(),
      user: null,
    };
  }

  const likedRaw = o.liked ?? o.isLiked ?? o.userLiked;

  const post: Post = {
    id: o.id != null ? String(o.id) : "",
    content:
      o.content != null
        ? String(o.content)
        : o.text != null
          ? String(o.text)
          : "",
    createdAt:
      o.createdAt != null
        ? String(o.createdAt)
        : new Date().toISOString(),
    user: normalizeUser(o.user ?? o.author),
  };
  const count = normalizeCount(o._count);
  if (count !== undefined) post._count = count;
  if (o.updatedAt != null) post.updatedAt = String(o.updatedAt);
  if (o.userId != null) post.userId = String(o.userId);
  if (typeof likedRaw === "boolean") post.liked = likedRaw;
  return post;
}

export function normalizePosts(raw: unknown): Post[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw.map(normalizePost).filter((p) => p.id);
  }
  const o = asRecord(raw);
  if (o && Array.isArray(o.posts)) {
    return normalizePosts(o.posts);
  }
  if (o && Array.isArray(o.data)) {
    return normalizePosts(o.data);
  }
  return [];
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await axiosInstance.get<unknown>("/api/posts");
  return normalizePosts(unwrapListBody(res.data));
}

export async function createPost(content: string): Promise<void> {
  await axiosInstance.post<ResponseType<unknown>>("/api/posts", { content });
}

/** Toggle like / unlike — backend uses PATCH on the post resource. */
export async function togglePostLike(postId: string): Promise<void> {
  await axiosInstance.patch<ResponseType<unknown>>(
    `/api/posts/${postId}`,
    {},
  );
}

export async function addComment(
  postId: string,
  content: string,
): Promise<void> {
  await axiosInstance.post<ResponseType<unknown>>(
    `/api/posts/${postId}/comment`,
    { content },
  );
}
