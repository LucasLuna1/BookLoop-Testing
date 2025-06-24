# Unit Tests - BookLoop

Este directorio contiene los unit tests específicos para el proyecto BookLoop usando **Jest**.

## 📁 Estructura

```
testing/unit/
├── simple/
│   ├── bookPrice.js         # Función cálculo precio con descuento
│   ├── bookPrice.test.js    # Tests para precios de libros
│   ├── bookValidation.js    # Función validación datos de libro
│   ├── bookValidation.test.js # Tests para validación de libros
│   ├── package.json         # Configuración Mocha
│   └── README.md
├── frontend/
│   └── bookUtils.test.js    # Tests para utilidades de libros
├── backend/
│   └── controllers/         # Tests de controladores
└── README.md
```

## 🧪 Tests Específicos de BookLoop

### Frontend Tests
1. **bookUtils.test.js** - 4 tests para utilidades reales:
   - ✅ Obtener imagen de libro (getBookImage)
   - ✅ Imagen por defecto cuando no hay imagen
   - ✅ Obtener autor de libro (getBookAuthor)
   - ✅ Texto por defecto cuando no hay autor

### Simple Tests (Mocha)
1. **bookPrice.test.js** - 12 tests para sistema de precios:
   - ✅ Cálculo de descuentos (-10%, -20%, -50%)
   - ✅ Validación de precios positivos
   - ✅ Redondeo correcto para moneda
   - ✅ Manejo de errores

2. **bookValidation.test.js** - 13 tests para validación:
   - ✅ Validación de datos de libro completos
   - ✅ Campos obligatorios: título, autor, precio
   - ✅ Estados válidos: "Nuevo", "Como Nuevo", etc.
   - ✅ Validación de ISBN opcional

## 🚀 Cómo ejecutar

### Unit Tests con Jest
```bash
# Desde la raíz del proyecto
npx jest testing/unit/frontend/

# Un archivo específico
npx jest testing/unit/frontend/bookUtils.test.js
```

### Simple Tests con Mocha
```bash
cd testing/unit/simple
npm install
npm test                # Todos los tests
npm run test:coverage   # Con cobertura
```

## 📊 Ejemplo de salida esperada

```
PASS testing/unit/frontend/bookUtils.test.js
  BookUtils Unit Tests
    ✓ should return correct image URL when book has coverimageurl
    ✓ should return default image when book has no image
    ✓ should return author name when book has author field
    ✓ should return default text when book has no author

Tests de BookLoop - Cálculo de Precio de Libros
  ✓ debería calcular precio sin descuento usando assert
  ✓ debería calcular precio con 10% descuento usando assert
  ✓ debería lanzar error con precio negativo usando assert
  ...

Tests de BookLoop - Validación de Libros
  ✓ debería validar libro correcto usando assert
  ✓ debería rechazar libro sin título usando assert
  ✓ debería rechazar objeto null usando assert
  ...

Test Suites: 3 passed, 3 total
Tests:       29 passed, 29 total
Time:        2.345 s
```

## 🔧 Configuración

Los tests están configurados para funcionar con:
- **Jest** para tests de frontend (bookUtils)
- **Mocha + Chai + Sinon** para tests simples
- **100% cobertura** en funciones de negocio
- **Funciones reales** del proyecto BookLoop

## 📝 Funcionalidades Testadas

### Específicas de BookLoop:
- ✅ **Sistema de imágenes** (getBookImage con URLs reales)
- ✅ **Sistema de autores** (getBookAuthor con nombres reales)
- ✅ **Cálculo de descuentos** (precios con descuentos -10%, -20%, etc.)
- ✅ **Validación de formularios** (Quiero Vender, Editar Libro)
- ✅ **Estados de libros** (Nuevo, Como Nuevo, Buen Estado, Usado)

### NO incluye:
- ❌ Funciones genéricas (cuadrado, CUIT, etc.)
- ❌ Validaciones no relacionadas con e-commerce
- ❌ Tests abstractos o académicos

Todos los tests están **directamente relacionados** con las funcionalidades reales del proyecto BookLoop. 