import { useEffect } from "react";
import { Outlet } from "react-router";
import { axiosInstance } from "../../lib";
import { useSession } from "../../stores";
import type { ResponseType, SessionType } from "../../types";
import { Header, Loading, Sidebar } from "../ui";

export const Layout = () => {
  const { setSession, setLoading, loading } = useSession();

  useEffect(() => {
    async function getSession() {
      setLoading(true);
      try {
        const res = await axiosInstance.get<ResponseType<SessionType>>(
          "/api/authentication/session",
        );
        console.log("SESSION RESPONSE DATA:", res.data.data);
        setSession(res.data.data ?? null);
      } catch (error) {
        console.log(error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    getSession();
  }, [setSession, setLoading]);

  return (
    <div className="space-y-5 bg bg-red-50">
      <Header />
      <div className="container mx-auto px-5 grid lg:grid-cols-12 lg:gap-5">
        <Sidebar />
        {loading ? <Loading /> : <Outlet />}
      </div>
    </div>
  );
};
