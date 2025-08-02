import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Category } from "./cards/Category";
import { Category as Loader } from "./loaders/Category";
import { useCategories } from "../hooks/useCategories";

export const Categories = () => {
  const { data = [], isLoading, error } = useCategories();

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">Error al obtener las categorias</p>;

  return (
    <section>
      <h2 className="font-bold text-2xl pb-4">Categorías</h2>
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
          }
        }}>
        {
          data.length === 0 ? (
            <p>No hay categorías para mostrar</p>
          ) : (
            data.map((category) => (
              <SwiperSlide key={category.id}>
                <Category category={category} />
              </SwiperSlide>
            ))
          )
        }
      </Swiper>
    </section>
  );
};
