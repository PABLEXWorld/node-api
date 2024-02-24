// importar librerías
const express = require("express");
const mysql = require("mysql");

// datos de conexión a DB
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'pablex12345',
    database : 'test'
});

// conectar a DB
connection.connect();

// instanciar servidor HTTP
const app = express();
const port = 3000;

// Setear propiedades
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Setear endpoints
  // Ejecutar este código cuando se recibe una petición GET a este endpoint
app.get("/", (req, res) => {
  // Realizar solicitud de DB
  connection.query('SELECT * from producto;', function (error, results, fields) {
    // En caso de error, explotar
    if (error) throw error;
    // En caso de éxito, convertir retorno de DB a JSON
    res.json(results);
  });
});

// Abrir puerto y quedarse abierto esperando conexiones
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});