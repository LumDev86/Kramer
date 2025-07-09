import upload from "@middlewares/cloudinaryMulter";
import { ProductRepository } from "@/repositories/ProductRepository";
import { buildProductFilters, buildProductSort } from "@utils/productQueryFilter";
import { RequestHandler } from "express";

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

  /*async update(id: string, data: Partial<ProductDto>, file?: Express.Multer.File) {
    const product = await ProductRepository.findOne({ where: { id } });
    if (!product) throw new Error("Producto no encontrado.");

     let imageUrl = product.image;
    let publicId = product.imagePublicId;

    if (file) {
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("Error al eliminar la imagen anterior de Cloudinary:", err);
        }
      }

      imageUrl = file.path;
      publicId = file.filename;
    } else if (data.image) {
      if (!validator.isURL(data.image)) throw new Error("URL de imagen inválida.");
      imageUrl = data.image;
      publicId = undefined; 
    }

    await ProductRepository.update(id, { 
      ...data, 
      image: imageUrl,
      imagePublicId: publicId,
    });

    const updatedProduct = await ProductRepository.findOne({ 
      where: { id }, 
      relations: ["category", "promotion"] 
    });

    if (!updatedProduct) throw new Error("Error al obtener el producto actualizado.");

    return {
      ...updatedProduct,
      image: updatedProduct.image ? `IMAGE_${updatedProduct.id}` : null,
      promotion: updatedProduct.promotion ?? undefined,
    };
  }
  */


}



