import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { bannerCarousel } from "../utils/mocks";
import Cocacola from "../assets/images/cocacola.png";

export const BannerCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="h-[218px] rounded-2xl w-[100%]">
      <SwiperSlide key="extra-slide">
        <div className="grid grid-cols-2 h-[218px] rounded-2xl flex items-center"
          style={{background: "linear-gradient(324.58deg, #FDF0E6 15.81%, #D9F3FF 80.16%)"}}>
          <div className="flex justify-center">
            <img src={Cocacola} alt="" className="w-[38%] xl:w-[10%] rotate-[-11deg]" />
          </div>
          <div>
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
              className="w-full object-cover h-[218px] rounded-2xl"
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
};
