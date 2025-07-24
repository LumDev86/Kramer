import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Product } from "./cards/Product";
import { getAllPromotions } from "../services/getAllPromotions";
import { useEffect, useState } from "react";
import { Product as ProductProps } from "../interfaces/product";
import { Category } from "../interfaces/category";

export interface PromotionData {
  percent?: number;
  amount?: number;
  freeShipping?: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: string;
  data: PromotionData;
}

export interface ProductWithDetails extends ProductProps {
  imagePublicId?: string | null;
  category?: Category;
  promotion?: Promotion;
}

export const Promotions = () => {
  const [promotions, setPromotions] = useState<ProductWithDetails[]>([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getAllPromotions();

        setPromotions(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchPromotions();
  }, []);

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
