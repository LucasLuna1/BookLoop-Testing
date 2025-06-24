const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const sinon = require('sinon');
const validateBook = require('./bookValidation');

describe('Tests de BookLoop - Validación de Libros', () => {

  // Libro válido para tests
  const validBook = {
    title: 'El Señor de los Anillos',
    author: 'J.R.R. Tolkien',
    price: 25.99,
    isbn: '9780261102385',
    condition: 'Nuevo'
  };

  // Tests con ASSERT
  it('debería validar libro correcto usando assert', () => {
    const result = validateBook(validBook);
    assert.equal(result.valid, true);
    assert.equal(result.errors.length, 0);
  });

  it('debería rechazar libro sin título usando assert', () => {
    const invalidBook = { ...validBook, title: '' };
    const result = validateBook(invalidBook);
    assert.equal(result.valid, false);
    assert.ok(result.errors.length > 0);
  });

  it('debería rechazar objeto null usando assert', () => {
    const result = validateBook(null);
    assert.equal(result.valid, false);
  });

  // Tests con EXPECT
  it('debería validar libro sin ISBN usando expect', () => {
    const bookWithoutISBN = { ...validBook };
    delete bookWithoutISBN.isbn;
    const result = validateBook(bookWithoutISBN);
    expect(result.valid).to.be.true;
  });

  it('debería rechazar precio negativo usando expect', () => {
    const invalidBook = { ...validBook, price: -10 };
    const result = validateBook(invalidBook);
    expect(result.valid).to.be.false;
    expect(result.errors).to.include('El precio debe ser un número positivo');
  });

  it('debería rechazar autor vacío usando expect', () => {
    const invalidBook = { ...validBook, author: '   ' };
    const result = validateBook(invalidBook);
    expect(result.valid).to.be.false;
  });

  // Tests con SHOULD
  it('debería validar estado "Como Nuevo" usando should', () => {
    const bookCondition = { ...validBook, condition: 'Como Nuevo' };
    const result = validateBook(bookCondition);
    result.valid.should.be.true;
  });

  it('debería rechazar estado inválido usando should', () => {
    const invalidBook = { ...validBook, condition: 'Destruido' };
    const result = validateBook(invalidBook);
    result.valid.should.be.false;
  });

  it('debería rechazar ISBN corto usando should', () => {
    const invalidBook = { ...validBook, isbn: '123' };
    const result = validateBook(invalidBook);
    result.valid.should.be.false;
  });

  // Tests adicionales
  it('debería manejar libro sin precio usando expect', () => {
    const bookWithoutPrice = { ...validBook };
    delete bookWithoutPrice.price;
    const result = validateBook(bookWithoutPrice);
    expect(result.valid).to.be.false;
    expect(result.errors).to.include('El precio es requerido');
  });

  it('debería validar todos los estados permitidos usando assert', () => {
    const validConditions = ['Nuevo', 'Como Nuevo', 'Buen Estado', 'Usado', 'Aceptable'];
    validConditions.forEach(condition => {
      const book = { ...validBook, condition };
      const result = validateBook(book);
      assert.equal(result.valid, true, `Condición ${condition} debería ser válida`);
    });
  });

  // Test con doble de prueba (Sinon)
  it('debería llamar trim en el título (usando spy)', () => {
    const spy = sinon.spy(String.prototype, 'trim');
    const book = { ...validBook, title: '  El Quijote  ' };
    validateBook(book);
    expect(spy.called).to.be.true;
    spy.restore();
  });

  it('debería retornar múltiples errores usando should', () => {
    const invalidBook = {
      title: '',
      author: '',
      price: -5,
      isbn: '123'
    };
    const result = validateBook(invalidBook);
    result.valid.should.be.false;
    result.errors.length.should.be.greaterThan(3);
  });

}); 