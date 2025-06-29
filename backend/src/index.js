const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/../.env' });

// Verificar variables de entorno relevantes para Supabase
console.log('Verificando variables de entorno:', {
  SUPABASE_URL: process.env.SUPABASE_URL,
  PORT: process.env.PORT
});

const Category = require('./models/Category');
const { testConnection, testTables } = require('./controllers/testController');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/../uploads'));

// Variables de entorno
const PORT = process.env.PORT || 5000;

// Rutas de prueba
app.get('/test/connection', testConnection);
app.get('/test/tables', testTables);

// Rutas principales
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Ruta básica
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de BookLoop' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

// Sincronizar base de datos y iniciar servidor
const startServer = async () => {
  try {
    await Category.seedCategories();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();