# 🚀 React Technical Challenge

## 📋 Descripción

Esta es una **prueba técnica completa** diseñada para evaluar las habilidades de desarrollo frontend en React + TypeScript, desde nivel **Junior hasta Senior**. El proyecto consiste en crear un sistema de gestión de usuarios que interactúa con la API de JSONPlaceholder.

**⏰ Tiempo estimado:** 2-3 horas

## 🎯 Objetivos de la Prueba

### Habilidades a Evaluar

#### **Junior Level (Básico)**
- ✅ Conocimiento básico de React y TypeScript
- ✅ Manejo de componentes funcionales
- ✅ Props y state básico
- ✅ Event handling
- ✅ Conditional rendering básico

#### **Mid Level (Intermedio)**
- ✅ Custom hooks
- ✅ State management complejo
- ✅ Form handling y validación
- ✅ API integration
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design

#### **Senior Level (Avanzado)**
- ✅ Arquitectura de carpetas profesional
- ✅ TypeScript avanzado (tipos, interfaces, generics)
- ✅ Hooks personalizados complejos
- ✅ Performance optimization
- ✅ Error boundaries
- ✅ Accessibility (a11y)
- ✅ Clean code principles
- ✅ Reutilización de componentes

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes UI reutilizables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── UserList.tsx    # Lista de usuarios
│   ├── UserDetails.tsx # Detalles de usuario
│   ├── UserForm.tsx    # Formulario de usuario
│   └── PostForm.tsx    # Formulario de post
├── hooks/              # Custom hooks
│   ├── useApi.ts       # Hook para llamadas API
│   ├── useForm.ts      # Hook para manejo de formularios
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
├── services/           # Servicios API
│   ├── httpClient.ts   # Cliente HTTP
│   └── apiService.ts   # Servicios de JSONPlaceholder
├── types/              # Definiciones TypeScript
│   ├── api.ts          # Tipos de API
│   └── components.ts   # Tipos de componentes
├── config/             # Configuración
│   └── environment.ts  # Variables de entorno
└── utils/              # Utilidades
```

## 🛠️ Tecnologías Utilizadas

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **CSS3** - Styling (CSS Grid, Flexbox, CSS Variables)
- **JSONPlaceholder API** - Datos de prueba
- **ESLint** - Linting
- **Modern JavaScript** (ES2022+)

## 🚀 Instrucciones de Instalación

1. **Clona el repositorio**
   ```bash
   git clone [repository-url]
   cd React-Technical-Challenge
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Accede a la aplicación**
   ```
   http://localhost:5173
   ```

## 📚 Funcionalidades Implementadas

### ✅ **Gestión de Usuarios**
- Listado de usuarios con búsqueda en tiempo real
- Vista detallada de cada usuario
- Formulario para crear nuevos usuarios
- Formulario para editar usuarios existentes
- Eliminación de usuarios con confirmación

### ✅ **Gestión de Posts**
- Visualización de posts por usuario
- Formulario para crear nuevos posts
- Formulario para editar posts existentes

### ✅ **Gestión de Comentarios**
- Visualización de comentarios por post
- Carga dinámica de comentarios

### ✅ **Características Técnicas**
- **Responsive Design** - Funciona en móvil, tablet y desktop
- **Loading States** - Indicadores de carga en todas las operaciones
- **Error Handling** - Manejo robusto de errores
- **Form Validation** - Validación completa de formularios
- **Search & Filter** - Búsqueda con debounce
- **Modal System** - Modales para confirmaciones
- **Type Safety** - TypeScript en todo el código
- **Accessibility** - ARIA labels y navegación por teclado

## 🎯 Tareas para el Candidato

### **Nivel Junior (30-45 min)**
1. **Corregir un bug simple** en la validación de email
2. **Agregar un nuevo campo** al formulario de usuario
3. **Cambiar el estilo** de los botones primarios
4. **Implementar conditional rendering** para mostrar/ocultar elementos

### **Nivel Mid (60-90 min)**
1. **Crear un hook personalizado** para manejo de favoritos
2. **Implementar paginación** en la lista de usuarios
3. **Agregar filtros avanzados** (por ciudad, company, etc.)
4. **Mejorar el manejo de errores** con notificaciones toast
5. **Optimizar renders** con React.memo o useMemo

