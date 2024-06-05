const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Caminhos dos arquivos
const dbFile = path.join(__dirname, "data.json");
const tmpDbFile = path.join(os.tmpdir(), "data.json");

// Copiar data.json para o diretório temporário
fs.copyFileSync(dbFile, tmpDbFile);

const server = jsonServer.create();
const router = jsonServer.router(tmpDbFile);
const middlewares = jsonServer.defaults();

// Middleware CORS
const cors = require("cors");
server.use(
  cors({
    origin: "*", // Permitir todas as origens. Para mais segurança, especifique os domínios permitidos.
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
