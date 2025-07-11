import { Link } from 'react-router-dom'
import Logo from "../assets/logos/logo.webp";

export const Header = () => {
  return (
    <header className="pb-8">
      <Link to="/">
        <img 
          src={Logo} 
          alt="Logo"
          className="w-[88px] h-[44px] md:h-14 md:w-[104px] lg:h-16 lg:w-[112px] 
          xl:h-20 xl:w-[120px] object-contain"
        />  
      </Link> 
    </header>
  );
};
