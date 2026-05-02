import { RecommendedUsers } from "./components/ui";
import { useSession } from "./stores";

const App = () => {
  const session = useSession((s) => s.session);

  return (
    <div className="lg:col-span-9">
      <div className="grid lg:grid-cols-9 gap-5">
        <div className="lg:col-span-6 border border-red-700">
          {session && <div className="p-6 m-6 border">add new Post..</div>}

          <div className="space-y-5 mb-5">
            <div>post1</div>
            <div>post2</div>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-3">
          <RecommendedUsers />
        </div>
      </div>
    </div>
  );
};

export default App;
