import { AxiosError } from "axios";
import { LucideLoader2, LucideLogOut } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib";
import { useSession } from "../../stores";
import { useState } from "react";

export const SignOutButton = () => {
  const setSession = useSession((s) => s.setSession);
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/authentication/logout");
      setSession(null);
      toast.success(res.data.message);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.error);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div onClick={handleSignOut}>
      {loading ? (
        <LucideLoader2 className="animate-spin size-4" />
      ) : (
        <LucideLogOut className="size-4" />
      )}
    </div>
  );
};
