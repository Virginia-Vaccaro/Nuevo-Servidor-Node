// Vamos a transformar nuestro servidor,  incluyendo Promesas
// Las promesas pueden estar en 3 estados: pendiente, resuelta, rechazada
// Métodos que implementan las promesas:
// .then() -> devolver un resultado exitoso
// .catch() -> capturar errores y devolver una respuesta en consecuencia

const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(function (req, res) {
  if (req.url === "/mensaje" && req.method === "GET") {
    fs.readFile("mege.txt", "utf8")
      .then((data) => {
        res.statusCode = 200;
        res.end(data);
      })
      .catch((err) => {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("El archivo no fue encontrado");
        } else {
          res.statusCode = 500;
          res.end("Error interno al leer el archivo");
        }
      });
  } else if (req.url === "/mensaje" && req.method === "POST") {
    const nuevoContenido = "Este es el nuevo contenido generado por el POST";
    fs.writeFile("message.txt", nuevoContenido, "utf8")
      .then(() => {
        res.statusCode = 201;
        res.end("La creación del txt se procesó con éxito!");
      })
      .catch((err) => {
        if (err.code === "EACCES") {
          res.statusCode = 403;
          res.end("No se poseen permisos para la acción solicitada");
        } else {
          res.statusCode = 500;
          res.end("Error interno al crear el archivo");
        }
      });
  } else if (req.url === "/imagen" && req.method === "GET") {
    fs.readFile("imageCode.png", (err, img) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("Imagen no encontrada");
        } else {
          res.statusCode = 500;
          res.end("Error al leer el archivo");
        }
      } else {
        res.setHeader("Content-Type", "image/png");
        res.end(img);
      }
    });
  } else if (req.url === "/imagen" && req.method === "POST") {
    //simular que subimos una imagen
    fs.copyFile("imageCode.png", "imageCode.png", (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("No se pudo copiar la imagen");
      } else {
        res.statusCode = 201;
        res.end("Imagen creada correctamente");
      }
    });
  } else if (req.url === "/imagen" && req.method === "DELETE") {
    fs.unlink("imageCode.png", (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("No hay imagen para eliminar.");
        } else {
          res.statusCode = 500;
          res.end("Error al eliminar la imagen");
        }
      } else {
        res.end("La imagen se eliminó de manera exitosa.");
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Página no encontrada");
  }
});

server.listen(0, function () {
  console.log(`Escuchando en el puerto ${server.address().port}`);
});
