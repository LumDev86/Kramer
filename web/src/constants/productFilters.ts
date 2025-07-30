import { PriceRangeId } from "../interfaces/product";

export const priceRangesTags: {
  id: PriceRangeId;
  label: string;
  min: number;
  max: number;
}[] = [
  { id: "under50", label: "<$50", min: 0, max: 49 },
  { id: "between50-100", label: "$50-$100", min: 50, max: 100 },
  { id: "over100", label: ">$100", min: 101, max: Infinity },
];

export const priceRanges: Record<PriceRangeId, { min: number; max: number }> = {
  under50: { min: 0, max: 49 },
  "between50-100": { min: 50, max: 100 },
  over100: { min: 101, max: Infinity },
};

export const sortOptions = [
  { id: "bestsellers", label: "Más vendidos" },
  { id: "newest", label: "Nuevos productos" },
  { id: "promotions", label: "Promociones" },
];
