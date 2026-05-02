import { createBrowserRouter } from "react-router";
import App from "./App";
import { Layout, ProtectRoute } from "./components/layout";
import { Notifications, SignIn, SignUp } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        Component: ProtectRoute,
        children: [
          {
            path: "notifications",
            Component: Notifications,
          },
        ],
      },
    ],
  },
  {
    path: "/sign-in",
    Component: SignIn,
  },
  {
    path: "/sign-up",
    Component: SignUp,
  },
]);

export default router;
