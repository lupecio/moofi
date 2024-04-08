import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, ArrowUpIcon, Clock, MoveRight, Plus } from "lucide-react";
import { useState } from "react";

export default function AccountDetails() {
  const [selectedCurrency, setSelectedCurrency] = useState("solana");
  const navigate = useNavigate();

  const navigateToTransfer = () => {
    navigate({ to: "/transfer" });
  };

  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-green-500 font-grenete">
            {selectedCurrency === "solana" ? "3.25" : "R$ 2000,00"}
          </h1>

          <button
            onClick={() =>
              setSelectedCurrency(
                selectedCurrency === "solana" ? "brl" : "solana"
              )
            }
            className="size-6 flex items-center justify-center rounded-full bg-green-400"
          >
            <ChevronDown size={16} color="#043F2E" />
          </button>
        </div>

        <img
          src={selectedCurrency === "solana" ? "/solana.svg" : "/brl.svg"}
          className="size-10"
        />
      </div>
      <span className="text-[#5E5D6C]">
        {selectedCurrency === "solana" ? "Solana" : "Reais"}
      </span>

      <div className="flex justify-around w-full mb-4 mt-6">
        <button
          className="flex flex-col items-center "
          onClick={navigateToTransfer}
        >
          <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center bg-green-400 mb-2">
            <ArrowUpIcon size={16} color="#1D3630" />
          </div>
          <span className="font-semibold text-green-500">Send</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center bg-green-400 mb-2">
            <img src="/outline-exchange.svg" />
          </div>
          <span className="font-semibold text-green-500">Exchange</span>
        </button>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4 text-green-500">
          Last Transactions
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-400 rounded-full size-10 flex items-center justify-center">
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 7H15M15 7L8 1M15 7L8 13"
                    stroke="#1D3630"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-green-500 font-semibold mb-1">
                  Transfer sent
                </h3>
                <p className="text-sm text-gray-400">Today, 14:19</p>
              </div>
            </div>

            <span className="text-green-500">-R$ 2.000</span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-400 rounded-full size-10 flex items-center justify-center">
                <Plus color="#1D3630" size={24} />
              </div>

              <div>
                <h3 className="text-green-500 font-semibold mb-1">Milk sold</h3>
                <p className="text-sm text-gray-400">03/20/2024, 11:20</p>
              </div>
            </div>

            <span className="text-green-500">+R$ 1.000</span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-400 rounded-full size-10 flex items-center justify-center">
                <Plus color="#1D3630" size={24} />
              </div>

              <div>
                <h3 className="text-green-500 font-semibold mb-1">Milk sold</h3>
                <p className="text-sm text-gray-400">03/19/2024, 12:05</p>
              </div>
            </div>

            <span className="text-green-500">+R$ 2.000</span>
          </div>
        </div>
        {/* <p className="text-[#5E5D6C] flex items-center">
          <Clock size={24} color="#5E5D6C" className="mr-2" />
          No transactions yet
        </p> */}
      </div>
    </div>
  );
}
