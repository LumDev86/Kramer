import { House, Search, ShoppingCart } from "lucide-react";

const footerNavItems = [
  { icon: House, path: "/" },
  { icon: Search, path: "/search" },
  { icon: ShoppingCart, path: "/cart", hasCounter: true },
];

export const navs = {
  footerNavItems,
};
