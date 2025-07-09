import upload from "@middlewares/cloudinaryMulter";
import { ProductRepository } from "@/repositories/ProductRepository";
import { buildProductFilters, buildProductSort } from "@utils/productQueryFilter";

export class ProductService {

  async getAll(
    page: number = 1,
    limit: number = 10,
    sort?: string,
    brand?: string,
    promotion?: boolean,
    status?: string
  ) {
    const where = await buildProductFilters(brand, promotion, status);
    const order = buildProductSort(sort);

    const [products, total] = await ProductRepository.findAndCount({
      where,
      relations: ["category", "promotion"],
      skip: (page - 1) * limit,
      take: limit,
      order,
    });

    const sanitizedProducts = products.map(product => ({
      ...product,
      image: product.image ? `IMAGE_${product.id}` : null,
      promotion: product.promotion ?? undefined,
    }));

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      products: sanitizedProducts,
    };
  }

  async getById(id: string) {
    const product = await ProductRepository.findOne({ 
      where: { id }, 
      relations: ["category", "promotion"] 
    });

    if (!product) throw new Error("Producto no encontrado.");

    return {
      ...product,
      image: product.image ? `IMAGE_${product.id}` : null,
      promotion: product.promotion ?? undefined,
    };
  }
}



