
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

<table align="center" style="border-collapse: collapse; margin: 20px auto; text-align: center; font-family: Arial, sans-serif;">
  <tr>
    <!-- Lucas Matias Segovia -->
    <td style="padding: 15px; vertical-align: top;">
      <img src="https://avatars.githubusercontent.com/u/103163670?s=400&u=6566c6a4a745c4e7cb83a6b12c4cf8a1e9a6a93b&v=4" width="80" style="border-radius: 50%; display: block; margin: 0 auto 10px;"/>
      <b>Lucas Matias Segovia</b><br/>
      Project Manager<br/>
      Backend<br/>
      <a href="https://github.com/LumDev86" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="24" alt="GitHub"/></a>
      <a href="https://www.linkedin.com/in/lumseg/" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" alt="LinkedIn"/></a>
    </td>
    <!-- Maria Gabriela Alarcon -->
    <td style="padding: 15px; vertical-align: top;">
      <img src="https://media.licdn.com/dms/image/v2/C4E03AQGnVa3inxOmAQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1554412765696?e=1755734400&v=beta&t=nGRymspIUigLy7x-iGQbBhaS_UW0r_nKx4W4szHixZk" width="80" style="border-radius: 50%; display: block; margin: 0 auto 10px;"/>
      <b>Maria Gabriela Alarcon</b><br/>
      Frontend<br/>
      <a href="https://github.com/mariagaa993" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="24" alt="GitHub"/></a>
      <a href="https://www.linkedin.com/in/mariagaa993/" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" alt="LinkedIn"/></a>
    </td>
    <!-- Emmanuel Cruz -->
    <td style="padding: 15px; vertical-align: top;">
      <img src="https://media.licdn.com/dms/image/v2/D4D03AQEh3qip2ECK3A/profile-displayphoto-shrink_800_800/B4DZSqPxV.G4Ac-/0/1738023049321?e=1755734400&v=beta&t=q-ZjKQf157O9zdLNtxmMKhCjCNwwRbGPC6vMgZdU82o" width="80" style="border-radius: 50%; display: block; margin: 0 auto 10px;"/>
      <b>Emmanuel Cruz</b><br/>
      Frontend<br/>
      <a href="https://github.com/emmanuel-cruz-dev" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="24" alt="GitHub"/></a>
      <a href="https://www.linkedin.com/in/emmanuel-cruz-dev/" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" alt="LinkedIn"/></a>
    </td>
  </tr>
  <tr>
    <!-- Juan Ramirez -->
    <td style="padding: 15px; vertical-align: top;">
      <img src="https://media.licdn.com/dms/image/v2/D4D03AQEojFev9UN4KA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1732571934481?e=1755734400&v=beta&t=cYL3JIW2qfJfEYUuE1yhLFmDunxOa47E29RvwMto59U" width="80" style="border-radius: 50%; display: block; margin: 0 auto 10px;"/>
      <b>Juan Ramirez</b><br/>
      Frontend<br/>
      <a href="https://github.com/juanRCoder" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="24" alt="GitHub"/></a>
      <a href="https://www.linkedin.com/in/juan-ramirez-490b84271/" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" alt="LinkedIn"/></a>
    </td>
    <!-- Jose M. Candia -->
    <td style="padding: 15px; vertical-align: top;">
      <img src="https://media.licdn.com/dms/image/v2/D4D35AQEaA_20gYJCeQ/profile-framedphoto-shrink_800_800/B4DZan06M5G4Ag-/0/1746572387401?e=1753466400&v=beta&t=Ah_VvVPxVxBxLPr28CTLbg0P41rJUf4yxUUpYJLFrRk" width="80" style="border-radius: 50%; display: block; margin: 0 auto 10px;"/>
      <b>Jose M. Candia</b><br/>
      Backend<br/>
      <a href="https://github.com/joss-dev" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="24" alt="GitHub"/></a>
      <a href="https://www.linkedin.com/in/josecandia/" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" alt="LinkedIn"/></a>
    </td>
    <!-- Richard Garcia Ordaz -->
    <td style="padding: 15px; vertical-align: top;">
      <img src="https://media.licdn.com/dms/image/v2/D5603AQEIfYgMbxVoUQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724638689379?e=1755734400&v=beta&t=MtjDJ1h8Y_R_k75M5j1_M2M9ARaCJXHRvokf_D2iWlU" width="80" style="border-radius: 50%; display: block; margin: 0 auto 10px;"/>
      <b>Richard Garcia Ordaz</b><br/>
      Diseño UX/UI<br/>
      <a href="https://www.linkedin.com/in/richard-garcia-ordaz/" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" alt="LinkedIn"/></a>
      <a href="https://richardgarciaux.com/" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/841/841364.png" width="24" alt="Website"/></a>
    </td>
  </tr>
  <tr>
    <!-- Carla Valentina -->
    <td style="padding: 15px; vertical-align: top;">
      <img src="https://media.licdn.com/dms/image/v2/D4D03AQEmzSTWKbsU5A/profile-displayphoto-shrink_800_800/B4DZdaxagTGUAk-/0/1749574592938?e=1755734400&v=beta&t=JjFBROgleccp66zA-4Dtd71LY8V7t9lFRLSGX8nC6Lo" width="80" style="border-radius: 50%; display: block; margin: 0 auto 10px;"/>
      <b>Carla Valentina</b><br/>
      Diseño UX/UI<br/>
      <a href="http://linkedin.com/in/carla-valentina-barbaresi" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" alt="LinkedIn"/></a>
      <a href="https://www.behance.net/carlavalen2531" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/145/145799.png" width="24" alt="Behance"/></a>
    </td>
    <!-- Martina Asad -->
    <td style="padding: 15px; vertical-align: top;">
      <img src="https://media.licdn.com/dms/image/v2/D4D35AQGS6BD1MoykxQ/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1711154322516?e=1753466400&v=beta&t=zHYl12wm-3E4g-OeI2joyOla_Hh5xf-bxY_w107-YB0" width="80" style="border-radius: 50%; display: block; margin: 0 auto 10px;"/>
      <b>Martina Asad</b><br/>
      Testing<br/>
      <a href="https://github.com/MartinaAsad" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="24" alt="GitHub"/></a>
      <a href="https://www.linkedin.com/in/martina-asad/" style="margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="24" alt="LinkedIn"/></a>
    </td>
  </tr>
</table>
---

## 📬 Feedback

El proyecto está en constante mejora.  
**Cualquier feedback, sugerencia o colaboración es bienvenida.**

