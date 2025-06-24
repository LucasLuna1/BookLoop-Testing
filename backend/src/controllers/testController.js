const { supabase } = require('../config/supabase');

// Probar conexión básica
const testConnection = async (req, res) => {
  try {
    console.log('Probando conexión con Supabase...');
    
    // Probar query simple
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Error en test:', error);
      return res.status(500).json({ 
        error: 'Error de conexión con Supabase',
        details: error.message 
      });
    }
    
    res.json({ 
      message: 'Conexión exitosa con Supabase',
      data 
    });
  } catch (error) {
    console.error('Error en test:', error);
    res.status(500).json({ 
      error: 'Error en test de conexión',
      details: error.message 
    });
  }
};

// Probar estructura de tablas
const testTables = async (req, res) => {
  try {
    console.log('Probando estructura de tablas...');
    
    // Probar cada tabla
    const tables = ['users', 'books', 'categories', 'wishlist'];
    const results = {};
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          results[table] = { error: error.message };
        } else {
          results[table] = { success: true, count: data.length };
        }
      } catch (err) {
        results[table] = { error: err.message };
      }
    }
    
    res.json({ 
      message: 'Test de tablas completado',
      results 
    });
  } catch (error) {
    console.error('Error en test de tablas:', error);
    res.status(500).json({ 
      error: 'Error en test de tablas',
      details: error.message 
    });
  }
};

module.exports = {
  testConnection,
  testTables
};