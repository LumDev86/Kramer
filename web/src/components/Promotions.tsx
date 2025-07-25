import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Product } from "./cards/Product";
import { usePromotions } from "../hooks/usePromotions";
import { Product as Loader } from "./loaders/Product";

export const Promotions = () => {
  const { data: promotions, isLoading, isError } = usePromotions();

  if (isLoading)
    return (
      <section>
        <h2 className="font-bold text-2xl pb-4">Promociones</h2>
        <main className="flex overflow-x-hidden">
          <article className="min-w-72">
            <Loader />
          </article>
          <article className="min-w-72">
            <Loader />
          </article>
        </main>
      </section>
    );

  if (isError) {
    return (
      <section>
        <h2 className="font-bold text-2xl pb-4">Promociones</h2>
        <article className="flex justify-center items-center h-32">
          <p className="text-red-500">Error al cargar promociones.</p>
        </article>
      </section>
    );
  }

  if (!promotions) {
    return (
      <section>
        <h2 className="font-bold text-2xl pb-4">Promociones</h2>
        <article className="flex justify-center items-center h-32">
          <p>No hay promociones disponibles.</p>
        </article>
      </section>
    );
  }

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
        {promotions.map((promotion) =>
          promotion.products.map((product) => (
            <SwiperSlide key={product.id}>
              <Product product={{ ...product }} promotion={promotion} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
};
