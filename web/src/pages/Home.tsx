import { Header } from "../components/Header";
import { Categories } from "../components/Categories";

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <Categories />
    </div>
  );
};

export default Home;
