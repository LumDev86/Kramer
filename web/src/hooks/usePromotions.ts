import { useEffect, useState } from "react";
import { getAllPromotions } from "../services/getAllPromotions";
import { ProductWithDetails } from "../interfaces/product";

export const usePromotions = () => {
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

  return { promotions };
};
