# Tests Unitarios BookLoop - Funciones de Negocio

Tests unitarios **específicos del proyecto BookLoop** para las funciones principales del e-commerce de libros.

## 📁 Archivos

```
testing/unit/simple/
├── bookPrice.js           # Función cálculo precio con descuento
├── bookPrice.test.js      # 12 tests para precios
├── bookValidation.js      # Función validación datos de libro
├── bookValidation.test.js # 13 tests para validación
├── package.json           # Configuración
└── README.md
```

## 🧪 Funciones Específicas de BookLoop

### 1. **calculateBookPrice(originalPrice, discountPercent)** 
**Función del sistema de precios de BookLoop**
- Calcula precio final de un libro aplicando descuentos
- Valida que el precio original sea positivo
- Valida que el descuento esté entre 0-100%
- Redondea a 2 decimales para moneda
- **Uso real**: Aplicar descuentos "-10%", "-20%", etc. que se ven en las cards

### 2. **validateBook(book)** 
**Función del sistema de validación de BookLoop**
- Valida datos completos de un libro antes de guardarlo
- Verifica título, autor, precio (campos obligatorios)
- Valida ISBN opcional con longitud mínima
- Verifica estados del libro: "Nuevo", "Como Nuevo", "Buen Estado", "Usado", "Aceptable"
- **Uso real**: Validar formularios de "Quiero Vender" y edición de libros

## ✅ Tests Implementados

### BookPrice - 12 Tests
- ✅ Precio sin descuento (assert)
- ✅ 10% descuento (assert)
- ✅ Error precio negativo (assert)
- ✅ 20% descuento (expect)
- ✅ 50% descuento (expect)
- ✅ Error descuento >100% (expect)
- ✅ 25% descuento (should)
- ✅ Precio 0 (should)
- ✅ Redondeo correcto (should)
- ✅ Descuento 0% (expect)
- ✅ Error precio string (assert)
- ✅ Descuento decimal 7.5% (should)

### BookValidation - 13 Tests
- ✅ Libro válido completo (assert)
- ✅ Error sin título (assert)
- ✅ Error objeto null (assert)
- ✅ Libro sin ISBN opcional (expect)
- ✅ Error precio negativo (expect)
- ✅ Error autor vacío (expect)
- ✅ Estado "Como Nuevo" válido (should)
- ✅ Error estado inválido (should)
- ✅ Error ISBN corto (should)
- ✅ Error sin precio (expect)
- ✅ Todos los estados válidos (assert)
- ✅ Spy en trim de título (sinon)
- ✅ Múltiples errores juntos (should)

## 🚀 Cómo Ejecutar

### Instalar dependencias
```bash
npm install
```

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar con cobertura
```bash
npm run test:coverage
```

### Ejecutar tests específicos
```bash
npm run test:price        # Solo tests de precios
npm run test:validation   # Solo tests de validación
```

## 📊 Resultados

```
Tests de BookLoop - Cálculo de Precio de Libros
  ✔ debería calcular precio sin descuento usando assert
  ✔ debería calcular precio con 10% descuento usando assert
  ✔ debería lanzar error con precio negativo usando assert
  ✔ debería calcular precio con 20% descuento usando expect
  ✔ debería calcular precio con 50% descuento usando expect
  ✔ debería lanzar error con descuento mayor a 100 usando expect
  ✔ debería calcular precio con 25% descuento usando should
  ✔ debería manejar precio 0 usando should
  ✔ debería redondear correctamente usando should
  ✔ debería manejar descuento 0% usando expect
  ✔ debería lanzar error con precio string usando assert
  ✔ debería calcular precio con descuento decimal usando should

Tests de BookLoop - Validación de Libros
  ✔ debería validar libro correcto usando assert
  ✔ debería rechazar libro sin título usando assert
  ✔ debería rechazar objeto null usando assert
  ✔ debería validar libro sin ISBN usando expect
  ✔ debería rechazar precio negativo usando expect
  ✔ debería rechazar autor vacío usando expect
  ✔ debería validar estado "Como Nuevo" usando should
  ✔ debería rechazar estado inválido usando should
  ✔ debería rechazar ISBN corto usando should
  ✔ debería manejar libro sin precio usando expect
  ✔ debería validar todos los estados permitidos usando assert
  ✔ debería llamar trim en el título (usando spy)
  ✔ debería retornar múltiples errores usando should

25 passing (14ms)
```

## 📈 Cobertura de Código

```
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |      100 |     100 |     100 |                  
 bookPrice.js      |     100 |      100 |     100 |     100 |                  
 bookValidation.js |     100 |      100 |     100 |     100 |                  
-------------------|---------|----------|---------|---------|-------------------
```

**🎯 100% de cobertura en todas las métricas**

## 🔧 Tecnologías Usadas

- **Mocha**: Framework de testing
- **Chai**: Assertions (assert, expect, should)
- **Sinon**: Dobles de prueba (spies)
- **NYC**: Cobertura de código

## 🎯 Relación con BookLoop

### Funcionalidades Reales Testadas:
- ✅ **Sistema de descuentos** (cards muestran "-10%", "-20%", etc.)
- ✅ **Validación de formularios** (Quiero Vender, Editar Libro)
- ✅ **Estados de libros** (filtros del sidebar)
- ✅ **Cálculos de precios** (carrito, checkout)
- ✅ **Validación de datos** (antes de guardar en BD)

### Casos de Uso Reales:
1. **Usuario vende libro**: `validateBook()` verifica datos del formulario
2. **Aplicar descuento**: `calculateBookPrice()` calcula precio final
3. **Filtrar por estado**: Validación de estados permitidos
4. **Editar libro**: Validación completa de todos los campos
