"use client";

import { Button } from "@/components/ui/button";
import BurgerMenu from "./BurgerMenu";
import Search from "./Search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShoppingCart,
  User,
  Globe,
  Settings,
  LogOut,
  Crown,
  Menu,
  X,
} from "lucide-react";
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
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Marketplace
              </span>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block w-[60%] items-center">
          <Search />
        </div>

        <div className="hidden lg:flex items-center gap-5 ">
          <div>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
              </Button>
            </Link>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Globe className="w-5 h-5 text-gray-500" />
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
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full hover:bg-gray-100"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session?.user?.image || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {session?.user?.name?.[0] ||
                            session?.user?.email?.[0] ||
                            "U"}
                        </AvatarFallback>
                      </Avatar>
                      {role === "ADMIN" && (
                        <Crown className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session?.user?.name || "Пользователь"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session?.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Профиль</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Настройки</span>
                      </Link>
                    </DropdownMenuItem>
                    {role === "ADMIN" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Crown className="mr-2 h-4 w-4" />
                          <span>Админ-панель</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Выйти</span>
                    </DropdownMenuItem>
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
