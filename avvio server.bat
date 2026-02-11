@echo off
TITLE HOP - Luggage Management System
COLOR 06

:: Controllo installazione Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRORE] Node.js non rilevato.
    pause
    exit
)

echo ==========================================
echo           H.O.P. - HOTEL OPERATIONS PORTER - SERVER
echo ==========================================
echo  Accesso LAN: http://10.141.116.185:3000
echo  Stato: In esecuzione...
echo ------------------------------------------

:: Esecuzione server
node server.js

pause