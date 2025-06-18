// import { deleteImage } from "../utils/awsS3"; 
// ⚠️ COMENTARIO IMPORTANTE PARA EL EQUIPO:
// Antes estábamos usando AWS S3 para almacenar las imágenes (`file.location`),
// pero **ya no contamos con ese servicio**.

// 🧩 NUEVA ESTRATEGIA:
// Ahora debemos trabajar con **imágenes cargadas localmente** desde una carpeta,
// por ejemplo: `/public/images`.

// 👉 También deberíamos permitir, como alternativa, cargar imágenes por URL externa
// desde el formulario (por ejemplo, pegar una URL de una imagen en internet).

// 🚫 ESTA LÍNEA:
// image: file ? (file as MulterS3File).location : undefined

// ✅ DEBERÍA CAMBIARSE POR ALGO COMO:
// image: file ? `/images/${file.filename}` : data.imageURL

// 🔧 ACCIONES NECESARIAS:
// 1. Usar `multer` con `diskStorage` para guardar archivos en la carpeta `public/images`.
// 2. En el frontend, permitir al usuario cargar una imagen desde su PC o pegar una URL.
// 3. Validar la URL (opcional) con alguna dependencia como `validator` o `yup`.
// 4. En la base de datos, guardar sólo la ruta relativa (ej: `/images/nombre.jpg`) o la URL.

// 💡 Esto simplifica el desarrollo y evita depender de servicios externos.
/////////////////////////////////////////////////////////////////////////////////////////

import upload from "../middleware/validateImageProduct";
import validator from "validator";
import { ProductDto } from "../dto/ProductDto";
import { ProductRepository } from "../repositories/ProductRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { PromotionRepository } from "../repositories/PromotionRepository";
// import { deleteImage } from "../utils/awsS3";

interface MulterS3File extends Express.Multer.File {
  location: string;
}

export class ProductService {

  static uploadImage = upload.single("image");

  async getAll(page: number = 1, limit: number = 10) {
      const [products, total] = await ProductRepository.findAndCount({
      relations: ["category", "promotion"],
      skip: (page - 1) * limit,
      take: limit,
    });

    const sanitizedProducts = products.map(product => ({
      ...product,
      image: product.image ? `IMAGE_${product.id}` : null,
      promotion: product.promotion ?? undefined, // ← solo si existe
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

  async create(data: ProductDto) {
    const category = await CategoryRepository.findOne({ where: { name: data.category as unknown as string } });
    const promotion = data.promotionId ? await PromotionRepository.findOne({ where: { id: data.promotionId } }) : undefined;

    if (!category) throw new Error("La categoría especificada no existe.");


    const product = ProductRepository.create({ 
      ...data, 
      category,
      promotion : undefined
    });

    return await ProductRepository.save(product);
  }

  async update(id: string, data: Partial<ProductDto>) {
    const product = await ProductRepository.findOne({ where: { id } });
    if (!product) throw new Error("Producto no encontrado.");

    await ProductRepository.update(id, { 
      ...data, 
      image: data.image ?? product.image 
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



