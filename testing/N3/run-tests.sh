#!/bin/bash

echo "========================================"
echo "Ejecutando pruebas de API con Newman"
echo "========================================"

# Verificar si Newman está instalado
if ! command -v newman &> /dev/null; then
    echo "Newman no está instalado. Instalando..."
    npm install -g newman
fi

# Verificar si htmlextra está instalado
if ! command -v newman-reporter-htmlextra &> /dev/null; then
    echo "htmlextra no está instalado. Instalando..."
    npm install -g newman-reporter-htmlextra
fi

echo ""
echo "Ejecutando colección de pruebas..."
newman run BookLoop-API.postman_collection.json \
    -e BookLoop-API.postman_environment.json \
    -r htmlextra \
    --reporter-htmlextra-export ./reports/newman-report.html \
    --reporter-htmlextra-title "BookLoop API Test Report" \
    --reporter-htmlextra-darkTheme \
    --reporter-htmlextra-showGlobalData

echo ""
echo "========================================"
echo "Pruebas completadas"
echo "Reporte generado en: ./reports/newman-report.html"
echo "========================================" 