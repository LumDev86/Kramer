// ⚠️ IMPORTANTE:
// Al eliminar una categoría, los productos asociados se borran automáticamente (por onDelete: "CASCADE").
// Sin embargo, si esos productos tienen imágenes en Cloudinary, las imágenes NO se eliminan automáticamente.
// Tarea pendiente: antes de borrar la categoría, obtener los productos relacionados y eliminar sus imágenes de Cloudinary.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { CategoryRepository } from "@repositories/category/CategoryRepository";
import { CategoryDto } from "@dto/category/CategoryDto";
import { ProductRepository } from "@repositories/product/ProductRepository";

export class CategoryService {
    async getAll(page: number = 1, limit: number = 10) {
        try {
            const [categories, total] = await CategoryRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });
                return {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                categories
            }; 
        } catch (error) {
            throw new Error("Error al obtener las categorías.");
        }
    }

    async getById(id: string) {
        try {
            const category = await CategoryRepository.findOne({ where: { id } });
            if (!category) throw new Error("Categoría no encontrada.");
            return category;
        } catch (error) {
            throw new Error("Error al obtener la categoría.");
        }
    }

    async create(data: CategoryDto) {
        if (!data.name || data.name.trim() === "") {
            throw new Error("El nombre de la categoría es obligatorio.");
        }

        try {
            const exists = await CategoryRepository.findOne({ where: { name: data.name } });
            if (exists) throw new Error("Ya existe una categoría con ese nombre.");

            const category = CategoryRepository.create({
                name: data.name.trim(),
                image: data.image?.trim() || undefined,
            });

            return await CategoryRepository.save(category);
        } catch (error: any) {
            throw new Error(error.message || "Error al crear la categoría.");
        }
    }

    async update(id: string, data: CategoryDto) {
        try {
            const category = await CategoryRepository.findOne({ where: { id } });
            if (!category) throw new Error("Categoría no encontrada.");
            
            if (!data.name || data.name.trim() === "") throw new Error("El nombre de la categoría es obligatorio.");
            
            category.name = data.name;
            return await CategoryRepository.save(category);
        } catch (error) {
            throw new Error("Error al actualizar la categoría.");
        }
    }

    async delete(id: string) {
        try {
            const category = await CategoryRepository.findOne({ where: { id } });
            if (!category) throw new Error("Categoría no encontrada.");
            
            await CategoryRepository.delete(id);
            return { message: "Categoría eliminada correctamente." };
        } catch (error) {
            throw new Error("Error al eliminar la categoría.");
        }
    }

    async getProductsByCategoryName(categoryName: string, page: number = 1, limit: number = 10) {
    try {
            const category = await CategoryRepository.findOne({ where: { name: categoryName } });

            if (!category) throw new Error("Categoría no encontrada.");

            const [products, total] = await ProductRepository.createQueryBuilder("product")
            .where("product.categoryId = :categoryId", { categoryId: category.id })
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

            return {
            category: category.name,    
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            products,
            };
        } catch (error) {
            throw new Error("Error al obtener productos por nombre de categoría.");
        }
    }
}    
