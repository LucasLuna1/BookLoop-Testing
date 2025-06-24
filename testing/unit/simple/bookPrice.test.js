const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const calculateBookPrice = require('./bookPrice');

describe('Tests de BookLoop - Cálculo de Precio de Libros', () => {
  
  // Tests con ASSERT
  it('debería calcular precio sin descuento usando assert', () => {
    assert.equal(calculateBookPrice(25.99), 25.99);
  });

  it('debería calcular precio con 10% descuento usando assert', () => {
    assert.equal(calculateBookPrice(20, 10), 18);
  });

  it('debería lanzar error con precio negativo usando assert', () => {
    assert.throws(() => calculateBookPrice(-10), Error, 'El precio debe ser un número positivo');
  });

  // Tests con EXPECT
  it('debería calcular precio con 20% descuento usando expect', () => {
    expect(calculateBookPrice(15.50, 20)).to.equal(12.4);
  });

  it('debería calcular precio con 50% descuento usando expect', () => {
    expect(calculateBookPrice(30, 50)).to.equal(15);
  });

  it('debería lanzar error con descuento mayor a 100 usando expect', () => {
    expect(() => calculateBookPrice(25, 150)).to.throw('El descuento debe ser un número entre 0 y 100');
  });

  // Tests con SHOULD
  it('debería calcular precio con 25% descuento usando should', () => {
    calculateBookPrice(40, 25).should.equal(30);
  });

  it('debería manejar precio 0 usando should', () => {
    calculateBookPrice(0, 10).should.equal(0);
  });

  it('debería redondear correctamente usando should', () => {
    calculateBookPrice(19.99, 15).should.equal(16.99);
  });

  // Tests adicionales
  it('debería manejar descuento 0% usando expect', () => {
    expect(calculateBookPrice(12.50, 0)).to.equal(12.50);
  });

  it('debería lanzar error con precio string usando assert', () => {
    assert.throws(() => calculateBookPrice('25.99'), Error);
  });

  it('debería calcular precio con descuento decimal usando should', () => {
    calculateBookPrice(100, 7.5).should.equal(92.5);
  });

}); 