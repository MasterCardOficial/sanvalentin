const express = require('express');
const path = require('path');
const app = express();

// Puerto que Render asigna automáticamente
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
    console.log(`🌸 San Valentín para Marianita`);
});
