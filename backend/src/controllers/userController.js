const supabase = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase.from('users').select('*');
    if (error) throw error;
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const { data: user, error } = await supabase.from('users').select('*').eq('id', req.params.id).single();
    if (error) throw error;
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  try {
    console.log('Datos recibidos en login:', req.body);
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }
    
    // Buscar usuario
    const { data: users, error } = await supabase.from('users').select('*').eq('email', email);
    if (error) throw error;
    
    const user = users && users.length > 0 ? users[0] : null;
    if (!user) {
      console.log('Usuario no encontrado con email:', email);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Contraseña inválida para usuario:', email);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    console.log('Login exitoso para usuario:', user.username);
    res.json({
      user: {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`.trim(),
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Crear un nuevo usuario (registro)
const createUser = async (req, res) => {
  try {
    console.log('Datos recibidos en createUser:', req.body);
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });
    }
    
    // Verificar si el usuario ya existe
    const { data: existingUsers, error: checkError } = await supabase.from('users').select('*').eq('email', email);
    if (checkError) throw checkError;
    
    if (existingUsers && existingUsers.length > 0) {
      console.log('Usuario ya existe con email:', email);
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    
    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const nameParts = name.split(' ');
    const first_name = nameParts[0] || name;
    const last_name = nameParts.slice(1).join(' ') || '';
    
    // Crear usuario
    const { data: user, error } = await supabase
      .from('users')
      .insert([{ 
        first_name,
        last_name,
        username: email.split('@')[0], // Usar parte del email como username
        email: email,
        password: hashedPassword
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    console.log('Usuario creado exitosamente:', user.username);
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`.trim(),
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error detallado al crear usuario:', error);
    res.status(500).json({ 
      message: 'Error al crear usuario',
      error: error.message
    });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { data: user, error: getUserError } = await supabase.from('users').select('*').eq('id', req.params.id).single();
    if (getUserError) throw getUserError;
    
    if (user) {
      let updatesToSend = { ...req.body };
      if (req.body.password) {
        updatesToSend.password = await bcrypt.hash(req.body.password, 10);
      }
      const { data: updated, error } = await supabase.from('users').update(updatesToSend).eq('id', req.params.id).select().single();
      if (error) throw error;
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const { data: user, error: getUserError } = await supabase.from('users').select('*').eq('id', req.params.id).single();
    if (getUserError) throw getUserError;
    
    if (user) {
      const { error } = await supabase.from('users').delete().eq('id', req.params.id);
      if (error) throw error;
      res.json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
}; 