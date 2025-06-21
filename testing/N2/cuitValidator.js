function validaCUIT(cuit) {
    const cuitStr = String(cuit).replace(/[\s-]/g, '');
    if (!/^\d{11}$/.test(cuitStr)) return false;
    const tipo = parseInt(cuitStr.substring(0, 2));
    const tiposValidos = [20, 23, 24, 27, 30, 33, 34];
    if (!tiposValidos.includes(tipo)) return false;
    const digitos = cuitStr.split('').map(d => parseInt(d));
    const multiplicadores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;
    for (let i = 0; i < 10; i++) {
        suma += digitos[i] * multiplicadores[i];
    }
    const resto = suma % 11;
    let digitoVerificadorEsperado;
    if (resto === 0) {
        digitoVerificadorEsperado = 0;
    } else if (resto === 1) {
        if (tipo === 20 || tipo === 23 || tipo === 24 || tipo === 27) {
            digitoVerificadorEsperado = 9;
        } else {
            digitoVerificadorEsperado = 4;
        }
    } else {
        digitoVerificadorEsperado = 11 - resto;
    }
    return digitos[10] === digitoVerificadorEsperado;
}

module.exports = validaCUIT; 