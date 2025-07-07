import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";

const ShopLayout = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-3 pb-40">
      <Header />
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default ShopLayout;
