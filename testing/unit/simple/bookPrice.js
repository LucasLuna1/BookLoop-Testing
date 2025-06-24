// Función para calcular precio final de un libro con descuento
function calculateBookPrice(originalPrice, discountPercent = 0) {
  if (typeof originalPrice !== 'number' || originalPrice < 0) {
    throw new Error('El precio debe ser un número positivo');
  }
  
  if (typeof discountPercent !== 'number' || discountPercent < 0 || discountPercent > 100) {
    throw new Error('El descuento debe ser un número entre 0 y 100');
  }
  
  const discount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discount;
  
  return Math.round(finalPrice * 100) / 100; // Redondear a 2 decimales
}

module.exports = calculateBookPrice; 