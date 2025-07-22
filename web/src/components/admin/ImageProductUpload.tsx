import { Package } from 'lucide-react'
import React from 'react'

interface ImageUploadProps {
  preview: string | null;
  fileRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export const ImageProductUpload = ({ preview, fileRef, handleFileChange, onRemoveImage }: ImageUploadProps) => {
  return (
    <>
      <div
        onClick={() => fileRef.current?.click()}
        className="w-full h-72 border-4 border-[#E8E8E8] border-dashed flex items-center justify-center cursor-pointer"
      >
        {preview ? (
          <img src={preview} alt="preview" className="object-cover h-full p-5" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Package color="#939191" size={52} />
            <span className="text-[#939191]">Agregar imagen del producto</span>
          </div>
        )}
      </div>
      {preview && <button onClick={onRemoveImage} className="border border-gray-300 text-black py-1 text-center w-full rounded-md mt-2">Remover imagen</button>}
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  )
}
