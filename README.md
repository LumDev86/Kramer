
# 🧾 Documentación General – Kramer e-commerce

## 📌 Descripción del Proyecto

**Kramer** es una aplicación **e-commerce multiplataforma** desarrollada por un equipo multidisciplinario. El proyecto tiene como objetivo principal permitir la gestión integral de productos y clientes a través de tres módulos principales:

- 👥 **Interfaz pública** para usuarios finales: catálogo de productos, carrito y compras.
- 🛠 **Panel de administración**: gestión de productos, stock, estados y categorías.
- 📊 **CRM** básico: visualización de usuarios/clientes y sus interacciones.

---

## 🧱 Tecnologías Utilizadas

| Capa         | Tecnología                             |
|--------------|-----------------------------------------|
| Frontend     | React, TypeScript, TailwindCSS, Vite    |
| Backend      | Node.js, Express, TypeScript            |
| Base de datos| MySQL                                   |
| ORM          | TypeORM                                 |
| Deploy       | Vercel (Frontend), AivenDB / Render (API) |
| Otros        | Swagger (documentación API), ESLint     |

---

## 🔌 Estructura del Proyecto

```
Kramer/
├── server/               # Backend (API REST)
│   ├── controllers/
│   ├── services/
│   ├── entities/         # TypeORM models
│   ├── routes/
│   ├── middleware/
│   └── index.ts
│
├── web/                  # Frontend (cliente)
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── main.tsx
│
├── docs/                 # Documentación técnica
│   ├── estructuraDB.pdf
│   └── historias_usuario.docx
```

---

## 🚀 Funcionalidades Clave

### ✅ Completadas
- Configuración de base de datos con MySQL.
- Backend con endpoints funcionales para productos.
- Frontend inicial desplegado en Vercel.
- Control de errores y reconexión automática de DB.

### 🛠 En desarrollo
- Registro/login para administradores.
- Gestión de estado de productos (habilitado/deshabilitado).
- Visualización de categorías desde el frontend.
- CRM: listado de usuarios y métricas.

---

## 📖 Endpoints Documentados

El proyecto incluye documentación Swagger que expone los endpoints disponibles.  
Puedes verlos accediendo a:

```
GET /api-docs
```

(Swagger: `https://kramer-8p5a.onrender.com/api-docs/`)

---

## 👨‍💻 Equipo de desarrollo

Este proyecto fue desarrollado por un equipo multidisciplinario como parte de un trabajo colaborativo.  
Aporta conocimientos en frontend, backend, diseño UX/UI, base de datos, testing, buenas prácticas y control de versiones.

| Rol             | Nombre y apellido       | Git-Hub/Linkedin    |
|-----------------|-------------------------|---------------------|
| Project Manager | Lucas Matias Segovia    | [Git-Hub](https://github.com/LumDev86) / [Linkedin](https://www.linkedin.com/in/lumseg/) |
| Frontend        | Maria Gabriela Alarcon  | [Git-Hub](https://github.com/mariagaa993) / [Linkedin](https://www.linkedin.com/in/mariagaa993/) |
| Frontend        | Emmanuel Cruz           | [Git-Hub](https://github.com/emmanuel-cruz-dev) / [Linkedin](https://www.linkedin.com/in/emmanuel-cruz-dev/) |
| Frontend        | Juan Ramirez            | [Git-Hub](https://github.com/juanRCoder) / [Linkedin](https://www.linkedin.com/in/juan-ramirez-490b84271/) |
| Backend         | Jose M. Candia          | [Git-Hub](https://github.com/joss-dev) / [Linkedin](https://www.linkedin.com/in/josecandia/) |
| Backend         | Lucas Matias Segovia    | [Git-Hub](https://github.com/LumDev86) / [Linkedin](https://www.linkedin.com/in/lumseg/) | 
| Diseño UX/UI    | RichardGarciaOrdaz      | [Git-Hub](https://github.com/) / [Linkedin](https://www.linkedin.com/in/) |
| Diseño UX/UI    | Carla Valentina         | [Git-Hub](https://github.com/) / [Linkedin](https://www.linkedin.com/in/) |
| Testing         | Martina Asad            | [Git-Hub](https://github.com/MartinaAsad) / [Linkedin](https://www.linkedin.com/in/martina-asad/) |

---

## 📬 Feedback

El proyecto está en constante mejora.  
**Cualquier feedback, sugerencia o colaboración es bienvenida.**

