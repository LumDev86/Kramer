import { Outlet, useNavigate } from "react-router-dom";
import { navs } from "../utils/navs";

const ShopLayout = () => {
  const navigate = useNavigate();
  const handleNavegation = (selectPage: string) => navigate(selectPage);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-2 md:px-4 py-2 pb-40">
      <Outlet />
      <footer className="fixed bottom-2 left-1/2 -translate-x-1/2 w-full max-w-7xl px-2 md:px-4">
        <div className="p-[6px] bg-gradient-to-b from-[#D9F3FF] to-[#FDF0E6] rounded-3xl">
          <div className="bg-[#FDFBFF] rounded-3xl py-4 px-8 flex justify-between">
            {
              navs.footerNavItems.map(({ icon: Icon, path }) => (
                <div
                  key={path}
                  onClick={() => handleNavegation(path)}
                  className="cursor-pointer p-1.5 rounded-md inline-flex">
                  <Icon size={32} color="#242424" />
                </div>
              ))
            }
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopLayout;
