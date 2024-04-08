import NavigationTabs from "@/components/NavigationTabs";
import AccountDetails from "@/components/widgets/AccountDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Account,
});

function Account() {
  return (
    <div className="container px-4 mt-4">
      <NavigationTabs />
      <div className="mt-4">
        <AccountDetails />
      </div>
    </div>
  );
}
