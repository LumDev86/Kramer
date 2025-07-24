import { useCallback, useRef, useState } from "react";

export const useImageUpload = (setValue: (name: string, value: File | null) => void) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const handleRemoveImage = useCallback(() => {
    setPreview(null);
    setValue("image", null);
    if (fileRef.current) fileRef.current.value = "";
  }, [setValue]);

  return {preview, setPreview, fileRef, handleFileChange, handleRemoveImage};
};
