import NavigationTabs from "@/components/NavigationTabs";
import NewOffer from "@/components/widgets/NewOffer";
import OfferCard from "@/components/widgets/OfferCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/marketplace")({
  component: Marketplace,
});

function Marketplace() {
  return (
    <div className="container px-4">
      <NavigationTabs />

      <h1 className="text-green-500 text-lg mb-3 font-semibold mt-4">
        My Offers
      </h1>

      <div className="space-y-2">
        <OfferCard
          amount={400}
          price={2.1}
          status="open"
          offers={<NewOffer />}
        />
        <OfferCard amount={400} price={2.1} status="open" />
        <OfferCard amount={400} price={2.1} status="open" />
        <OfferCard amount={400} price={2.1} status="open" />
      </div>

      <h2 className="text-green-500 text-lg mb-3 font-semibold mt-4">
        Finalized Offers
      </h2>

      <div className="space-y-2">
        <OfferCard amount={400} price={2.1} status="sold" />
        <OfferCard amount={400} price={2.1} status="sold" />
        <OfferCard amount={400} price={2.1} status="sold" />
        <OfferCard amount={400} price={2.1} status="sold" />
      </div>
    </div>
  );
}
