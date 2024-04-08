import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/Modal";
export const Route = createFileRoute("/transfer-review")({
  component: TransferReview,
});


function TransferReview() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const navigateToComplete = () => {
    setOpen(true);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        text="We're sending you $MILK..."
        redirectLink="/transfer-completed"
      />
      <div className="container px-4 h-full flex flex-col justify-between transfer-container">
        <div>
          <ArrowLeft
            size={24}
            color="#191B1E"
            className="mb-3"
            onClick={() => navigate({ to: "/transfer" })}
          />
          <h1 className="text-3xl font-bold text-green-500 mb-4 font-grenete">
            Review Transfer
          </h1>

          <div className="p-4 mb-4 rounded-2xl bg-white flex items-center justify-between">
            <span className="font-bold text-gray-400">Value</span>
            <span className="font-bold text-gray-400">R$ 2.000,00</span>
          </div>

          <div className="p-4 rounded-2xl bg-white space-y-6 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">To</span>
              <span className="text-[#0052FF] font-bold">Gustavo Marinho</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Chave PIX</span>
              <span className="text-gray-400">(11) 91234-5678</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">CPF</span>
              <span className="text-gray-400">012.345.678-90</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400">Bank</span>
              <span className="text-gray-400">NU PAGAMENTOS - IP</span>
            </div>
          </div>

          <div className="p-4 mb-4 rounded-2xl bg-white flex items-center justify-between">
            <span className=" text-gray-400">Estimated arrival</span>
            <span className=" text-gray-400">Today</span>
          </div>
        </div>

        <Button className="mb-6 w-full" size="lg" onClick={navigateToComplete}>
          Send Now
        </Button>
      </div>
    </>
  );
}
