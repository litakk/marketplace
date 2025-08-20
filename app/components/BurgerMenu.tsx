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
// import SwitchTheme from "./SwitchTheme";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BurgerMenu: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <RxHamburgerMenu size={25} className="md:w-[30px] md:h-[30px]" />
        </SheetTrigger>
        <SheetContent className="w-[70%]">
          <SheetHeader className="relative flex flex-col gap-5">
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>
              {/* <SwitchTheme /> */}
            </SheetDescription>
            <SheetDescription>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-[#F5F2F0] hover:bg-[#ebe6e3]">
                    <img
                      src="/language.png"
                      alt="/language-logo"
                      className="w-[20px] h-[20px]"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex justify-center">
                    <p>RU</p>
                    <img
                      src="/russia.png"
                      alt="language-russian"
                      className="w-[30px] h-[30px]"
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex justify-center">
                    <p>EN</p>
                    <img
                      src="usa.png"
                      alt="language-english"
                      className="w-[30px] h-[30px]"
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="justify-center">
                    Other
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SheetDescription>
            <SheetDescription>Contact US</SheetDescription>
            <SheetDescription className="text-red-500 fixed bottom-10">
              {!!session && <Logout />}
              {!session && (
                <Link href="/login">
                  <Button className="hover:cursor-pointer bg-green-500 text-black">
                    Login
                  </Button>
                </Link>
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BurgerMenu;
