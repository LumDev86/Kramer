// src/services/admin/banner.admin.service.ts
import { BannerRepository } from "@/repositories/BannerRepository";
import cloudinary from "@config/cloudinary";

export class BannerAdminService {
  async create(data: { imageUrl: string; publicId: string; title?: string; description?: string; link?: string; order?: number; active?: boolean }) {
    const banner = BannerRepository.create(data);
    return await BannerRepository.save(banner);
  }

  async getAll(activeOnly = false) {
    return await BannerRepository.find({
      where: activeOnly ? { active: true } : {},
      order: { order: "ASC" },
    });
  }

  async delete(id: string) {
    const banner = await BannerRepository.findOne({ where: { id } });
    if (!banner) throw new Error("Banner no encontrado");

    // Eliminar de Cloudinary
    await cloudinary.uploader.destroy(banner.publicId);

    // Eliminar de la base de datos
    await BannerRepository.remove(banner);
    return { message: "Banner eliminado correctamente" };
  }
}

