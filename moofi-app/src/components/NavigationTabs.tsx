import { Link } from "@tanstack/react-router";

export default function NavigationTabs() {
  return (
    <div className="flex overflow-auto">
      <Link
        to="/"
        className="px-4 py-2 rounded-full  "
        activeProps={{
          className: "bg-[#EEF2E3] text-[#1D3630] font-bold",
        }}
      >
        Account
      </Link>

      <Link
        to="/production"
        className="px-4 py-2 rounded-full "
        activeProps={{
          className: "bg-[#EEF2E3] text-[#1D3630] font-bold",
        }}
      >
        Production
      </Link>

      <Link
        to="/marketplace"
        className="px-4 py-2 rounded-full "
        activeProps={{
          className: "bg-[#EEF2E3] text-[#1D3630] font-bold",
        }}
      >
        Marketplace
      </Link>
    </div>
  );
}
