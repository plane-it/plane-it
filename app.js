process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuarios");
const avisosRouter = require("./src/routes/avisos");
const empresaRouter = require("./src/routes/empresa");
const contatoRouter = require("./src/routes/contato");
const cpuRouter = require("./src/routes/dadosCpu");
const alertasRouter = require("./src/routes/alertas")
const perfilRouter = require("./src/routes/perfil");
const aeroportoRouter = require("./src/routes/aeroporto");
const servidorRouter = require("./src/routes/servidor");
const registrosRouter = require("./src/routes/registros");
const componenteRouter = require("./src/routes/componente");
const cronogramaRouter = require("./src/routes/cronograma");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/dadosCpu",cpuRouter);
// app.use("/medidas", medidasRouter);
app.use("/empresa", empresaRouter);
app.use("/contato",contatoRouter);
app.use("/perfil",perfilRouter);
app.use("/aeroporto", aeroportoRouter);
app.use("/servidor", servidorRouter);
app.use("/alertas", alertasRouter)
app.use("/registros", registrosRouter);
app.use("/componente", componenteRouter);
app.use("/cronograma", cronogramaRouter);





app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
