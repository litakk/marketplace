"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import Logout from "../logout";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BurgerMenu: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu
          size={28}
          className="text-black md:w-[32px] md:h-[32px]"
        />
      </SheetTrigger>

      <SheetContent className="w-[70%] bg-white text-black flex flex-col justify-between px-6 py-10">
        <SheetHeader className="flex flex-col gap-8">
          <SheetTitle className="text-2xl font-bold uppercase tracking-widest">
            Settings
          </SheetTitle>

          <SheetDescription>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-white border border-black text-black hover:bg-black hover:text-white rounded-none px-4 py-2 uppercase tracking-wide">
                  Language
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center gap-2 justify-center text-sm uppercase tracking-wider">
                  RU
                  <img
                    src="/russia.png"
                    alt="language-russian"
                    className="w-[24px] h-[24px]"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 justify-center text-sm uppercase tracking-wider">
                  EN
                  <img
                    src="/usa.png"
                    alt="language-english"
                    className="w-[24px] h-[24px]"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SheetDescription>

          <SheetDescription className="text-lg uppercase tracking-wide hover:opacity-70 cursor-pointer">
            Contact Us
          </SheetDescription>
        </SheetHeader>

        <SheetDescription className="mt-auto">
          {!!session && (
            <div className="text-red-500 uppercase tracking-widest">
              <Logout />
            </div>
          )}
          {!session && (
            <Link href="/login">
              <Button className="w-full bg-black text-white rounded-none py-4 text-lg uppercase tracking-widest hover:bg-gray-900">
                Login
              </Button>
            </Link>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default BurgerMenu;
