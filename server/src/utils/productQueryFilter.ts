import { Not, IsNull } from "typeorm";

export async function buildProductFilters(
  brand?: string,
  promotion?: boolean,
  status?: string
) {
  const filters: any = {};

  if (brand) {
    filters.brand = brand;
  }

  if (promotion === true) {
    filters.promotion = { id: Not(IsNull()) };
  }

  if (status && ["active", "inactive"].includes(status)) {
    filters.status = status;
  }

  return filters;
}

// ↕️ Construir ordenamiento por precio
export function buildProductSort(sort?: string) {
  const order: Record<string, "ASC" | "DESC"> = {};
  if (sort === "price_asc") order["price"] = "ASC";
  if (sort === "price_desc") order["price"] = "DESC";
  return order;
}

