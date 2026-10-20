// Vamos a trabajar de manera asíncrona, utilizando async-await

// async -> la vamos a escribir al inicio de nuestro server, cuando lo estamos creando

// await -> la vamos a escribir delante de la función que queremos que ejecute el server
// con ella esperamos la resolución de la promesa

const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.statusCode = 200;

  try {
    if (req.url === "/mensaje" && req.method === "GET") {
      const data = await fs.readFile("message.txt", "utf8");
      res.end(data);
    } else if (req.url === "/mensaje" && req.method === "POST") {
      const nuevoContenido = "Este es el nuevo contenido generado por el POST";
      await fs.writeFile("message.txt", nuevoContenido, "utf8");
      res.statusCode = 201;
      res.end("La creación del txt se procesó con éxito!");
    } else if (req.url === "/imagen" && req.method === "GET") {
      const img = await fs.readFile("imageCode.png");
      res.setHeader("Content-Type", "image/png");
      res.end(img);
    } else if (req.url === "/imagen" && req.method === "POST") {
      await fs.copyFile("imageCode.png", "imageCode.png");
      res.statusCode = 201;
      res.end("La imagen se creó de manera exitosa!!");
    } else if (req.url === "/imagen" && req.method === "DELETE") {
      await fs.unlink("imageCode.png");
      res.end("La imagen se eliminó correctamente!");
    } else {
      res.statusCode = 404;
      res.end("Página no encontrada");
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      res.statusCode = 404;
      res.end("El archivo no fue encontrado");
    } else if (err.code === "EACCES") {
      res.statusCode = 403;
      res.end("No se poseen permisos para la acción solicitada");
    } else {
      res.statusCode = 500;
      res.end("Error interno del servidor");
    }
  }
});

server.listen(0, function () {
  console.log(`Escuchando en el puerto ${server.address().port}`);
});
