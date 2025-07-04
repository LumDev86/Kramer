import { useState, useEffect } from "react";

const isOpen = () => {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 11 && hour < 24;
};

export const ProfileSection = () => {
  const [open, setOpen] = useState(isOpen());

  useEffect(() => {
    const interval = setInterval(() => setOpen(isOpen()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="bg-white rounded-lg shadow p-4 my-4 text-center bg-cover bg-center">
      <img src="" alt="Empresa" className="w-28 h-28 rounded-full mx-auto border-4 border-gray-300" />
      <h2 className="text-xl font-semibold mt-2">Kiosco Kramer</h2>
      <p className="text-gray-600"> 🏪✨Más de 25 años de trayectoria <br />
        🛒 Variedad de productos para todos los gustos <br />
        💳 Aceptamos todos los medios de pago <br />
        📍 Estamos en Alvear 416, Ezeiza <br />
        🎉¡Tu kiosco de confianza! 
      </p>
      <div className="flex items-center justify-center gap-2 mt-2 text-gray-700">
      </div>
      <div className={`flex items-center justify-center gap-2 mt-2 ${open ? "text-green-600" : "text-red-600"}`}>
        <span>{open ? "Abierto" : "Cerrado"}</span>
      </div>
    </section>
  );
};
