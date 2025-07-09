import { useNavigate } from "react-router-dom";
import { BannerCarousel } from "../components/BannerCarousel";
import { SearchInput } from "../components/SearchInput";
import { Categories } from "../components/Categories";
import { Promotions } from "../components/Promotions";

const Home = () => {
  const navigate = useNavigate();

   const handleSearch = (value: string) => {
    if (value.trim() !== "") {
      navigate(`/categoria/${value.trim()}`); // ejemplo prueba
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <BannerCarousel />
      <SearchInput 
        placeholder="¿Qué estás buscando?"
        onSearch={handleSearch}
      />
      <Categories />
      <Promotions />
    </div>
  );
};

export default Home;
