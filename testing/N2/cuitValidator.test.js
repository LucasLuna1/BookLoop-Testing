const validaCUIT = require('./cuitValidator');
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const sinon = require('sinon');

describe('Función validaCUIT', function() {
  it('debería validar CUIT válido de persona física', function() {
    assert.isTrue(validaCUIT('20123456789'));
  });
  it('debería validar CUIT válido de empresa', function() {
    assert.isTrue(validaCUIT('30123456789'));
  });
  it('debería rechazar CUIT con formato inválido', function() {
    assert.isFalse(validaCUIT('123456789'));
  });
  it('debería validar CUIT con guiones', function() {
    validaCUIT('20-12345678-9').should.be.true;
  });
  it('debería validar CUIT con espacios', function() {
    validaCUIT('20 12345678 9').should.be.true;
  });
  it('debería rechazar CUIT con tipo inválido', function() {
    validaCUIT('25123456789').should.be.false;
  });
  it('debería validar diferentes tipos de CUIT válidos', function() {
    expect(validaCUIT('20123456789')).to.be.true;
    expect(validaCUIT('23123456789')).to.be.true;
    expect(validaCUIT('24123456789')).to.be.true;
    expect(validaCUIT('27123456789')).to.be.true;
    expect(validaCUIT('30123456789')).to.be.true;
    expect(validaCUIT('33123456789')).to.be.true;
    expect(validaCUIT('34123456789')).to.be.true;
  });
  it('debería rechazar CUIT con dígito verificador incorrecto', function() {
    expect(validaCUIT('20123456780')).to.be.false;
  });
  it('debería manejar entrada numérica', function() {
    expect(validaCUIT(20123456789)).to.be.true;
  });
  it('debería rechazar entrada vacía o nula', function() {
    expect(validaCUIT('')).to.be.false;
    expect(validaCUIT(null)).to.be.false;
    expect(validaCUIT(undefined)).to.be.false;
  });
  it('debería usar spy para verificar llamadas', function() {
    const validaCUITSpy = sinon.spy(validaCUIT);
    validaCUITSpy('20123456789');
    validaCUITSpy('25123456789');
    expect(validaCUITSpy.callCount).to.equal(2);
    expect(validaCUITSpy.firstCall.returnValue).to.be.true;
    expect(validaCUITSpy.secondCall.returnValue).to.be.false;
  });
}); 