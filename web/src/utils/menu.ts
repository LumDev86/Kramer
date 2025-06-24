const categories = [
  { to: "kiosco", label: "kiosco", img: "" },
  { to: "Bebidas", label: "Bebidas", img: "" },
  { to: "Almacen", label: "Almacen", img: "" },
];

export const menu = {
  categories,
};

export const validCategory = categories.map(category => category.to);
