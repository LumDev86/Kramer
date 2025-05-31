import { CategoryRepository } from "../repositories/CategoryRepository";
import { CategoryDto } from "../dto/CategoryDto";
import { ProductRepository } from "../repositories/ProductRepository";

export class CategoryService {
    async getAll() {
        try {
            return await CategoryRepository.find();
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
        try {
            if (!data.name || data.name.trim() === "") throw new Error("El nombre de la categoría es obligatorio.");
            
            const category = CategoryRepository.create({ name: data.name });
            return await CategoryRepository.save(category);
        } catch (error) {
            throw new Error("Error al crear la categoría.");
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

    async getProductsByCategoryName(categoryName: string) {
        try {
            // Buscar la categoría por su nombre
            const category = await CategoryRepository.findOne({
                where: { name: categoryName }
            });

            if (!category) throw new Error("Categoría no encontrada.");

            // Buscar los productos que pertenecen a la categoría encontrada
            const products = await ProductRepository.find({
                where: { category: { id: category.id } },
                relations: ["category"]
            });

            if (products.length === 0) throw new Error("No hay productos en esta categoría.");

            return products;
        } catch (error) {
            throw new Error("Error al obtener productos por nombre de categoría.");
        }
    }
}
