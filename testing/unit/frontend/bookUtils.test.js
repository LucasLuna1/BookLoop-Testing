import { getBookImage, getBookAuthor } from '../../../frontend/src/utils/bookUtils';

describe('BookUtils Unit Tests', () => {
  
  // Test 1: getBookImage con imagen válida
  test('should return correct image URL when book has coverimageurl', () => {
    const book = {
      coverimageurl: 'https://example.com/book-cover.jpg',
      title: 'Test Book'
    };
    const apiUrl = 'http://localhost:5000';
    
    const result = getBookImage(book, apiUrl);
    
    expect(result).toBe('https://example.com/book-cover.jpg');
  });

  // Test 2: getBookImage con imagen por defecto
  test('should return default image when book has no image', () => {
    const book = {
      title: 'Test Book'
    };
    const apiUrl = 'http://localhost:5000';
    
    const result = getBookImage(book, apiUrl);
    
    expect(result).toBe('/icono2.png');
  });

  // Test 3: getBookAuthor con autor válido
  test('should return author name when book has author field', () => {
    const book = {
      author: 'Gabriel García Márquez',
      title: 'Cien años de soledad'
    };
    
    const result = getBookAuthor(book);
    
    expect(result).toBe('Gabriel García Márquez');
  });

  // Test 4: getBookAuthor sin autor
  test('should return default text when book has no author', () => {
    const book = {
      title: 'Test Book'
    };
    
    const result = getBookAuthor(book);
    
    expect(result).toBe('Autor desconocido');
  });

}); 