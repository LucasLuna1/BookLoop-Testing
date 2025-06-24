const supabase = require('../config/db');

// Obtener todos los favoritos
const getUserWishlist = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'Se requiere el ID del usuario' });
    }

    console.log('Obteniendo wishlist para usuario:', userId);

    // Primero obtener los items de wishlist
    const { data: wishlistItems, error: wishlistError } = await supabase
      .from('wishlist')
      .select('id, user_id, book_id')
      .eq('user_id', userId);

    if (wishlistError) {
      console.error('Error en query wishlist:', wishlistError);
      return res.status(500).json({ 
        error: 'Error al obtener favoritos',
        details: wishlistError.message 
      });
    }

    if (wishlistItems.length === 0) {
      return res.status(200).json([]);
    }

    // Obtener los IDs de los libros
    const bookIds = wishlistItems.map(item => item.book_id);

    // Obtener los libros
    const { data: books, error: booksError } = await supabase
      .from('books')
      .select('*')
      .in('id', bookIds);

    if (booksError) {
      console.error('Error obteniendo libros:', booksError);
      return res.status(500).json({ 
        error: 'Error al obtener libros de favoritos',
        details: booksError.message 
      });
    }

    // Obtener datos de vendedores y categorías
    const sellerIds = [...new Set(books.map(book => book.seller_id))];
    const categoryIds = [...new Set(books.map(book => book.category_id).filter(Boolean))];

    const { data: sellers, error: sellersError } = await supabase
      .from('users')
      .select('id, first_name, last_name, username, email')
      .in('id', sellerIds);

    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, category_name')
      .in('id', categoryIds);

    // Crear mapas para búsqueda rápida
    const sellersMap = {};
    if (sellers) {
      sellers.forEach(seller => {
        sellersMap[seller.id] = seller;
      });
    }

    const categoriesMap = {};
    if (categories) {
      categories.forEach(category => {
        categoriesMap[category.id] = category;
      });
    }

    // Procesar los datos para que coincidan con el formato esperado
    const processedData = wishlistItems.map(item => {
      const book = books.find(b => b.id === item.book_id);
      if (!book) return null;

      const seller = sellersMap[book.seller_id];
      const category = categoriesMap[book.category_id];

      return {
        wishlist_id: item.id,
        user_id: item.user_id,
        book_id: item.book_id,
        Book: {
          book_id: book.id,
          title: book.title,
          authors: book.author,
          price: book.price,
          description: book.description,
          condition: book.condition,
          image_url: book.image_url,
          created_at: book.created_at,
          seller: seller ? `${seller.first_name} ${seller.last_name}`.trim() : 'Usuario desconocido',
          category: category?.category_name || 'Sin categoría'
        }
      };
    }).filter(Boolean);

    res.status(200).json(processedData);
  } catch (error) {
    console.error('Error al obtener wishlist:', error);
    res.status(500).json({ 
      error: 'Error al obtener favoritos',
      details: error.message 
    });
  }
};

// Agregar un libro a favoritos
const addToWishlist = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    if (!bookId || !userId) {
      return res.status(400).json({ error: 'Se requiere el ID del libro y del usuario' });
    }

    console.log('Agregando a wishlist:', { bookId, userId });

    // Verificar si el libro existe
    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('id')
      .eq('id', bookId)
      .single();

    if (bookError || !book) {
      return res.status(404).json({ error: 'El libro no existe' });
    }

    // Verificar si ya está en favoritos
    const { data: existing, error: existingError } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .single();

    if (existingError && existingError.code !== 'PGRST116') {
      console.error('Error checking existing wishlist:', existingError);
      return res.status(500).json({ error: 'Error al verificar favoritos existentes' });
    }

    if (existing) {
      return res.status(400).json({ error: 'El libro ya está en favoritos' });
    }

    // Crear el nuevo favorito
    const { data: newFavorite, error: insertError } = await supabase
      .from('wishlist')
      .insert({
        user_id: userId,
        book_id: bookId
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting wishlist:', insertError);
      return res.status(500).json({ 
        error: 'Error al agregar a favoritos',
        details: insertError.message 
      });
    }

    console.log('Favorito agregado:', newFavorite);
    res.status(201).json(newFavorite);
  } catch (error) {
    console.error('Error al agregar a wishlist:', error);
    res.status(500).json({ 
      error: 'Error al agregar a favoritos',
      details: error.message 
    });
  }
};

// Eliminar un libro de favoritos
const removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.query;
    
    if (!bookId || !userId) {
      return res.status(400).json({ error: 'Se requiere el ID del libro y del usuario' });
    }

    console.log('Eliminando de wishlist:', { bookId, userId });

    // Buscar el item a eliminar
    const { data: item, error: findError } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding wishlist item:', findError);
      return res.status(500).json({ 
        error: 'Error al buscar favorito',
        details: findError.message 
      });
    }

    if (!item) {
      return res.status(404).json({ error: 'Libro no encontrado en favoritos' });
    }

    // Eliminar el favorito
    const { error: deleteError } = await supabase
      .from('wishlist')
      .delete()
      .eq('id', item.id);

    if (deleteError) {
      console.error('Error deleting wishlist item:', deleteError);
      return res.status(500).json({ 
        error: 'Error al eliminar favorito',
        details: deleteError.message 
      });
    }

    console.log('Favorito eliminado exitosamente');
    res.status(200).json({ message: 'Libro eliminado de favoritos' });
  } catch (error) {
    console.error('Error al eliminar de wishlist:', error);
    res.status(500).json({ 
      error: 'Error al eliminar de favoritos',
      details: error.message 
    });
  }
};

// Verificar si un libro está en favoritos
const checkWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.query;
    if (!bookId || !userId) {
      return res.status(400).json({ error: 'Se requiere el ID del libro y del usuario' });
    }

    console.log('Verificando wishlist:', { bookId, userId });

    // Buscar si existe el favorito
    const { data: item, error } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking wishlist:', error);
      return res.status(500).json({ 
        error: 'Error al verificar favoritos',
        details: error.message 
      });
    }

    const isFavorite = !!item;
    console.log('Es favorito:', isFavorite);
    
    res.status(200).json({ isFavorite });
  } catch (error) {
    console.error('Error al verificar wishlist:', error);
    res.status(500).json({ 
      error: 'Error al verificar favoritos',
      details: error.message 
    });
  }
};

module.exports = {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist
};