const supabase = require('../config/db');


// Obtener todos los libros
async function getAllBooks() {
  const { data, error } = await supabase.from('books').select('*');
  if (error) throw error;
  return data;
}

// Obtener un libro por ID
async function getBookById(book_id) {
  const { data, error } = await supabase
    .from('books')
    .select('*, seller:seller_id(id, first_name, last_name, username, email), category:category_id(id, name)')
    .eq('id', book_id)
    .single();
  if (error) throw error;
  return data;
}

// Crear un libro
async function createBook(book) {
  const { data, error } = await supabase.from('books').insert([book]).select().single();
  if (error) throw error;
  return data;
}

// Actualizar un libro
async function updateBook(book_id, updates) {
  const { data, error } = await supabase.from('books').update(updates).eq('id', book_id).select().single();
  if (error) throw error;
  return data;
}

// Eliminar un libro
async function deleteBook(book_id) {
  const { error } = await supabase.from('books').delete().eq('id', book_id);
  if (error) throw error;
  return { success: true };
}

// Obtener libros por usuario vendedor
async function getBooksByUser(user_id) {
  const { data, error } = await supabase.from('books').select('*').eq('seller_id', user_id);
  if (error) throw error;
  return data;
}

// Actualizar solo la portada de un libro
async function updateBookCover(book_id, image_url) {
  const { data, error } = await supabase.from('books').update({ image_url }).eq('id', book_id).select().single();
  if (error) throw error;
  return data;
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBooksByUser,
  updateBookCover
};