"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { IconType } from "react-icons";

import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { PiUserLight } from "react-icons/pi";

interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

const navItem: NavItem[] = [
  { label: "Home", href: "/", icon: GoHome },
  { label: "Shop", href: "/shop", icon: CiSearch },
  { label: "Cart", href: "/cart", icon: BsCart3 },
  { label: "Profile", href: "/profile", icon: PiUserLight },
];

const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-white flex h-[75px] justify-between border border-[#F0F5F5] border-t-[1px] pt-2 pb-3 p-4 md:justify-around lg:hidden z-50">
        {navItem.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link href={item.href} key={item.label}>
              <div className="flex flex-col items-center">
                <item.icon
                  className={`w-[30px] h-[30px] transition ${
                    isActive ? "text-black" : "text-slate-500"
                  }`}
                />
                <p
                  className={`transition mt-[4px] ${
                    isActive ? "text-black" : "text-slate-500"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navigation;
