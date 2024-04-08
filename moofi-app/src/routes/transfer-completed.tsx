import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, DownloadIcon, X } from "lucide-react";

export const Route = createFileRoute("/transfer-completed")({
  component: OrderCompleted,
});

function OrderCompleted() {
  const navigate = useNavigate();

  return (
    <div className="container px-4">
      <X
        className="mb-4"
        color="#191B1E"
        size={24}
        onClick={() => navigate({ to: "/" })}
      />
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold font-grenete text-[#191B1E] text-3xl mb-1">
            -R$ 2.000,00
          </h1>
          <h2 className="font-bold text-[#0052FF] mb-1">To Gustavo Marinho</h2>
          <span className="text-gray-400 text-sm">Moments ago</span>
        </div>

        <img src="/brl-transfer.svg" className="w-[58px] h-[58px]" />
      </div>

      <Button
        className="mt-4 mb-6 text-md"
        onClick={() => navigate({ to: "/transfer" })}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="mr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.08564 6.67432L2.47122 6.67432C1.9262 6.67432 1.48438 7.11614 1.48438 7.66116L1.48438 8.18748C1.48438 8.73249 1.9262 9.17432 2.47122 9.17432L8.08564 9.17432L8.08564 11.4241C8.08564 12.2838 9.10853 12.7324 9.74096 12.1501L14.104 8.13238C14.3225 7.93118 14.315 7.58395 14.088 7.39236L9.70903 3.69601C9.06744 3.15443 8.08564 3.6105 8.08564 4.45011L8.08564 6.67432Z"
            fill="#C8F169"
          />
        </svg>
        Send Again
      </Button>

      <div className="p-4 rounded-2xl bg-white space-y-6 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Value</span>
          <span className="text-gray-400 font-bold">R$ 2.000,00</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Transfer Type</span>
          <span className="text-gray-400">PIX</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white space-y-6 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Name</span>
          <span className="text-gray-400">Gustavo Marinho</span>
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

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Agency</span>
          <span className="text-gray-400">0001</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white mb-4 flex items-center justify-between">
        <span className="text-gray-400">Confirmation</span>
        <span className="font-bold text-[#0052FF] flex items-center gap-2">
          <DownloadIcon size={16} color="#0052FF" />
          Download
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-white mb-4 flex items-center justify-between">
        <span className="text-gray-400">Report an issue</span>
        <ChevronRightIcon color="#5E5D6C" size={16} />
      </div>
    </div>
  );
}
