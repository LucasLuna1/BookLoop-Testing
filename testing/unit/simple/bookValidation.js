// Función para validar datos de un libro en BookLoop
function validateBook(book) {
  if (!book || typeof book !== 'object') {
    return { valid: false, errors: ['El libro debe ser un objeto'] };
  }

  const errors = [];

  // Validar título
  if (!book.title || typeof book.title !== 'string' || book.title.trim().length === 0) {
    errors.push('El título es requerido y debe ser un string no vacío');
  }

  // Validar autor
  if (!book.author || typeof book.author !== 'string' || book.author.trim().length === 0) {
    errors.push('El autor es requerido y debe ser un string no vacío');
  }

  // Validar precio
  if (book.price === undefined || book.price === null) {
    errors.push('El precio es requerido');
  } else if (typeof book.price !== 'number' || book.price < 0) {
    errors.push('El precio debe ser un número positivo');
  }

  // Validar ISBN (opcional pero si está presente debe ser válido)
  if (book.isbn && (typeof book.isbn !== 'string' || book.isbn.length < 10)) {
    errors.push('El ISBN debe tener al menos 10 caracteres');
  }

  // Validar estado del libro
  const validConditions = ['Nuevo', 'Como Nuevo', 'Buen Estado', 'Usado', 'Aceptable'];
  if (book.condition && !validConditions.includes(book.condition)) {
    errors.push('El estado del libro debe ser uno de: ' + validConditions.join(', '));
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}

module.exports = validateBook; 