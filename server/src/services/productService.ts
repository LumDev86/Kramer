// ⚠️ COMENTARIO IMPORTANTE PARA EL EQUIPO:
// considerar si la sanitizacion es necesaria en este caso ya que podria no encontrar la ruta de la imagen.
import upload from "../middleware/validateImageProduct";
import validator from "validator";
import fs from "fs/promises";
import path from "path";
import { ProductDto } from "../dto/ProductDto";
import { ProductRepository } from "../repositories/ProductRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { PromotionRepository } from "../repositories/PromotionRepository";
import { buildProductFilters, buildProductSort } from "../utils/productQueryFilter";
import { RequestHandler } from "express";

export class ProductService {

  static uploadImage = upload.single("image") as RequestHandler;

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

  async create(data: ProductDto, file?: Express.Multer.File) {
    const category = await CategoryRepository.findOne({ where: { name: data.category as unknown as string } });
    const promotion = data.promotionId ? await PromotionRepository.findOne({ where: { id: data.promotionId } }) : undefined;

    if (!category) throw new Error("La categoría especificada no existe.");


    let imagePath: string | undefined;
    if (file) {
      imagePath = `/images/${file.filename}`;
    } else if (data.image) {
      if (!validator.isURL(data.image)) {
        throw new Error("URL de imagen inválida.");
      }
      imagePath = data.image;
    }

    data.image = imagePath;

    const product = ProductRepository.create({ 
      ...data, 
      category,
      promotion : undefined
    });

    return await ProductRepository.save(product);
  }

  async update(id: string, data: Partial<ProductDto>, file?: Express.Multer.File) {
    const product = await ProductRepository.findOne({ where: { id } });
    if (!product) throw new Error("Producto no encontrado.");

    let imagePath: string | undefined = product.image;
    if (file) {
      imagePath = `/images/${file.filename}`;
      if (product.image && product.image.startsWith("/images/")) {
        const oldImagePath = path.join(__dirname, "../../public", product.image);
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.error("Error al eliminar la imagen antigua:", err);
        }
      }
    } else if (data.image) {
      if (!validator.isURL(data.image)) {
        throw new Error("URL de imagen inválida.");
      }
      imagePath = data.image;
      if (product.image && product.image.startsWith("/images/")) {
        const oldImagePath = path.join(__dirname, "../../public", product.image);
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.error("Error al eliminar la imagen antigua:", err);
        }
      }
    }

    await ProductRepository.update(id, { 
      ...data, 
      image: imagePath,
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

  async delete(id: string) {
    const product = await ProductRepository.findOne({ where: { id } });
    if (!product) throw new Error("Producto no encontrado.");

    if (product.image && product.image.startsWith("/images/")) {
      const imagePath = path.join(__dirname, "../../public", product.image);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error("Error al eliminar la imagen:", err);
      }
    }

    await ProductRepository.delete(id);
    return { message: "Producto eliminado correctamente." };
  }

  async getByCategory(categoryName: string, page: number = 1, limit: number = 10) {
    const category = await CategoryRepository.findOne({ where: { name: categoryName } });
    if (!category) throw new Error("La categoría especificada no existe.");

    const [products, total] = await ProductRepository.findAndCount({
      where: { category },
      relations: ["category", "promotion"],
      skip: (page - 1) * limit,
      take: limit,
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
}



