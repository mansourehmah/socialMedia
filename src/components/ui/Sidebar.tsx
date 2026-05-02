import { useSession } from "../../stores";

const AuthenticatedSidebar = () => {
  return <div>yes login :) </div>;
};

const NotAuthenticatedSidebar = () => {
  return <div>no login</div>;
};

export const Sidebar = () => {
  const { session } = useSession();

  return (
    <div className="hidden lg:block lg:col-span-3">
      <div className="border">
        {session ? <AuthenticatedSidebar /> : <NotAuthenticatedSidebar />}
      </div>
    </div>
  );
};
