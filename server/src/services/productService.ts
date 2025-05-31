import { ProductDto } from "../dto/ProductDto";
import { ProductRepository } from "../repositories/ProductRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { deleteImage } from "../utils/awsS3";

interface MulterS3File extends Express.Multer.File {
  location: string;
}

export class ProductService {
  async getAll(page: number = 1, limit: number = 10) {
    const [products, total] = await ProductRepository.findAndCount({
      relations: ["category"],
      skip: (page - 1) * limit,
      take: limit,
    });
  
    const sanitizedProducts = products.map(product => ({
      ...product,
      image: product.image ? `IMAGE_${product.id}` : null, // Oculta la URL real
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
      relations: ["category"] 
    });
  
    if (!product) throw new Error("Producto no encontrado.");
  
    return {
      ...product,
      image: product.image ? `IMAGE_${product.id}` : null, // Oculta la URL real
    };
  }  

  async create(data: ProductDto, file?: Express.Multer.File) {
    const category = await CategoryRepository.findOne({ where: { name: data.category as unknown as string } });
    if (!category) throw new Error("La categoría especificada no existe.");

    const product = ProductRepository.create({ 
      ...data, 
      category, 
      image: file ? (file as MulterS3File).location : undefined
    });

    return await ProductRepository.save(product);
  }

  async update(id: string, data: Partial<ProductDto>, file?: Express.Multer.File) {
    const product = await ProductRepository.findOne({ where: { id } });
    if (!product) throw new Error("Producto no encontrado.");

    if (file && product.image) {
      await deleteImage(product.image.split("/").pop()!);
    }

    const imageUrl = file ? (file as MulterS3File).location : product.image;
    await ProductRepository.update(id, { ...data, image: imageUrl });
    return await ProductRepository.findOne({ where: { id }, relations: ["category"] });
  }

  async delete(id: string) {
    const product = await ProductRepository.findOne({ where: { id } });
    if (!product) throw new Error("Producto no encontrado.");

    if (product.image) {
      await deleteImage(product.image.split("/").pop()!);
    }

    await ProductRepository.delete(id);
    return { message: "Producto eliminado correctamente." };
  }

  async getByCategory(categoryName: string, page: number = 1, limit: number = 10) {
    const category = await CategoryRepository.findOne({ where: { name: categoryName } });
    if (!category) throw new Error("La categoría especificada no existe.");
  
    const [products, total] = await ProductRepository.findAndCount({
      where: { category },
      relations: ["category"],
      skip: (page - 1) * limit,
      take: limit,
    });
  
    const sanitizedProducts = products.map(product => ({
      ...product,
      image: product.image ? `IMAGE_${product.id}` : null, // Oculta la URL real
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


