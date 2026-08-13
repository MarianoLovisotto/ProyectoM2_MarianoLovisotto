# Blog REST API

API REST para la gestión de autores y publicaciones de un blog, desarrollada con Node.js, Express y PostgreSQL.

El proyecto fue desarrollado como una aplicación backend modular, incorporando validaciones, manejo centralizado de errores, testing automatizado, documentación mediante OpenAPI y configuración preparada para deployment en Railway.

---

## 🚀 Tecnologías utilizadas

- **Node.js** — Runtime de JavaScript
- **Express** — Framework para la construcción de la API REST
- **PostgreSQL** — Base de datos relacional
- **pg** — Cliente de PostgreSQL para Node.js
- **dotenv** — Gestión de variables de entorno
- **CORS** — Configuración de acceso entre distintos orígenes
- **Jest** — Framework de testing
- **Supertest** — Testing de endpoints HTTP
- **OpenAPI** — Documentación y especificación de la API
- **YAMLJS** — Lectura del archivo OpenAPI
- **Railway** — Deployment de la aplicación y base de datos

---

## 📋 Descripción

Esta aplicación consiste en una API REST para administrar un blog.

La API permite gestionar:

- Autores
- Publicaciones
- Relaciones entre autores y publicaciones
- Validación de datos
- Creación, consulta, actualización y eliminación de recursos
- Manejo de errores HTTP
- Persistencia de información mediante PostgreSQL

El proyecto utiliza una arquitectura modular para separar las responsabilidades de la aplicación, facilitando su mantenimiento, testing y futura expansión.

---

## 📁 Estructura del proyecto

```text
PI/
│
├── docs/
│   └── openapi.yaml
│
├── scripts/
│   ├── setup-db.sql
│   └── setup.sql
│
├── src/
│   ├── db/
│   │   └── index.js
│   │
│   ├── middleware/
│   │   ├── appError.js
│   │   └── errorHandler.js
│   │
│   ├── routes/
│   │   ├── authors.routes.js
│   │   └── posts.routes.js
│   │
│   ├── services/
│   │   ├── authors.service.js
│   │   └── posts.service.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── authors.test.js
│   ├── posts.test.js
│   └── setup.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```


---

# ⚙️ Instalación y ejecución local

## 1. Clonar el repositorio

```bash
git clone https://github.com/MarianoLovisotto/ProyectoM2_MarianoLovisotto
cd api_blog
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```text
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_de_datos
NODE_ENV=development
```

Para facilitar la configuración, el proyecto incluye `.env.example` con las variables necesarias.


## 4. Configurar PostgreSQL

Crear una base de datos PostgreSQL y un usuario con los permisos necesarios.

Ejemplo:

```sql
CREATE DATABASE api_blog;

CREATE USER user_blog WITH PASSWORD 'tu_contraseña';

GRANT ALL PRIVILEGES ON DATABASE api_blog TO user_blog;
```

Luego configurar `DATABASE_URL` en `.env`.

## 5. Inicializar las tablas

El proyecto incluye `setup.sql`, que contiene la creación de las tablas y los datos iniciales.

Ejecutar:

```bash
psql -U user_blog -d api_blog -f setup.sql
```

Esto creará:

- `authors`
- `posts`

y cargará datos iniciales de prueba.

## 6. Ejecutar la aplicación

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3000
```

---

# 📡 Endpoints principales

## Authors

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/authors` | Obtener todos los autores |
| `GET` | `/authors/:id` | Obtener un autor por ID |
| `POST` | `/authors` | Crear un nuevo autor |
| `PUT` | `/authors/:id` | Actualizar un autor |
| `DELETE` | `/authors/:id` | Eliminar un autor |

### Crear un autor

```http
POST /authors
Content-Type: application/json
```

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "bio": "Desarrollador backend"
}
```

