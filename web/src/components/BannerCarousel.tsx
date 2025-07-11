import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { bannerCarousel } from "../utils/mocks";
import Cocacola from "../assets/images/cocacola.png";
import Star from "../assets/images/star.png";
import Ellipse from "../assets/images/ellipse.png";

export const BannerCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="h-[218px] md:h-[300px] lg:h-[400px] xl:h-[370px] rounded-2xl w-[100%]">
      <SwiperSlide key="extra-slide">
        <div className="grid grid-cols-2 h-[218px] md:h-[300px] lg:h-[400px] xl:h-[370px] rounded-2xl flex items-center"
          style={{background: "linear-gradient(324.58deg, #FDF0E6 15.81%, #D9F3FF 80.16%)"}}>
          <div className="relative flex justify-center">
            <img 
              src={Cocacola} 
              alt="Imagen Ilustrativa" 
              className="w-[38%] md:w-[18%] xl:w-[16%] rotate-[-11deg]" 
            />       
            <img
              src={Star}
              alt="Ilustración"
              className="absolute top-12 left-3 md:w-[30px] md:top-16 md:left-20 
              lg:top-[85px] lg:left-28 xl:top-[100px] xl:left-44"
            />
            <img
              src={Ellipse}
              alt="Ilustración"
              className="absolute top-16 -right-[13px] rotate-[8deg] md:w-[18%] md:top-20 md:right-[85px] 
              lg:top-[107px] lg:right-[120px] xl:top-[120px] xl:right-[155px]"
            />
            <img
              src={Ellipse}
              alt="Ilustración"
              className="absolute bottom-0 left-[6px] rotate-180 md:w-[18%] md:left-[110px] 
              lg:left-[147px] xl:left-[185px] "
            />
          </div>
          <div className="z-[1]">
            <h1 className="text-[#242424] font-bold text-[32px] leading-10">Ofertas de la semana</h1>
          </div>
        </div>
      </SwiperSlide>
      {
        bannerCarousel.map(src => (
          <SwiperSlide key={src.id}>
            <img
              src={src.img}
              alt={`Banner ${src.id}`}
              className="w-full object-cover h-[218px] md:h-[300px] 
              lg:h-[400px] xl:h-[370px] rounded-2xl"
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
};
