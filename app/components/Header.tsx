"use client";

import { Button } from "@/components/ui/button";
import BurgerMenu from "./BurgerMenu";
import Search from "./Search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsCart3 } from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSession } from "next-auth/react";

// import SwitchTheme from "./SwitchTheme";

import Link from "next/link";

interface Props {}

const Header: React.FC<Props> = () => {
  const { data: session } = useSession();
  const role = session?.user.role;

  return (
    <>
      <header className="flex w-full h-[75px] justify-between items-center pt-2 pr-2 pl-2 md:px-3 lg:px-5 xl:px-7">
        <div className="flex">
          <div className="flex items-center">
            <Link href={"/"}>
              <img
                src="/logo7.svg"
                alt="logo"
                className="w-[55px] h-auto object-contain md:w-[100px] dark:bg-white"
              />
            </Link>
          </div>
        </div>
        <div className="hidden lg:block w-[60%] items-center">
          <Search />
        </div>

        <div className="hidden lg:flex items-center gap-5 ">
          <div>
            <Link href={"/cart"}>
              <Button className="bg-[#F5F2F0] hover:bg-[#ebe6e3] w-[52px] h-[48px] cursor-pointer">
                <BsCart3 className="text-black w-[20px] h-[20px]" />
              </Button>
            </Link>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#F5F2F0] hover:bg-[#ebe6e3] h-[48px] cursor-pointer">
                  <img
                    src="/language.png"
                    alt="language-logo"
                    className="w-[20px] h-[20px]"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer justify-center">
                  <p>RU</p>
                  <img
                    src="/russia.png"
                    alt="language-russian"
                    className="w-[30px] h-[30px]"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer justify-center">
                  <p>EN</p>
                  <img
                    src="/usa.png"
                    alt="language-english"
                    className="w-[30px] h-[30px]"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className="justify-center cursor-pointer">
                  Other
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* 
          <div>
            <SwitchTheme />
          </div> */}

          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-[52px] h-[48px] flex items-center cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/profile"}>Settings</Link>
                </DropdownMenuItem>

                {role === "ADMIN" && (
                  <DropdownMenuItem>
                    <Link href={"/admin"}>Admin-Panel</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="lg:hidden">
          <BurgerMenu />
        </div>
      </header>
    </>
  );
};

export default Header;
