import { Navigate, Outlet } from "react-router";
import { useSession } from "../../stores";

export const ProtectRoute = () => {
  const session = useSession((s) => s.session);
  if (!session) return <Navigate to="/sign-in" />;

  return <Outlet />;
};
