import React from "react";
import { Button } from "../ui/button";

export default function NewOffer() {
  return (
    <div className="p-4 bg-green-400 rounded-2xl">
      <h2 className="font-bold text-lg text-green-500">You have a new offer</h2>
      <p className="text-sm text-green-500 mb-2">
        Someone made an offer on your $MILK!
      </p>

      <div className="p-4 rounded-2xl bg-white space-y-4">
        <div className="flex items-center justify-between text-green-500 text-sm ">
          <span className="font-bold">Price</span>
          <span>R$ 2.05</span>
        </div>

        <div className="flex items-center justify-between text-green-500 text-sm ">
          <span className="font-bold">Expiration</span>
          <span>In 4 hours</span>
        </div>

        <div className="flex items-center justify-between text-green-500 text-sm ">
          <span className="font-bold">Distance</span>
          <span>8 km</span>
        </div>

        <div className="flex items-center justify-between text-green-500 text-sm ">
          <span className="font-bold">Total Price</span>
          <span>R$ 820,00</span>
        </div>
      </div>

      <Button className="w-full bg-green-300 text-green-500 mt-4">
        Accept Offer
      </Button>
    </div>
  );
}
