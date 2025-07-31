import { useEffect, useState, useRef } from "react";
import { CategoryForm } from "./CategoryForm";
import { useForm } from "react-hook-form";
import { categoryService } from "../../services/category";
import { ImageUpload } from "./ImageUpload";

interface FormValues {
  name: string;
  image: File  | null;
}

interface CategoryDetailProps {
  mode: "create" | "edit";
  id?: string;
  onClose: () => void;
}

const CategoryDetail = ({ mode, id, onClose }: CategoryDetailProps) => {
  const [loading, setLoading] = useState(false);
  const [categoryImageUrl, setCategoryImageUrl] = useState<string>(""); 
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // Carga de datos
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchCategory = async () => {
        try {
          setLoading(true);
          const categories = await categoryService.getAllCategories();
          const category = categories.find((cat) => cat.id === id);
          if (category) {
            setValue("name", category.name);
            setCategoryImageUrl(category.image);
            setSelectedFile(null); 
          }
        } catch (error) {
          console.error("Error al cargar la categoría:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCategory();
    } else {
      reset();
      setCategoryImageUrl("");
      setSelectedFile(null);
    }
  }, [id, mode, setValue, reset]);

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setCategoryImageUrl(URL.createObjectURL(file));
    }
  };

  
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setCategoryImageUrl(""); 
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  // Submit del formulario
  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);

      
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      if (mode === "edit" && id) {
        await categoryService.updateCategory(id, formData);
        alert("Categoría actualizada correctamente");
      } else {
        await categoryService.createCategory(formData);
        alert("Categoría creada correctamente");
      }

      onClose();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {mode === "edit" ? "Editar Categoría" : "Crear Nueva Categoría"}
      </h2>

      {loading && mode === "edit" ? (
        <p className="text-center">Cargando categoría...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
          <ImageUpload
            preview={categoryImageUrl || null}
            fileRef={fileInputRef}
            handleFileChange={handleFileChange}
            onRemoveImage={handleRemoveImage}
            alt="Imagen de la categoría"
          />

          <CategoryForm register={register} errors={errors} />

          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
            {mode === "edit" ? "Actualizar Categoría" : "Crear Categoría"}
          </button>

          <button type="button" onClick={onClose} className="w-full mt-2 text-gray-500">
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default CategoryDetail;
