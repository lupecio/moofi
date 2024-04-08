import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";

export const Route = createFileRoute("/create-token")({
  component: CreateToken,
});

function CreateToken() {
  const navigate = useNavigate();

  const navigateToComplete = () => navigate({ to: "/create-token-summary" });

  return (
    <div className="container px-4 h-full flex flex-col justify-between transfer-container">
      <div>
        <h1 className="text-3xl font-bold text-green-500 mb-4 font-grenete">
          Create Token
        </h1>
        <div className="flex flex-col items-center ">
          <div className="bg-neutral-200 p-4 rounded-2xl w-full">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-green-500 text-xl font-bold">Stored Milk</h2>
              <input className="w-full bg-transparent text-right outline-none font-bold text-xl text-green-500" />
            </div>

            <span className="text-sm text-gray-400">Balance: 880 Liters</span>
          </div>

          <div className="w-[34px] h-[34px] -my-3 z-10 bg-green-500 rounded-full flex items-center justify-center">
            <ArrowDown color="#C8F169" />
          </div>

          <div className="bg-neutral-200 p-4 rounded-2xl w-full">
            <div className="flex items-center justify-between pb-6">
              <h2 className="text-green-500 text-xl font-bold">$MILK</h2>
              <h2 className="text-green-500 text-xl font-bold text-right">
                400
              </h2>
            </div>
          </div>
        </div>
      </div>

      <Button className="w-full mb-6" size="lg" onClick={navigateToComplete}>
        Get $MILK
      </Button>
    </div>
  );
}
