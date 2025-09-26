# FastFood Orders App

Monorepo del proyecto **FastFood Orders App**, una aplicación SPA para gestionar pedidos en restaurantes de comida rápida.  
Incluye **frontend (Angular)** y **backend (Express con TypeScript)**.

---

## Estructura del repositorio

```
FastFood-Test/
├── backend/   # API REST con Express + TypeScript
├── frontend/  # SPA con Angular
```

---

## Características

- **Frontend (Angular):**
  - Vista de menú con paginación.
  - Resumen de pedido en tiempo real.
  - Login con roles (admin / cook).
  - Interfaz optimizada para tablets.

- **Backend (Express + TypeScript):**
  - API REST con autenticación.
  - Manejo de pedidos, menú y usuarios.
  - Errores personalizados con AppError.
  - Persistencia inicial con JSON (JSONBin o local).

---

## Acceso y roles

Accede al login en la ruta:

```
/login
```

### Cook (cocinero)
- Usuario: `chef`
- Contraseña: `123456`

### Admin
- Usuario: `admin`
- Contraseña: `admin`

---

## Flujo de navegación

- Menú principal (`/`): disponible sin login.  
- Resumen del pedido: se actualiza en tiempo real.  
- Enviar pedido: disponible desde el resumen (requiere login).  
- Vista de cocina (`/kitchen`): requiere autenticación. Aquí se listan los pedidos enviados.  

Si intentas acceder a `/kitchen` sin iniciar sesión, serás redirigido a `/login`.  

---

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Kevin-Laz/FastFood-Test.git
   cd FastFood-Test
   ```

2. Instalar dependencias en cada proyecto:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

---

## Desarrollo

- **Backend (Express + TypeScript):**
  ```bash
  cd backend
  npm run dev
  ```
  Disponible en `http://localhost:3000`.

- **Frontend (Angular):**
  ```bash
  cd frontend
  npm start
  ```
  Disponible en `http://localhost:4200`.

---

## Deploy

- Frontend: [fast-food-frontend.vercel.app](https://fast-food-frontend.vercel.app)  
- Backend: [fast-food-backend-two.vercel.app](https://fast-food-backend-two.vercel.app)

---

