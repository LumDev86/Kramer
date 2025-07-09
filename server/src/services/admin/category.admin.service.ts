import { CategoryRepository } from "@/repositories/CategoryRepository";
import { CategoryDto } from "@/dto/CategoryDto";

export class CategoryAdminService {

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

}    
