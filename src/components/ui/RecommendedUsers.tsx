import { useSession } from "../../stores";

export const RecommendedUsers = () => {
  const session = useSession((s) => s.session);

  if (!session) return null;

  return (
    <div className="border">
      <h2>Recommended Users</h2>
    </div>
  );
};
