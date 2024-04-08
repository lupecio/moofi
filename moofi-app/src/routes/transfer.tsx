import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/transfer")({
  component: Transfer,
});

function Transfer() {
  const navigate = useNavigate();

  const navigateToReview = () => {
    navigate({ to: "/transfer-review" });
  };

  return (
    <div className="container px-4 h-full flex flex-col justify-between transfer-container">
      <div>
        <ArrowLeft
          size={24}
          color="#191B1E"
          className="mb-3"
          onClick={() => navigate({ to: "/" })}
        />
        <h1 className="text-3xl font-bold text-green-500 mb-4 font-grenete">
          Send Money
        </h1>

        <div className="bg-neutral-200 p-4 rounded-2xl mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h4 className="uppercase text-green-500 font-bold text-2xl">
                BRL
              </h4>
              <ChevronDownIcon color="#1D3630" size={20} />
            </div>

            <input className="w-full bg-transparent text-right outline-none font-bold text-2xl text-green-500" />
          </div>

          <p className="text-[#5E5D6C] text-sm">Balance: R$ 2.329,50</p>
        </div>

        <div className="p-4 rounded-2xl bg-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/pix.svg" />
            <h3 className="text-green-500 text-lg font-bold">PIX</h3>
          </div>

          <button className="px-4 flex items-center justify-center  h-10 rounded-full font-bold text-green-500 bg-green-400">
            Change
          </button>
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={navigateToReview}>
        Continue
      </Button>
    </div>
  );
}
