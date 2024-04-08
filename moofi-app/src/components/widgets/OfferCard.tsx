import { useMemo } from "react";

type OfferCardProps = {
  amount: number;
  price: number;
  status: "open" | "sold" | "expired";
  offers?: React.ReactNode;
};

export default function OfferCard({
  amount,
  price,
  status,
  offers,
}: OfferCardProps) {
  const renderStatus = useMemo(() => {
    switch (status) {
      case "open":
        return (
          <p className="text-[#737A86] flex items-center text-sm">
            <img src="/outline-clock.svg" className="size-3 mr-2" />
            Ends in 31:48:59
          </p>
        );
      case "sold":
        return (
          <p className="text-[#737A86] flex items-center text-sm">
            <img src="/outline-check.svg" className="size-3 mr-2" />
            Sold
          </p>
        );
      default:
        return (
          <p className="text-[#737A86] flex items-center text-sm">
            <img src="/outline-expired.svg" className="size-3 mr-2" />
            Expired
          </p>
        );
    }
  }, [status]);

  return (
    <div className="p-4 rounded-2xl bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/offer.svg" className="size-10" />

          <div>
            <h2 className="text-green-500 font-medium text-lg mb-[2px]">
              MILK BRL
            </h2>
            {renderStatus}
          </div>
        </div>

        <div>
          <h2 className="text-green-500 font-medium text-lg mb-[2px]">
            {amount} Liters
          </h2>
          <p className="text-sm text-[#737A86] font-medium text-right">
            R$ {price}
          </p>
        </div>
      </div>

      {offers && <div className="mt-4">{offers}</div>}
    </div>
  );
}
