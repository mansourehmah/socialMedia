import { clsx } from "clsx";
import { User } from "lucide-react";

type Props = { src?: string | null | undefined; size?: "sm" | "md" };

export function UserAvatar({ src, size = "md" }: Props) {
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={clsx(dim, "shrink-0 rounded-full object-cover")}
      />
    );
  }
  return (
    <div
      className={clsx(
        dim,
        "flex shrink-0 items-center justify-center rounded-full bg-blue-600",
      )}
    >
      <User className="text-white" size={size === "sm" ? 18 : 22} />
    </div>
  );
}
