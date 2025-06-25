import { Outlet, useNavigate } from "react-router-dom";
import { House, Search, ShoppingCart } from 'lucide-react';

export default function ShopLayout() {
  const navigate = useNavigate();

  const navItems = [
    { icon: House, path: '/' },
    { icon: Search, path: '/search' },
    { icon: ShoppingCart, path: '/cart' },
  ];

  const handleNavegation = (selectPage: string) => {
    navigate(selectPage);
  };

  return (
    <section className="flex flex-col min-h-screen max-w-7xl mx-auto bg-[#FDFBFF] px-4">
      <div className="mb-40">
        <Outlet />
      </div>
      <footer className="py-8 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4">
        <section className="p-[6px] bg-gradient-to-b from-[#D9F3FF] to-[#FDF0E6] rounded-3xl">
          <div className="bg-[#FDFBFF] rounded-3xl py-4 px-8 flex justify-between">
            {navItems.map(({ icon: Icon, path }) => (
              <div
                key={path}
                onClick={() => handleNavegation(path)}
                className="cursor-pointer p-1.5 rounded-md inline-flex"
              >
                <Icon size={32} color="#242424" />
              </div>
            ))}
          </div>
        </section>
      </footer>
    </section>
  );
}
