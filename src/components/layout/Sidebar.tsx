"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitCompare } from "lucide-react";
import { Shield } from "lucide-react";

import {
  Briefcase,
  PlusCircle,
  Target,
  User,
  LogOut,
  ChartCandlestick,
} from "lucide-react";

const links = [
  {
    title: "My Portfolios",
    href: "/portfolio",
    icon: Briefcase,
  },
  {
    title: "Create Portfolio",
    href: "/portfolio/create",
    icon: PlusCircle,
  },
  {
  title: "Funds",
  href: "/funds",
  icon: ChartCandlestick,
},
{
  title: "Compare",
  href: "/compare",
  icon: GitCompare,
},
  {
    title: "Goals",
    href: "/goals",
    icon: Target,
  },
  
  {
  title: "Optimizer",
  href: "/optimizer",
  icon: Shield,
},
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">

      <div className="border-b p-8">
        <h1 className="text-3xl font-bold text-blue-600">
          FundLens
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-5">

        {links.map((item) => {

          const Icon = item.icon;

          return (

            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname.startsWith(item.href)
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`}
            >

              <Icon size={20} />

              {item.title}

            </Link>

          );

        })}

      </nav>

      <div className="border-t p-5">

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-red-50 hover:text-red-600"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}