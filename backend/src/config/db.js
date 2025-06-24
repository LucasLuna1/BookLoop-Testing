// Configuración de base de datos usando Supabase
require('dotenv').config();
const { supabase } = require('./supabase');

module.exports = supabase;
