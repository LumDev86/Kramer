import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import golosinasImage from '../assets/images/chuches.png';
import kioscoImage from '../assets/images/kiosco-casa.png'

const images = [
  golosinasImage,
  kioscoImage,
  "/images/banner3.jpg",
];

export const Header = () => {
  return (
    <header className="w-full relative">
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {images.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className="w-full h-40 object-cover" />
          </div>
        ))}
      </Carousel>
    </header>
  );
};
