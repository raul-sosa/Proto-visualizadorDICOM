# Guía para Ejecutar la API REST 2.0

Esta es una API REST construida con Node.js, Express y Sequelize. Aquí tienes una guía paso a paso para que cualquier desarrollador novato pueda instalar, configurar y ejecutar la API en su entorno local.

---

## 1. Requisitos previos

- Tener instalado **Node.js** (recomendado: versión 14 o superior)
- Tener instalado **npm** (viene junto con Node.js)
- Tener acceso a una base de datos **MySQL** (local o remota)

---

## 2. Clonar el repositorio

Si aún no tienes el proyecto, clónalo usando:

```bash
git clone <URL_DEL_REPOSITORIO>
cd apirest-2.0
```

---

## 3. Instalar dependencias

Desde la carpeta raíz del proyecto, ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias listadas en `package.json`.

---

## 4. Configurar variables de entorno

Crea un archivo llamado `.env` en la raíz del proyecto. Ejemplo de contenido (ajusta los valores a tu configuración):

```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos
PORT=3000
JWT_SECRET=un_secreto_seguro
```

> **Nota:** El archivo `.env` NO debe subirse a git, ya que contiene información sensible.

---

## 4.1. Crear la base de datos y la tabla de usuarios

Antes de ejecutar la API, necesitas crear la base de datos y la tabla principal de usuarios en MySQL. Puedes hacerlo fácilmente desde tu cliente MySQL favorito (como MySQL Workbench, DBeaver, o la terminal de MySQL).

Ejecuta los siguientes comandos SQL:

```sql
CREATE DATABASE nombre_de_tu_base_de_datos;
USE nombre_de_tu_base_de_datos;

CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  phone VARCHAR(20) NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user'
);
```

Asegúrate de que el nombre de la base de datos coincide con el valor de `DB_NAME` que pusiste en tu archivo `.env`.

---

## 5. Ejecutar la API

Para iniciar el servidor, usa:

```bash
node app.js
```

O si tienes instalado nodemon (opcional, para desarrollo):

```bash
npx nodemon app.js
```

El servidor se ejecutará en el puerto que definas en el `.env` (por defecto 3000). Deberías ver en la consola:

```
Servidor corriendo en el puerto 3000
```

---

## 6. Probar la API

Puedes probar los endpoints usando herramientas como **Postman**, **Insomnia** o **curl**.

Las rutas de autenticación están bajo `/api/auth`.

---

## 7. Estructura básica del proyecto

- `app.js`: Punto de entrada principal de la API.
- `src/`: Contiene la lógica de la aplicación (controladores, modelos, rutas, etc).
- `.env`: Variables de entorno (no incluido en el repositorio).
- `package.json`: Lista de dependencias y scripts.

---

## 8. Problemas comunes

- **Error de conexión a la base de datos:** Revisa que los datos en tu `.env` sean correctos y que el servidor de MySQL esté activo.
- **Faltan dependencias:** Asegúrate de haber corrido `npm install`.
- **El puerto ya está en uso:** Cambia el valor de `PORT` en tu `.env`.

---

## 9. Recursos útiles

- [Documentación de Node.js](https://nodejs.org/es/docs/)
- [Documentación de Express](https://expressjs.com/es/)
- [Documentación de Sequelize](https://sequelize.org/)

---

## 10. ¿Cómo consumir los endpoints de la API?

La API expone los siguientes endpoints principales para autenticación de usuarios:

### 1. Registrar un usuario

- **Endpoint:** `POST /api/auth/register`
- **Descripción:** Crea un nuevo usuario. Puedes enviar los campos: `email`, `password`, `phone` (opcional) y `role` (opcional, valores: 'user', 'admin', 'tecnico').
- **Ejemplo de cuerpo de la solicitud:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "miclave123",
  "phone": "1234567890",
  "role": "user"
}
```

#### Ejemplo con curl:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "miclave123",
    "phone": "1234567890",
    "role": "user"
  }'
```

#### Ejemplo con Postman:
- Método: POST
- URL: `http://localhost:3000/api/auth/register`
- Body: Selecciona `raw` y `JSON`, luego pega el ejemplo de arriba.

---

### 2. Iniciar sesión

- **Endpoint:** `POST /api/auth/login`
- **Descripción:** Inicia sesión y retorna un token JWT junto con los datos del usuario.
- **Ejemplo de cuerpo de la solicitud:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "miclave123"
}
```

#### Ejemplo con curl:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "miclave123"
  }'
```

#### Ejemplo con Postman:
- Método: POST
- URL: `http://localhost:3000/api/auth/login`
- Body: Selecciona `raw` y `JSON`, luego pega el ejemplo de arriba.

---

### 3. Respuestas esperadas

- **Registro exitoso:**
```json
{
  "success": true
}
```
- **Login exitoso:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "usuario@ejemplo.com",
      "role": "user",
      ...
    },
    "token": "<JWT_TOKEN>"
  }
}
```
- **Error:**
```json
{
  "success": false,
  "error": "Mensaje de error"
}
```

---

¡Listo! Ahora puedes comenzar a trabajar y experimentar con esta API REST.