import { Link } from "react-router";
import { useSession } from "../../stores";
import { SignOutButton } from "./SignOutButton";

export const Header = () => {
  const session = useSession((s) => s.session);

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-5 py-3">
        <Link to="/" className="text-xl font-bold text-neutral-100">
          Socially
        </Link>
        <nav className="flex items-center gap-8 text-sm text-neutral-300">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          {session ? (
            <>
              <Link to="/notifications" className="hover:text-white">
                Notifications
              </Link>
              <Link to="/profile" className="hover:text-white">
                Profile
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link to="/sign-in" className="hover:text-white">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
