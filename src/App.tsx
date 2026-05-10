import { Feed } from "./components/feed";
import { RecommendedUsers } from "./components/ui";

const App = () => {
  return (
    <div className="lg:col-span-9">
      <div className="grid gap-5 lg:grid-cols-9">
        <div className="lg:col-span-6">
          <Feed />
        </div>

        <div className="hidden lg:block lg:col-span-3">
          <RecommendedUsers />
        </div>
      </div>
    </div>
  );
};

export default App;
