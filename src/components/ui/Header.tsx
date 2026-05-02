import { Link } from "react-router";
import { useSession } from "../../stores";
import { SignOutButton } from "./SignOutButton";

export const Header = () => {
  const session = useSession((s) => s.session);

  return (
    <div className="border-b sticky top-0 bg-blue-300">
      <div className="flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          Socially
        </Link>
        <div className="flex gap-10">
          <Link to="/">Home</Link>
          {session ? (
            <>
              <Link to="/notifications">Notifications</Link>
              <Link to={"/profile"}>Profile</Link>
              <SignOutButton />
            </>
          ) : (
            <Link to="/sign-in">Sign in</Link>
          )}
        </div>
      </div>
    </div>
  );
};
