import upload from "@middlewares/cloudinaryMulter";
import validator from "validator";
import { ProductDto } from "@/dto/ProductDto";
import { ProductRepository } from "@/repositories/ProductRepository";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { PromotionRepository } from "@/repositories/PromotionRepository";
import { buildProductFilters, buildProductSort } from "@utils/productQueryFilter";
import { RequestHandler } from "express";
import cloudinary from "@config/cloudinary";

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

  async update( id: string, data: Partial<ProductDto> & { categoryId?: string | null }, file?: Express.Multer.File ) {
    const product = await ProductRepository.findOne({
      where: { id },
      relations: ["category", "promotion"],
    });
    if (!product) throw new Error("Producto no encontrado.");

    // Guardamos una copia para comparar después
    const originalProduct = { ...product };

    let imageUrl = product.image;
    let publicId = product.imagePublicId;

    // Manejo de imagen
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

    // Manejo de categoría
    if (data.categoryId !== undefined) {
      if (data.categoryId === null) {
        product.category = null;
      } else {
        const newCategory = await CategoryRepository.findOne({
          where: { id: data.categoryId },
        });
        if (!newCategory) throw new Error("La categoría especificada no existe.");
        product.category = newCategory;
      }
    }

    // Otros campos
    Object.assign(product, data);
    product.image = imageUrl;
    product.imagePublicId = publicId;

    // Guardar producto con cambios
    await ProductRepository.save(product);

    // Comparar campos modificados
    const modifiedFields: string[] = [];

    // Aquí chequeamos manualmente los campos que pueden cambiar (más importante)
    const fieldsToCheck = [
      "name",
      "brand",
      "weight",
      "description",
      "price",
      "stock",
      "image",
      "imagePublicId",
      "status",
    ];

    for (const field of fieldsToCheck) {
      // @ts-ignore
      if (product[field] !== originalProduct[field]) {
        modifiedFields.push(field);
      }
    }

    // También revisar cambio en categoría
    const originalCategoryId = originalProduct.category ? originalProduct.category.id : null;
    const newCategoryId = product.category ? product.category.id : null;
    if (originalCategoryId !== newCategoryId) {
      modifiedFields.push("category");
    }

    // Revisar cambio en promoción (opcional)
    const originalPromotionId = originalProduct.promotion ? originalProduct.promotion.id : null;
    const newPromotionId = product.promotion ? product.promotion.id : null;
    if (originalPromotionId !== newPromotionId) {
      modifiedFields.push("promotion");
    }

    return {
      message: "Producto actualizado correctamente.",
      modifiedFields,
      product: {
        ...product,
        image: product.image ? `IMAGE_${product.id}` : null,
        promotion: product.promotion ?? undefined,
      },
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



