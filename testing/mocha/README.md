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