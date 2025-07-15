import { useNavigate, useLocation } from "react-router-dom";
import { navs } from "../utils/navs";
import { useCart } from "../hooks/useCart";

export const BottomNav = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const location = useLocation();
  const activePath = location.pathname;
  const handleNavegation = (selectPage: string) => navigate(selectPage);
  
  return (
    <nav className="fixed z-50 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 pb-2 bg-[#FDFBFF]">
      <div className="p-[5px] bg-gradient-to-b from-[#D9F3FF] to-[#FDF0E6] rounded-[21px]">
        <div className="bg-[#FDFBFF] rounded-[21px] flex justify-between py-4 px-6">
          {
            navs.footerNavItems.map(({ icon: Icon, path, hasCounter }) => (
              <button
                key={path}
                type="button"
                onClick={() => handleNavegation(path)}
                className={`relative cursor-pointer rounded-[10px] p-2 inline-flex
                ${path === activePath ? "border border-[#242424]" : ""}`}>
                <Icon size={20} />
                {
                  hasCounter && cart.length > 0 && (
                    <span className="bg-[#242424] text-[#FDFBFF] text-xs absolute rounded-full
                      h-[23px] w-[23px] flex justify-center items-center top-[-10px] right-[-10px]">
                      {cart.length}
                    </span>
                  )
                }
              </button>
            ))
          }
        </div>
      </div>
    </nav>
  );
};
