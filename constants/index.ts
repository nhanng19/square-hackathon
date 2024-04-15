import { BookOpenCheck, LayoutDashboard, Settings, CopyCheck, Blocks, Star, BadgePlus, LogOut, Video} from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },

  {
    title: "Sales Rooms",
    icon: Video,
    href: "/example",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Add Room",
        icon: BadgePlus,
        color: "text-red-500",
        href: "/rooms/add",
      },
      {
        title: "View Rooms",
        icon: Star,
        color: "text-red-500",
        href: "/rooms/view",
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
  "ITEMS_READ",
];

// const items = [
//   `John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet`,
//   `Mens Casual Slim Fit`,
//   `Mens Cotton Jacket`,
//   `Mens Casual Premium Slim Fit T-Shirts`,
//   `Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops`,
// ];
// let previousWindow = null;
// setTimeout(function () {
//   document.querySelectorAll("p").forEach((p) => {
//     const itemText = p.textContent.trim();
//     const includesItem = items.some((item) => itemText.includes(item));
//     if (includesItem) {
//       const productId = itemText.replace(/[^\w-]/g, "");
//       const badge = document.createElement("button");
//       badge.textContent = "LIVE";
//       badge.style.backgroundColor = "red";
//       badge.style.color = "white";
//       badge.style.padding = "4px 8px";
//       badge.style.borderRadius = "5px";
//       badge.style.marginLeft = "5px";
//       badge.style.textDecoration = "none";
//       badge.style.zIndex = "99";
//       badge.style.border = "none";
//       badge.style.cursor = "pointer";
//       badge.addEventListener("click", function (e) {
//         e.preventDefault();
//         if (previousWindow && !previousWindow.closed) {
//           previousWindow.close();
//         }
//         const newWindowFeatures = "width=500,height=1000,left=100,top=100";
//         previousWindow = window.open(
//           `http://localhost:3000/video/${productId}`,
//           "_blank",
//           newWindowFeatures
//         );
//       });
//       p.insertAdjacentElement("afterend", badge);
//     }
//   });
// }, 2000);