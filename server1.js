const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  if (req.url === "/mensaje" && req.method === "GET") {
    fs.readFile("mege.txt", "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("El archivo no fue encontrado");
        } else {
          res.statusCode = 500;
          res.end("Error interno al leer el archivo");
        }
      } else {
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else if (req.url === "/mensaje" && req.method === "POST") {
    const nuevoContenido = "Este es el nuevo contenido generado por el POST";
    fs.writeFile("message.txt", nuevoContenido, "utf8", (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("No se pudo crear el archivo");
      } else {
        res.statusCode = 201;
        res.end("El archivo se creó de manera exitosa");
      }
    });
  } else if (req.url === "/imagen" && req.method === "GET") {
    fs.readFile("imageCode.png", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("La imagen no fue encontrada");
        } else {
          res.statusCode = 500;
          res.end("Error interno al leer la imagen");
        }
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });
  } else if (req.url === "/imagen" && req.method === "POST") {
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
