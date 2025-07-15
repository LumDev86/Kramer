import { ProductDto } from "@/dto/ProductDto";
import { ProductRepository } from "@/repositories/ProductRepository";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import upload from "@middlewares/cloudinaryMulter";
import validator from "validator";
import cloudinary from "@config/cloudinary";
import { RequestHandler } from "express";

export class ProductAdminService {
    static uploadImage = upload.single("image") as RequestHandler;

    async create(data: ProductDto, file?: Express.Multer.File) {
        const category = await CategoryRepository.findOne({ where: { name: data.category as unknown as string } });

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
            promotion: undefined, // no se usa, por eso se deja fijo
        });

        return await ProductRepository.save(product);
    }

    async update(id: string, data: Partial<ProductDto> & { categoryId?: string | null }, file?: Express.Multer.File) {
        const product = await ProductRepository.findOne({
            where: { id },
            relations: ["category", "promotion"],
        });
        if (!product) throw new Error("Producto no encontrado.");

        const originalProduct = { ...product };

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

        if (data.categoryId !== undefined) {
            if (data.categoryId === null) {
                product.category = null;
            } else {
                const newCategory = await CategoryRepository.findOne({ where: { id: data.categoryId } });
                if (!newCategory) throw new Error("La categoría especificada no existe.");
                product.category = newCategory;
            }
        }

        Object.assign(product, data);
        product.image = imageUrl;
        product.imagePublicId = publicId;

        await ProductRepository.save(product);

        const modifiedFields: string[] = [];
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
            // @ts-expect-error: dynamic field comparison
            if (product[field] !== originalProduct[field]) {
                modifiedFields.push(field);
            }
        }

        const originalCategoryId = originalProduct.category ? originalProduct.category.id : null;
        const newCategoryId = product.category ? product.category.id : null;
        if (originalCategoryId !== newCategoryId) {
            modifiedFields.push("category");
        }

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
