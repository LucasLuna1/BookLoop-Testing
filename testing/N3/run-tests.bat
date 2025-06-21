@echo off
echo ========================================
echo Ejecutando pruebas de API con Newman
echo ========================================

REM Verificar si Newman está instalado
newman --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Newman no está instalado. Instalando...
    npm install -g newman
)

REM Verificar si htmlextra está instalado
newman-reporter-htmlextra --version >nul 2>&1
if %errorlevel% neq 0 (
    echo htmlextra no está instalado. Instalando...
    npm install -g newman-reporter-htmlextra
)

echo.
echo Ejecutando colección de pruebas...
newman run BookLoop-API.postman_collection.json ^
    -e BookLoop-API.postman_environment.json ^
    -r htmlextra ^
    --reporter-htmlextra-export ./reports/newman-report.html ^
    --reporter-htmlextra-title "BookLoop API Test Report" ^
    --reporter-htmlextra-darkTheme ^
    --reporter-htmlextra-showGlobalData

echo.
echo ========================================
echo Pruebas completadas
echo Reporte generado en: ./reports/newman-report.html
echo ========================================
pause 