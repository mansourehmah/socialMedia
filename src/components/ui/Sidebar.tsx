import { useSession } from "../../stores";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib";

export const Sidebar = () => {
  const { session, loading } = useSession();
  // const loading = true;

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/api/users/${session.user.id}`);
        console.log(res.data.data);
        setUserData(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [session]);

  if (loading) {
    return (
      <aside className="lg:col-span-3">
        <div className="hidden lg:flex flex-col bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xl dark:bg-[#0A0A0A] dark:border-[#262626] min-h-[320px]">
          <div className="flex flex-col items-center justify-center flex-1 animate-pulse gap-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-[#e5e5e5] dark:bg-[#1a1a1a]"></div>

            {/* Username */}
            <div className="h-4 w-32 rounded bg-[#e5e5e5] dark:bg-[#1a1a1a]"></div>

            {/* Email */}
            <div className="h-3 w-24 rounded bg-[#e5e5e5] dark:bg-[#1a1a1a]"></div>

            {/* Bio */}
            <div className="h-3 w-40 rounded bg-[#e5e5e5] dark:bg-[#1a1a1a] mt-2"></div>
            <div className="h-3 w-32 rounded bg-[#e5e5e5] dark:bg-[#1a1a1a]"></div>

            <div className="h-px bg-[#E5E5E5] dark:bg-[#262626]"></div>

            {/* Stats */}
            <div className="flex flex-col gap-6 mt-4">
              <div className="h-4 w-12 rounded bg-[#e5e5e5] dark:bg-[#1a1a1a]"></div>
              <div className="h-4 w-12 rounded bg-[#e5e5e5] dark:bg-[#1a1a1a]"></div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // اگر لاگین نیست → کارت خوش‌آمدگویی
  if (!session) {
    return (
      <aside className="lg:col-span-3">
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-5 space-y-6 shadow-xl dark:bg-[#0A0A0A] dark:border-[#262626] hidden lg:block">
          <h2 className="text-xl font-bold text-[#171717] dark:text-[#FAFAFA] text-center">
            Welcome Back!
          </h2>
          <p className="text-[#737373] dark:text-[#A3A3A3] text-sm text-center">
            Login to access your profile and connect with others.
          </p>

          <div className="flex flex-col gap-3 mt-4">
            <Link
              to="/sign-in"
              className="w-full text-center py-2 rounded-md bg-[#0A0A0A] text-white font-medium shadow-lg dark:border dark:border-[#262626]"
            >
              Log In
            </Link>

            <Link
              to="/sign-up"
              className="bg-[#FAFAFA] w-full text-center py-2 rounded-md border border-white text-[#171717] font-medium shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </aside>
    );
  }

  // اگر لاگین شده → کارت پروفایل
  const user = userData || session.user;

  const avatar = user.image ? user.image : user.name?.charAt(0)?.toUpperCase();

  return (
    <aside className="lg:col-span-3">
      <div className="bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] rounded-xl p-5 space-y-6 hidden lg:block">
        {/* Avatar */}
        <div className="flex justify-center">
          {user.image ? (
            <img
              src={user.image}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#222] flex items-center justify-center text-4xl font-bold text-white">
              {avatar}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-[#171717] dark:text-[#FAFAFA]">
            {user.name}
          </h2>
          <p className="text-[#737373] dark:text-[#A3A3A3]">
            {user.email?.split("@")[0]}
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            {userData?.bio}
          </p>
        </div>
        <div className="h-px bg-[#E5E5E5] dark:bg-[#262626]"></div>

        {/* Stats */}
        <div className="flex justify-center gap-20 text-sm xl:gap-35">
          <div className="text-center">
            <p className="text-[#171717] dark:text-[#FAFAFA] font-semibold">
              {userData?._count?.followings ?? 0}
            </p>
            <p className="text-[#737373] dark:text-[#A3A3A3]">Following</p>
          </div>

          <div className="text-center">
            <p className="text-[#171717] dark:text-[#FAFAFA] font-semibold">
              {userData?._count?.followers ?? 0}
            </p>
            <p className="text-[#737373] dark:text-[#A3A3A3]">Followers</p>
          </div>
        </div>
        <div className="h-px bg-[#E5E5E5] dark:bg-[#262626]"></div>
        {/* Extra Info */}
        <div className="space-y-2 text-sm text-[#737373] dark:text-[#A3A3A3]">
          <p>📍 {userData?.location || "No location"}</p>
          <p>🔗 {userData?.website || "No website"}</p>
        </div>
      </div>
    </aside>
  );
};
