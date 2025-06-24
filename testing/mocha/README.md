# Mocha Tests - BookLoop

Este directorio contiene tests específicos para BookLoop usando **Mocha** como framework de testing.

## 📁 Estructura

```
testing/mocha/
├── test/
│   ├── api.test.js          # Tests de API endpoints de BookLoop
│   ├── auth.test.js         # Tests de autenticación real
│   └── database.test.js     # Tests de base de datos Supabase
├── package.json
└── README.md
```

## 🧪 Tests Específicos de BookLoop

### 1. API Tests (api.test.js)
Tests de endpoints reales de la API de BookLoop:

- **Books API**:
  - ✅ GET /api/books - Obtener todos los libros
  - ✅ GET /api/books/:id - Obtener libro específico

- **Users API**:
  - ✅ GET /api/users - Obtener todos los usuarios
  - ✅ POST /api/users/login - Login con credenciales inválidas

- **Categories API**:
  - ✅ GET /api/categories - Obtener todas las categorías

- **Error Handling**:
  - ✅ 404 para endpoints inexistentes

### 2. Auth Tests (auth.test.js)
Tests de autenticación real con Supabase:

- **Registro de usuario**:
  - ✅ Registro exitoso con datos válidos
  - ✅ Error con email duplicado
  - ✅ Error con datos inválidos

- **Login de usuario**:
  - ✅ Login exitoso con credenciales válidas
  - ✅ Error con credenciales inválidas

- **Validación de tokens**:
  - ✅ Token válido JWT
  - ✅ Token inválido o expirado

### 3. Database Tests (database.test.js)
Tests de operaciones con Supabase:

- **Conexión**:
  - ✅ Conexión exitosa a Supabase
  - ✅ Variables de entorno configuradas

- **Operaciones CRUD**:
  - ✅ Insertar datos de prueba
  - ✅ Consultar datos existentes
  - ✅ Actualizar registros
  - ✅ Eliminar datos de prueba

## 🚀 Cómo ejecutar

### Prerequisitos
```bash
cd testing/mocha
npm install
```

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests específicos
```bash
# Solo tests de API
npx mocha test/api.test.js

# Solo tests de autenticación
npx mocha test/auth.test.js

# Solo tests de base de datos
npx mocha test/database.test.js
```

### Ejecutar con modo watch
```bash
npm run test:watch
```

### Ejecutar con coverage
```bash
npm run test:coverage
```

## 📊 Ejemplo de salida

```
BookLoop API Tests
  Books API
    ✓ should GET all books (245ms)
    ✓ should GET a specific book by ID (156ms)
  Users API
    ✓ should GET all users (134ms)
    ✓ should handle invalid user login (89ms)
  Categories API
    ✓ should GET all categories (98ms)
  Error Handling
    ✓ should return 404 for non-existent endpoint (45ms)

BookLoop Auth Tests
  User Registration
    ✓ should register user with valid data (345ms)
    ✓ should reject duplicate email (234ms)
  User Login
    ✓ should login with valid credentials (298ms)
    ✓ should reject invalid credentials (156ms)

BookLoop Database Tests
  Database Connection
    ✓ should connect to Supabase successfully (123ms)
    ✓ should have environment variables configured (12ms)
  CRUD Operations
    ✓ should insert test data (234ms)
    ✓ should query existing data (145ms)
    ✓ should update records (198ms)
    ✓ should delete test data (167ms)

  16 passing (2.1s)
```

## 🔧 Configuración

### Variables de entorno necesarias
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_service_key
API_URL=http://localhost:5000
```

### Dependencias principales
- **Mocha**: Framework de testing
- **Chai**: Librería de assertions
- **Chai-HTTP**: Para tests de API HTTP
- **Supertest**: Para tests de endpoints
- **Sinon**: Para mocks y spies

## 📝 Funcionalidades Testadas

### Específicas de BookLoop:
- ✅ **API REST completa** (Books, Users, Categories)
- ✅ **Sistema de autenticación** con Supabase
- ✅ **Base de datos** operaciones CRUD
- ✅ **Manejo de errores** HTTP
- ✅ **Validación de tokens** JWT
- ✅ **Endpoints reales** del proyecto

### NO incluye:
- ❌ Funciones genéricas (formatPrice, truncateText, etc.)
- ❌ Validaciones abstractas
- ❌ Tests académicos sin relación al proyecto

## 🎯 Integración con BookLoop

Estos tests están diseñados para:

1. **Verificar API endpoints** que usa el frontend
2. **Validar autenticación** real con Supabase
3. **Probar base de datos** con datos reales
4. **Detectar regresiones** en funcionalidades críticas
5. **Asegurar calidad** antes de deploy

Todos los tests interactúan con los **servicios reales** de BookLoop y validan el comportamiento esperado del sistema completo. 