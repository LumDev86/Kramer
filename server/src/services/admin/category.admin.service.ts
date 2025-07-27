import { CategoryDto } from "@/dto/CategoryDto";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import validator from "validator";
import upload from "@/middleware/cloudinaryMulter";

export class CategoryAdminService {
  static uploadImage = upload.single("image");

  async create(data: CategoryDto, file?: Express.Multer.File) {
    if (!data.name || data.name.trim() === "") {
      throw new Error("El nombre de la categoría es obligatorio.");
    }

    const exists = await CategoryRepository.findOne({ where: { name: data.name } });
    if (exists) throw new Error("Ya existe una categoría con ese nombre.");

    let imageUrl: string | undefined;

    if (file) {
      imageUrl = file.path; // URL o path que genera Cloudinary
    } else if (data.image) {
      if (!validator.isURL(data.image)) throw new Error("URL de imagen inválida.");
      imageUrl = data.image;
    }

    const category = CategoryRepository.create({
      name: data.name.trim(),
      image: imageUrl,
    });

    return await CategoryRepository.save(category);
  }

  async update(id: string, data: Partial<CategoryDto>, file?: Express.Multer.File) {
    const category = await CategoryRepository.findOne({ where: { id } });
    if (!category) throw new Error("Categoría no encontrada.");

    let imageUrl = category.image;

    if (file) {
      imageUrl = file.path;
    } else if (data.image) {
      if (!validator.isURL(data.image)) throw new Error("URL de imagen inválida.");
      imageUrl = data.image;
    }

    if (data.name && data.name.trim() !== "") {
      category.name = data.name.trim();
    }

    category.image = imageUrl;

    return await CategoryRepository.save(category);
  }

  async delete(id: string) {
    const category = await CategoryRepository.findOne({ where: { id } });
    if (!category) throw new Error("Categoría no encontrada.");

    // No borramos nada en Cloudinary porque no tenemos el publicId

    await CategoryRepository.delete(id);
    return { message: "Categoría eliminada correctamente." };
  }
}


 
