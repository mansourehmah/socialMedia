import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib";
import { useSession } from "../../stores";
import avatar from "../../assets/avatar.png";

type RecommendedUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  _count: {
    followers: number;
  };
};

export const RecommendedUsers = () => {
  const session = useSession((s) => s.session);
  const [users, setUsers] = useState<RecommendedUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;

    async function fetchRecommendedUsers() {
      setLoading(true);
      try {
        const res = await axiosInstance.get<{ data: RecommendedUser[] }>(
          "/api/users/recommend",
        );

        console.log(JSON.stringify(res.data.data, null, 2));

        setUsers(res.data.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendedUsers();
  }, [session]);

  if (!session) return null;

  return (
    <div className="sticky top-4">
      <div className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-8">
          Recommended users
        </h2>

        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-gray-400">No recommendations yet.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.image || avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-[16px] text-[#A3A3A3] dark:text-white">
                      {user.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {user._count.followers} follower
                      {user._count.followers !== 1 && "s"}
                    </p>
                  </div>
                </div>

                <button className="text-sm px-4 py-1.5 rounded-lg border border-gray-300 dark:border-[#333] bg-transparent text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2e2e2e] transition cursor-pointer">
                  Follow
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
