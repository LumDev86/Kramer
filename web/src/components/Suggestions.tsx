import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Product } from "./cards/Product";
// import { Product as Loader } from "./loaders/Product";
import { suggestions } from "../utils/mocks";

export const Suggestions = () => {
  // const { data = [], isLoading, error } = ();

  // if (isLoading) return <Loader />;
  // if (error) return <p className="text-red-500">Error cargando la información</p>;

  return (
   <section>
      <h2 className="font-bold text-2xl pb-4">Recomendados</h2>
      <Swiper
        slidesPerView={2.3}
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper"
        breakpoints={{
          768: {
            slidesPerView: 2.8,
            spaceBetween: 20,
          },
          919: {
            slidesPerView: 3.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.8,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4.8,
            spaceBetween: 20,
          }
        }}>
        {
          suggestions.map(product => (
            <SwiperSlide key={product.id}>
              <Product product={product} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </section>
  );
};
