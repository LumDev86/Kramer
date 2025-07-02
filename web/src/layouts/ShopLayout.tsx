import { Outlet, useNavigate } from "react-router-dom";
import { navs } from "../utils/navs";
import { useCart } from "../hooks/useCart";

const ShopLayout = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const handleNavegation = (selectPage: string) => navigate(selectPage);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-2 md:px-4 py-2 pb-40">
      <Outlet />
      <footer className="fixed bottom-2 left-1/2 -translate-x-1/2 w-full max-w-7xl px-2 md:px-4">
        <div className="p-[6px] bg-gradient-to-b from-[#D9F3FF] to-[#FDF0E6] rounded-3xl">
          <div className="bg-[#FDFBFF] rounded-3xl py-4 px-8 flex justify-between">
            {
              navs.footerNavItems.map(({ icon: Icon, path, hasCounter }) => (
                <div
                  key={path}
                  onClick={() => handleNavegation(path)}
                  className="relative cursor-pointer p-1.5 rounded-md inline-flex">
                  <Icon size={32} color="#242424" />
                  {
                    hasCounter && cart.length > 0 && (
                      <span
                        className="absolute -top-4 right-0 text-lg font-extrabold"
                        style={{
                        WebkitTextStroke: "1.5px #242424",
                        WebkitTextFillColor: "#F6C06E"}}>
                        {cart.length}
                      </span>
                    )
                  }
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
