import { BookOpenCheck, LayoutDashboard, Settings, CopyCheck, Blocks, Star, BadgePlus, LogOut} from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },

  {
    title: "Notifications",
    icon: CopyCheck,
    href: "/example",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Add notifications",
        icon: BadgePlus,
        color: "text-red-500",
        href: "/notifications/add",
      },
      {
        title: "Your notifications",
        icon: Star,
        color: "text-red-500",
        href: "/notifications/yours",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-sky-500",
  },
  {
    title: "Integrations",
    icon: Blocks,
    href: "/integrations",
    color: "text-sky-500",
  },
  {
    title: "Log out",
    icon: LogOut,
    href: "/api/users/logout",
    color: "texst-sky-500",
  },
];

export const SCOPES = [
  "MERCHANT_PROFILE_READ",
  "ORDERS_READ",
  "ONLINE_STORE_SITE_READ",
];