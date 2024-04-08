import NavigationTabs from "@/components/NavigationTabs";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/production")({
  component: Production,
});

function Production() {
  const navigate = useNavigate();
  return (
    <div className="container px-4">
      <NavigationTabs />
      <div className="grid grid-cols-2 gap-2 mb-4 mt-4">
        <div className="rounded-2xl bg-white p-4">
          <img src="/storage-milk.svg" className="size-10 mb-10" />

          <div>
            <h1 className="text-green-500 font-bold text-xl font-grenete">
              Stored Milk
            </h1>
            <span className="text-gray-400">Updated</span>

            <h4 className="text-bold text-green-500 text-lg font-bold">
              880 Liters
            </h4>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <img src="/milk.svg" className="size-10 mb-10" />

          <div>
            <h1 className="text-green-500 font-bold text-xl font-grenete">
              $MILK
            </h1>
            <span className="text-gray-400">Available for sale</span>

            <h4 className="text-bold text-green-500 font-bold text-lg">
              640 MILK
            </h4>
          </div>
        </div>
      </div>

      <Link
        to="/create-token"
        className="flex w-full items-center mb-2 gap-2 p-4 rounded-2xl text-green-500 bg-white font-bold"
      >
        <div className="size-10 flex items-center justify-center bg-green-400 rounded-full">
          <img src="/outline-coins.svg" className="size-6" />
        </div>
        Tokenize Production
      </Link>

      <Link
        to="/create-token"
        className="flex w-full items-center gap-2 p-4 rounded-2xl text-green-500 bg-white font-bold"
      >
        <div className="size-10 flex items-center justify-center bg-green-400 rounded-full">
          <img src="/outline-union.svg" className="w-4" />
        </div>
        Create Offer
      </Link>
    </div>
  );
}
