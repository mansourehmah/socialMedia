import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { createPost } from "../../lib/posts";
import { getAxiosErrorMessage } from "../../lib/errors";
import type { SessionType } from "../../types";
import { UserAvatar } from "./UserAvatar";

type Props = { session: SessionType };

export function CreatePostCard({ session }: Props) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const user = session.user;

  const mutation = useMutation({
    mutationFn: async () => {
      const text = content.trim();
      if (!text) throw new Error("Write something first");
      await createPost(text);
    },
    onSuccess: () => {
      setContent("");
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Posted");
    },
    onError: (err: unknown) => {
      toast.error(getAxiosErrorMessage(err, "Could not create post"));
    },
  });

  const disabled = !content.trim() || mutation.isPending;

  return (
    <div className="mb-5 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 shadow-sm">
      <div className="flex gap-3">
        <UserAvatar src={user.image} />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows={3}
          disabled={mutation.isPending}
          className="min-h-[5.5rem] max-h-48 w-full resize-none overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-neutral-600"
        />
      </div>
      <div className="mt-3 flex justify-end border-t border-neutral-800 pt-3">
        <button
          type="button"
          disabled={disabled}
          onClick={() => mutation.mutate()}
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-2 text-sm font-medium text-neutral-100 disabled:opacity-40 enabled:hover:bg-neutral-800"
        >
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Post
        </button>
      </div>
    </div>
  );
}
