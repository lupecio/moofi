import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, DownloadIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/create-order")({
  component: CreateOrder,
});

function CreateOrder() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  return (
    <div className="container h-full flex flex-col justify-between transfer-container">
      <div>
        <ArrowLeft
          size={24}
          color="#191B1E"
          className="mb-3"
          onClick={() => navigate({ to: "/" })}
        />
        <h1 className="text-3xl font-bold text-green-500 mb-4 font-grenete">
          Create Order
        </h1>

        <div className="space-y-4">
          <div>
            <Input
              label="Token quantity"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <p className="px-4 text-gray-400 text-sm mt-1">
              Balance: 640 $MILK
            </p>
          </div>

          <Input
            label="Price"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">24 hours</SelectItem>
              <SelectItem value="USER">48 hours</SelectItem>
              <SelectItem value="MODERATOR">72 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <h3 className="text-lg text-green-500 mb-2 font-bold mt-6">
          Milk Quality
        </h3>
        <p className="text-gray-400 mb-4">
          Our hardware provides data on the quality of your stored milk to you
          and buyers.
        </p>
        <div className="bg-white p-4 rounded-2xl space-y-6">
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span>CSS</span>
            <span>200</span>
          </div>

          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span>Protein</span>
            <span>3,14</span>
          </div>

          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span>Fat</span>
            <span>3,89</span>
          </div>

          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span>Statement</span>
            <span className="font-bold text-[#0052FF] flex items-center gap-2">
              <DownloadIcon size={16} color="#0052FF" />
              Download
            </span>
          </div>
        </div>
      </div>

      <Button className="w-full mb-6" size="lg">
        Create Offer
      </Button>
    </div>
  );
}
