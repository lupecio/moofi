import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, ChevronRightIcon, X } from "lucide-react";

export const Route = createFileRoute("/create-token-summary")({
  component: CreateTokenSummary,
});

function CreateTokenSummary() {
  const navigate = useNavigate();

  return (
    <div className="container px-4">
      <X
        onClick={() => navigate({ to: "/" })}
        className="mb-4"
        color="#191B1E"
        size={24}
      />

      <div className="flex justify-between mb-4">
        <div>
          <h1 className="text-green-500 text-3xl font-bold mb-1">+400 $MILK</h1>
          <p className="text-sm text-gray-400">Moments ago</p>
        </div>

        <img src="/token-generation.svg" className="size-[58px]" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Button
          onClick={() => navigate({ to: "/create-token" })}
          className=" h-10 font-bold text-green-300"
        >
          <Plus size={16} className="text-green-300 mr-2" />
          Create again
        </Button>

        <Button className="text-green-500 bg-green-400 h-10 font-bold">
          <img src="/outline-union.svg" className="size-4 mr-2" />
          Create offer
        </Button>
      </div>

      <div className="p-4 rounded-2xl bg-white space-y-6 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Stored Milk</span>
          <span className="text-gray-400">400 Liters</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Receive</span>
          <span className="text-gray-400">400 $MILK</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Fees</span>
          <span className="text-gray-400">No fees</span>
        </div>
      </div>

      <div className="p-4 mb-4 rounded-2xl bg-white flex items-center justify-between">
        <span className=" text-gray-400">Confirmation</span>
        <span className=" text-[#0052FF] font-semibold">View transaction</span>
      </div>

      <div className="p-4 rounded-2xl bg-white mb-4 flex items-center justify-between">
        <span className="text-gray-400">Report an issue</span>
        <ChevronRightIcon color="#5E5D6C" size={16} />
      </div>
    </div>
  );
}