## Posts

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/posts` | Obtener todas las publicaciones |
| `GET` | `/posts/:id` | Obtener una publicación por ID |
| `POST` | `/posts` | Crear una nueva publicación |
| `PUT` | `/posts/:id` | Actualizar una publicación |
| `DELETE` | `/posts/:id` | Eliminar una publicación |

### Crear una publicación

```http
POST /posts
Content-Type: application/json
```

```json
{
  "title": "Mi primera publicación",
  "content": "Contenido de la publicación",
  "author_id": 1,
  "published": true
}
```

---

# 🧪 Testing

El proyecto utiliza **Jest** y **Supertest** para realizar testing automatizado de la API.

Los tests cubren principalmente:

- Endpoints de autores
- Endpoints de publicaciones
- Respuestas HTTP
- Validación de datos
- Casos exitosos
- Casos de error

## Ejecutar todos los tests

```bash
npm test
```

## Ejecutar con información detallada

```bash
npm test -- --verbose
```

## Ejecutar una suite específica

```bash
npx jest tests/authors.test.js
```

o:

```bash
npx jest tests/posts.test.js
```

## Coverage

Generar un reporte de cobertura:

```bash
npm test -- --coverage
```

El reporte se genera dentro de:

```text
coverage/
```

La carpeta `coverage/` está excluida del repositorio mediante `.gitignore`.

---

# 📚 Documentación de la API

La API está documentada utilizando **OpenAPI**.

La especificación se encuentra en:

```text
docs/openapi.yaml
```

El archivo describe los endpoints disponibles, parámetros, cuerpos de las solicitudes, respuestas y estructuras utilizadas por la API.

---

# 🚂 Deploy en Railway

El proyecto está preparado para ser desplegado en Railway.

El deployment requiere:

1. Repositorio de GitHub con el proyecto.
2. Servicio de aplicación Node.js en Railway.
3. Base de datos PostgreSQL.
4. Variables de entorno configuradas en Railway.

## Variables de entorno

Las variables utilizadas localmente mediante `.env` deben configurarse dentro del servicio de Railway.

Por ejemplo:

```text
DATABASE_URL=...
NODE_ENV=production
```

`DATABASE_URL` debe apuntar a la instancia de PostgreSQL utilizada en producción.


## Base de datos en Railway

La aplicación utiliza:

```js
process.env.DATABASE_URL
```

para establecer la conexión con PostgreSQL.

Esto permite utilizar diferentes bases de datos dependiendo del entorno sin modificar el código de la aplicación.

## Notas de deployment

Antes de realizar el deployment:

- Verificar que `.env` no esté incluido en Git.
- Configurar las variables de entorno en Railway.
- Verificar los scripts necesarios en `package.json`.
- Comprobar que el servidor escuche en el puerto proporcionado por Railway.
- Inicializar la base de datos de producción utilizando el esquema correspondiente.
- Ejecutar los tests antes del deployment.

---

# 🔒 Seguridad

El proyecto utiliza variables de entorno para evitar almacenar credenciales directamente en el código fuente.

El archivo:

```text
.env
```

está incluido en `.gitignore` y **no debe subirse al repositorio**.

En su lugar, el proyecto incluye:

```text
.env.example
```

Este archivo sirve como referencia:

```text
DATABASE_URL=
NODE_ENV=
```

El archivo `.env.example` no contiene credenciales reales.

También se excluyen del repositorio:

```text
node_modules/
coverage/
.env
```

---

# 🤖 Uso de inteligencia artificial

Durante el desarrollo se utilizó inteligencia artificial como herramienta de asistencia y aprendizaje.

La IA fue utilizada principalmente para:

- Comprender conceptos relacionados con backend y PostgreSQL.
- Resolver dudas sobre Node.js y Express.
- Analizar y diagnosticar errores durante el desarrollo.
- Definir y revisar la estructura del proyecto.
- Comprender la función de diferentes dependencias.
- Orientar la configuración de Jest, Supertest y coverage.
- Ayudar con la configuración de OpenAPI.
- Revisar decisiones relacionadas con la organización del código.
- Acompañar el proceso de deployment y configuración de Railway.
- Explicar conceptos y herramientas desconocidas durante el desarrollo.

La inteligencia artificial fue utilizada como **herramienta de apoyo**, no como sustituto del proceso de desarrollo.

La implementación, integración, configuración y validación del proyecto fueron realizadas por el autor.

Uno de los objetivos principales del uso de IA durante el desarrollo fue utilizarla como una herramienta similar a un asistente técnico: plantear problemas, comprender las causas, evaluar alternativas y aplicar las soluciones de manera consciente.

---



---

# 👨‍💻 Autor

**Mariano Lovisotto**