### **Nivel Senior (90-120 min)**
1. **Implementar un estado global** con Context API o similar
2. **Crear un sistema de cache** para las llamadas API
3. **Agregar tests unitarios** para componentes críticos
4. **Implementar lazy loading** para optimización
5. **Agregar internationalization (i18n)**
6. **Crear un sistema de theming**

## 🔍 Criterios de Evaluación

### **Código (40%)**
- ✅ Legibilidad y organización
- ✅ Uso correcto de TypeScript
- ✅ Principios SOLID
- ✅ Manejo de errores
- ✅ Performance

### **Funcionalidad (30%)**
- ✅ Todas las características funcionan correctamente
- ✅ Validaciones apropiadas
- ✅ UX fluida
- ✅ Responsive design

### **Arquitectura (20%)**
- ✅ Estructura de carpetas
- ✅ Separación de responsabilidades
- ✅ Reutilización de código
- ✅ Escalabilidad

### **Mejores Prácticas (10%)**
- ✅ Commits semánticos
- ✅ Documentación
- ✅ Accessibility
- ✅ SEO básico

## 📝 Entregables

1. **Código fuente** - Push a un repositorio de GitHub
2. **README actualizado** - Con las modificaciones realizadas
3. **Capturas de pantalla** - De las nuevas funcionalidades
4. **Video demo (opcional)** - Mostrando el funcionamiento

## 🐛 Problemas Conocidos para Resolver

### **Junior Level**
- [ ] La validación de email permite emails inválidos
- [ ] El botón de "Loading" no muestra el spinner
- [ ] Los estilos responsive no funcionan en móviles pequeños

### **Mid Level**
- [ ] No hay manera de marcar usuarios como favoritos
- [ ] La lista de usuarios se carga completa (falta paginación)
- [ ] No hay filtros por ciudad o compañía
- [ ] Los errores de API no se muestran al usuario

### **Senior Level**
- [ ] No hay persistencia de estado al recargar la página
- [ ] Las llamadas API se repiten innecesariamente
- [ ] No hay tests unitarios
- [ ] Falta optimización para listas grandes

## 🎨 Personalización de Estilos

El proyecto usa **CSS Variables** para facilitar la personalización:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-danger: #ef4444;
  --space-4: 1rem;
  --radius-base: 0.375rem;
}
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

## 📚 Recursos de Apoyo

- **JSONPlaceholder API:** https://jsonplaceholder.typicode.com/
- **React Docs:** https://react.dev/
- **TypeScript Docs:** https://www.typescriptlang.org/docs/
- **MDN Web Docs:** https://developer.mozilla.org/

## 🤝 Contribución

Para contribuir a este proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Si tienes preguntas sobre la prueba técnica:

- **Email:** [tu-email@empresa.com]
- **Slack:** [#technical-challenges]
- **Documentación:** [Wiki interna]

---

## 💡 Consejos para el Candidato

### **Para Junior:**
- Enfócate en completar las funcionalidades básicas
- Pregunta si tienes dudas sobre React o TypeScript
- Usa console.log para debuggear
- No te preocupes por la perfección, enfócate en que funcione

### **Para Mid:**
- Demuestra conocimiento de hooks y manejo de estado
- Implementa buenas prácticas de UX (loading, errores)
- Muestra habilidades de CSS y responsive design
- Organiza el código de manera clara

### **Para Senior:**
- Demuestra arquitectura y patrones avanzados
- Piensa en escalabilidad y mantenibilidad
- Implementa optimizaciones de performance
- Considera accessibility y buenas prácticas web

## 🎯 Objetivos de Aprendizaje

Después de completar esta prueba, habrás practicado:

- ✅ **React Hooks** - useState, useEffect, custom hooks
- ✅ **TypeScript** - Tipos, interfaces, generics
- ✅ **API Integration** - Fetch, async/await, error handling
- ✅ **Form Management** - Validation, state management
- ✅ **State Management** - Local state, props, context
- ✅ **CSS Moderno** - Grid, Flexbox, Variables, Responsive
- ✅ **Component Architecture** - Reutilización, composición
- ✅ **Error Handling** - Try/catch, fallback UI
- ✅ **Performance** - Memoization, lazy loading
- ✅ **Accessibility** - ARIA, semantic HTML

---

**¡Buena suerte con la prueba técnica! 🚀**

> **Nota:** Esta prueba está diseñada para ser desafiante pero realista. No te preocupes si no completas todo - estamos más interesados en ver tu proceso de pensamiento y la calidad del código que escribes.
