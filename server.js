const http = require("http");
const fs = require("fs");

// GET para obtener el contenido del txt
// PUT para modificar el contenido del txt
// En ambos casos, la url será /mensaje
const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  if (req.url === "/mensaje" && req.method === "GET") {
    const infoTxt = fs.readFileSync("message.txt", "utf8");
    res.statusCode = 200;
    res.end(infoTxt);
  } else if (req.url === "/mensaje" && req.method === "POST") {
    const nuevoContenido = "Este es el nuevo contenido generado por el POST";
    fs.writeFileSync("message.txt", nuevoContenido, "utf8");
    res.statusCode = 201;
    res.end("El archivo se modificó exitosamente!!");
  } else if (req.url === "/imagen" && req.method === "GET") {
    if (fs.existsSync("imageCode.png")) {
      const img = fs.readFileSync("imageCode.png");
      res.setHeader("Content-Type", "image/png");
      res.statusCode = 200;
      res.end(img);
    } else {
      res.statusCode = 404;
      res.end("No existe ninguna imagen");
    }
  } else if (req.url === "/imagen" && req.method === "POST") {
    //vamos a simular que el cliente sube una imagen al sistema
    if (fs.existsSync("imageCode.png")) {
      fs.copyFileSync("imageCode.png", "imageCode.png");
      res.statusCode = 201;
      res.end("La imagen se creó de manera exitosa!!");
    } else {
      res.statusCode = 404;
      res.end("La imagen no pudo crearse :(");
    }
  } else if (req.url === "/imagen" && req.method === "DELETE") {
    if (fs.existsSync("imageCode.png")) {
      fs.unlinkSync("imageCode.png");
      res.statusCode = 200;
      res.end("La imagen se eliminó correctamente!");
    } else {
      res.statusCode = 404;
      res.end("No hay imagen para eliminar :(");
    }
  } else {
    res.statusCode = 404;
    res.end("Página no encontrada");
  }
});

server.listen(3000, function () {
  console.log("Escuchando en el puerto 3000");
});
