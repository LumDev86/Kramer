import { CategoryCardProps } from '../interfaces/interfaces';

export function CategoryCard({ name, image, onClick }: CategoryCardProps) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={onClick}>
      <img src={image} alt={name} className="w-full h-24 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <span className="text-white text-lg font-semibold">{name}</span>
      </div>
    </div>
  );
}
