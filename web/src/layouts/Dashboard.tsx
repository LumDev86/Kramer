import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/logos/logo.webp";
import { LayoutDashboard, Package, BadgePercent } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-screen max-w-7xl mx-auto bg-[#F9FAFB]">
      <div className="w-[240px] flex flex-col items-center justify-between min-h-screen p-4 border-r border-[#0000004D]">
        <div className="w-[167px] h-[84px]">
          <img
            src={Logo}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <nav className="w-full flex flex-col gap-y-[10px]">
          <button onClick={() => navigate("/admin/dashboard")} className="rounded-md p-2 flex items-center gap-[10px] hover:bg-[#6EC3F666]">
            <LayoutDashboard fill="#242424" />
            <span className="text-lg">Dashboard</span>
          </button>
          <button onClick={() => navigate("/admin/products")} className="rounded-md p-2 flex items-center gap-[10px] hover:bg-[#6EC3F666]">
            <Package fill="#FDFBFF" />
            <span className="text-lg">Productos</span>
          </button>
          <button onClick={() => navigate("/admin/promotions")} className="rounded-md p-2 flex items-center gap-[10px] hover:bg-[#6EC3F666]">
            <BadgePercent fill="#FDFBFF" />
            <span className="text-lg">Promociones</span>
          </button>
        </nav>
        <div>
          <p>PROFILE DEL USUARIO</p>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  )
}
