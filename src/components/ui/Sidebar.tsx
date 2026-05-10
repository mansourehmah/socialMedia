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
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-sm text-neutral-300">
        {session ? <AuthenticatedSidebar /> : <NotAuthenticatedSidebar />}
      </div>
    </div>
  );
};
