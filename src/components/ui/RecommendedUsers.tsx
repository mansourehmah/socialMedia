import { useSession } from "../../stores";

export const RecommendedUsers = () => {
  const session = useSession((s) => s.session);

  if (!session) return null;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4">
      <h2 className="font-semibold text-neutral-100">Recommended users</h2>
      <p className="mt-2 text-sm text-neutral-500">Coming soon</p>
    </div>
  );
};
