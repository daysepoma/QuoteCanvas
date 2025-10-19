# QuoteCanvas

## 🛠️ Tecnologías Utilizadas

- **Next.js 15.3.3** - Framework de React
- **React 18.3.1** - Biblioteca de UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 3.4.1** - Framework de CSS
- **Radix UI** - Componentes accesibles
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn** (gestor de paquetes)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd QuoteCanvas
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno (si es necesario)

Crea un archivo `.env.local` en la raíz del proyecto si necesitas configurar variables de entorno:

```bash
# .env.local
# Agrega aquí tus variables de entorno si las necesitas
```

## 🏃‍♂️ Ejecutar el Proyecto

### Modo Desarrollo

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en: `http://localhost:9002`

### Modo Producción

```bash
# Construir la aplicación
npm run build
# o
yarn build

# Iniciar el servidor de producción
npm run start
# o
yarn start
```

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack en el puerto 9002
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter de ESLint
- `npm run typecheck` - Verifica los tipos de TypeScript

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # Páginas y layouts de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI base
│   ├── quote-form.tsx    # Formulario de cotización
│   └── quote-preview.tsx # Vista previa de cotización
├── hooks/                # Hooks personalizados
├── lib/                  # Utilidades y configuraciones
└── ai/                   # Funcionalidades de IA
```

## 🎨 Configuración

### Tailwind CSS
El proyecto utiliza Tailwind CSS con configuración personalizada que incluye:
- Fuentes personalizadas (Playfair Display)
- Sistema de colores con variables CSS
- Animaciones personalizadas
- Soporte para modo oscuro

### TypeScript
Configuración optimizada para Next.js con:
- Path mapping (`@/*` apunta a `./src/*`)
- Configuración estricta habilitada
- Soporte para JSX

## 🔧 Configuración de Next.js

El proyecto incluye configuraciones específicas:
- **Turbopack** habilitado para desarrollo más rápido
- **Puerto personalizado** (9002) para desarrollo
- **Imágenes remotas** configuradas para Unsplash, Placehold.co y Picsum
- **TypeScript y ESLint** configurados para ignorar errores durante builds