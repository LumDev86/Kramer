import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { CategorySelectProps } from "../interfaces/category";
import { useClickOutside } from "../hooks/useOnClickOutside";

export const CategorySelect = ({ 
  category, 
  isValidCategory,
  categories, 
  onSelect 
}: CategorySelectProps) => {
  
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative w-full font-outfit pt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full rounded-[5px] outline outline-1 outline-[#6EC3F680] bg-[#6EC3F61A] px-3 
        py-2 flex justify-between items-center cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={open}>
        { isValidCategory ? `Categoría: ${category}` : "Seleccionar categoría" }
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {
        open && (
          <ul role="listbox"
            className="absolute z-50 mt-2 w-full bg-white rounded-[5px] outline outline-1 
            outline-[#6EC3F680] shadow">
            {
              categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    role="option"
                    className={`w-full text-left px-4 py-2 cursor-pointer hover:bg-[#6EC3F680] 
                    ${cat.name === category ? "bg-blue-200" : ""}`}
                    onClick={() => {
                      onSelect(cat.name);
                      setOpen(false);
                      navigate(`/categoria/${cat.name}`);
                    }}>
                    {cat.name}
                  </button>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};
