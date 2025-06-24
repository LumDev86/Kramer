const categories = [
  { to: "ropa", label: "Ropa", img: "" },
  { to: "electronica", label: "Electrónica", img: "" },
  { to: "hogar", label: "Hogar", img: "" },
];

export const menu = {
  categories,
};

export const validCategory = categories.map(category => category.to);
