import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Product } from "./cards/Product";
import { usePromotions } from "../hooks/usePromotions";

export const Promotions = () => {
  const { promotions } = usePromotions();

  return (
    <section>
      <h2 className="font-bold text-2xl pb-4">Promociones</h2>
      <Swiper
        slidesPerView={2.3}
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper"
        breakpoints={{
          768: {
            slidesPerView: 4.8,
            spaceBetween: 25,
          },
          919: {
            slidesPerView: 5.5,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 5.3,
            spaceBetween: 25,
          },
          1200: {
            slidesPerView: 6.5,
            spaceBetween: 25,
          },
        }}
      >
        {promotions.map((product) => (
          <SwiperSlide key={product.id}>
            <Product product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
