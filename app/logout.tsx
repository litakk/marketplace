"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <Button className="bg-red-500 text-black">
      <span
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </span>
    </Button>
  );
}
