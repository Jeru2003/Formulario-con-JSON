const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Asegúrate de que esta ruta sea correcta
});

// Ruta para obtener usuarios desde el archivo JSON
app.get('/usuarios', (req, res) => {
    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }
        res.send(JSON.parse(data));
    });
});

// Ruta para agregar usuarios al archivo JSON
app.post('/usuarios', (req, res) => {
    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }

        let usuarios = JSON.parse(data);
        usuarios.push(req.body);

        fs.writeFile('usuarios.json', JSON.stringify(usuarios, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el archivo');
            }
            res.send('Usuario agregado exitosamente');
        });
    });
});

// Ruta adicional para /sale
app.get('/sale', (req, res) => {
    res.send('Esta es la página de venta');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
