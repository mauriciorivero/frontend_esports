# INDER E-Sports Manager

Sistema de gestión y administración de torneos de E-Sports desarrollado para el Instituto de Deportes y Recreación (INDER). Esta aplicación web permite gestionar plataformas de videojuegos, juegos y equipos de manera eficiente a través de una interfaz moderna e intuitiva.

## 📋 Descripción

INDER E-Sports Manager es una aplicación frontend de una sola página (SPA) que proporciona un panel de administración completo para la gestión de torneos de E-Sports. El sistema permite crear, editar y eliminar registros de plataformas, juegos y equipos, facilitando la organización y administración de competencias de videojuegos.

## ✨ Características

- **Gestión de Plataformas**: Administración de plataformas de videojuegos (PlayStation, Xbox, PC, etc.) con información de nombre y marca
- **Gestión de Juegos**: Control de videojuegos con detalles de nombre, género, desarrollador y plataforma asociada
- **Gestión de Equipos**: Administración de equipos con información de nombre, nivel, horas jugadas y juego asociado
- **Interfaz Moderna**: Diseño oscuro con gradientes y animaciones suaves
- **Operaciones CRUD**: Crear, leer, actualizar y eliminar registros para todas las entidades
- **Modales Interactivos**: Formularios en modales para una experiencia de usuario fluida
- **Navegación por Secciones**: Sistema de pestañas para alternar entre diferentes módulos

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la aplicación
- **CSS3**: Estilos modernos con variables CSS, gradientes y animaciones
- **JavaScript (Vanilla)**: Lógica de la aplicación sin frameworks
- **Fetch API**: Comunicación con el backend mediante peticiones HTTP
- **Google Fonts**: Tipografía Outfit para un diseño premium

## 📁 Estructura del Proyecto

```
frontend_esports/
├── index.html      # Estructura HTML principal
├── app.js          # Lógica de la aplicación y comunicación con API
├── styles.css      # Estilos y diseño de la interfaz
└── README.md       # Documentación del proyecto
```

## 🚀 Instalación y Configuración

### Requisitos Previos

- Un navegador web moderno (Chrome, Firefox, Safari, Edge)
- Un servidor backend corriendo en `http://localhost:3000` con los siguientes endpoints:
  - `GET /api/plataformas` - Obtener todas las plataformas
  - `POST /api/plataformas` - Crear una nueva plataforma
  - `PUT /api/plataformas/:id` - Actualizar una plataforma
  - `DELETE /api/plataformas/:id` - Eliminar una plataforma
  - `GET /api/juegos` - Obtener todos los juegos
  - `POST /api/juegos` - Crear un nuevo juego
  - `PUT /api/juegos/:id` - Actualizar un juego
  - `DELETE /api/juegos/:id` - Eliminar un juego
  - `GET /api/equipos` - Obtener todos los equipos
  - `POST /api/equipos` - Crear un nuevo equipo
  - `PUT /api/equipos/:id` - Actualizar un equipo
  - `DELETE /api/equipos/:id` - Eliminar un equipo

### Pasos de Instalación

1. Clonar o descargar el repositorio
2. Asegurarse de que el backend esté corriendo en `http://localhost:3000`
3. Abrir `index.html` en un navegador web o usar un servidor local

### Usando un Servidor Local (Recomendado)

Para evitar problemas de CORS, se recomienda usar un servidor local:

**Con Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Con Node.js (http-server):**
```bash
npx http-server -p 8000
```

Luego abrir `http://localhost:8000` en el navegador.

### Configuración de la API

Si el backend corre en un puerto diferente, modificar la constante `API_BASE_URL` en `app.js`:

```javascript
const API_BASE_URL = 'http://localhost:PUERTO/api';
```

## 📖 Uso

### Gestión de Plataformas

1. Hacer clic en la pestaña "Plataformas"
2. Hacer clic en "+ Nueva Plataforma" para crear una nueva plataforma
3. Llenar el formulario con nombre y marca
4. Hacer clic en "Guardar"
5. Usar "Editar" para modificar una plataforma existente
6. Usar "Eliminar" para borrar una plataforma (con confirmación)

### Gestión de Juegos

1. Hacer clic en la pestaña "Juegos"
2. Hacer clic en "+ Nuevo Juego" para crear un nuevo juego
3. Llenar el formulario con:
   - Nombre del juego
   - Tipo/Género
   - Estudio desarrollador
   - ID de la plataforma asociada
4. Hacer clic en "Guardar"
5. Usar "Editar" o "Eliminar" según sea necesario

### Gestión de Equipos

1. Hacer clic en la pestaña "Equipos"
2. Hacer clic en "+ Nuevo Equipo" para crear un nuevo equipo
3. Llenar el formulario con:
   - Nombre del equipo
   - Nivel (1-100)
   - Horas jugadas
   - ID del juego asociado
4. Hacer clic en "Guardar"
5. Usar "Editar" o "Eliminar" según sea necesario

## 🎨 Características de Diseño

- **Tema Oscuro**: Paleta de colores oscura para reducir la fatiga visual
- **Gradientes**: Efectos de gradiente en títulos y elementos destacados
- **Animaciones**: Transiciones suaves al cambiar de sección
- **Responsive**: Diseño adaptable a diferentes tamaños de pantalla
- **Tipografía**: Fuente Outfit de Google Fonts para un aspecto moderno

## 🔧 Personalización

### Colores

Los colores principales se pueden modificar en `styles.css` mediante las variables CSS:

```css
:root {
    --bg-color: #0f172a;
    --card-bg: #1e293b;
    --accent-color: #8b5cf6;
    /* ... más variables */
}
```

### Fuentes

La fuente se puede cambiar modificando la importación en `index.html` y la variable `--font-family` en `styles.css`.

## 📝 Notas Importantes

- La aplicación requiere que el backend esté corriendo para funcionar correctamente
- Los errores de conexión se muestran en la consola del navegador
- Las operaciones de eliminación requieren confirmación del usuario
- Los formularios incluyen validación HTML5 básica

## 🐛 Solución de Problemas

### Error de CORS

Si aparece un error de CORS, asegurarse de:
- Usar un servidor local en lugar de abrir el archivo directamente
- Verificar que el backend tenga configurado CORS correctamente

### No se cargan los datos

- Verificar que el backend esté corriendo
- Revisar la consola del navegador para errores
- Confirmar que la URL de la API sea correcta en `app.js`

### Los modales no se cierran

- Hacer clic en la "X" o fuera del modal
- Verificar que no haya errores de JavaScript en la consola

## 📄 Licencia

Este proyecto fue desarrollado como trabajo final para el SENA 2025.

## 👥 Autor

Desarrollado para el Instituto de Deportes y Recreación (INDER) - SENA 2025

---

**Versión:** 1.0.0  
**Última actualización:** 2025

