/**
 * NOTA IMPORTANTE ⚠️
 * Actualmente las imágenes se están guardando localmente en la carpeta `public/images/` 
 * y se eliminan manualmente al actualizar o borrar productos.
 * 
 * Debemos reemplazar este manejo local de archivos 
 * con una solución basada en Cloudinary (que ya está integrada en las variables de entorno .env).
 * 
 * Esto implicaría:
 * - Subir imágenes directamente a Cloudinary desde `multer`.
 * - Guardar solo la URL pública de Cloudinary en la base de datos.
 * - Eliminar las llamadas a `fs.unlink()` que intentan borrar archivos locales.
 * 
 * Dejar este comentario como recordatorio hasta que se implemente la migración completa.
 */
import upload from "../middleware/cloudinaryMulter";
import validator from "validator";
import fs from "fs/promises";
import path from "path";
import { ProductDto } from "../dto/ProductDto";
import { ProductRepository } from "../repositories/ProductRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { PromotionRepository } from "../repositories/PromotionRepository";
import { buildProductFilters, buildProductSort } from "../utils/productQueryFilter";
import { RequestHandler } from "express";
import cloudinary from "../config/cloudinary";

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

    let imageUrl: string | undefined;
    let publicId: string | undefined;

    if (file) {
      imageUrl = file.path;
      publicId = file.filename; 
    } else if (data.image) {
      if (!validator.isURL(data.image)) throw new Error("URL de imagen inválida.");
      imageUrl = data.image;
    }

    const product = ProductRepository.create({ 
      ...data,
      image: imageUrl,
      imagePublicId: publicId, 
      category,
      promotion : undefined
    });

    return await ProductRepository.save(product);
  }

  async update(id: string, data: Partial<ProductDto>, file?: Express.Multer.File) {
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

  async delete(id: string) {
    const product = await ProductRepository.findOne({ where: { id } });
    if (!product) throw new Error("Producto no encontrado.");

    if (product.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(product.imagePublicId);
      } catch (err) {
        console.error("Error al eliminar la imagen de Cloudinary:", err);
      }
    }

    await ProductRepository.delete(id);
    return { message: "Producto eliminado correctamente." };
  }
}



