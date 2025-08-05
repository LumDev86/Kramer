// src/entities/Banner.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Banner {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  imageUrl: string; // URL pública de Cloudinary

  @Column()
  publicId: string; // ID de Cloudinary para eliminarlo

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  link: string; // Link de redirección

  @Column({ default: 0 })
  order: number; // Orden en el carrusel

  @Column({ default: true })
  active: boolean; // Mostrar u ocultar el banner

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
