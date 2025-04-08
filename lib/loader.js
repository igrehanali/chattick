"use client";

import React, { useEffect } from "react";
import { tailspin } from "ldrs";

export default function Loader({
  size = 40,
  stroke = 5,
  speed = 0.9,
  color = "black",
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      tailspin.register();
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen p-40 m-40 bg-red-600">
      <l-tailspin size={size} stroke={stroke} speed={speed} color={color} />
    </div>
  );
}
