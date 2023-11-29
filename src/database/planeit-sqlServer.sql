IF EXISTS (SELECT * FROM sys.databases WHERE name = 'planeit')
	DROP DATABASE planeit;
GO

CREATE DATABASE planeit;
GO

USE planeit;
GO

CREATE TABLE tbFaleConosco(
	idFaleConosco INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(60),
	assunto VARCHAR(60)
	mensagem VARCHAR(255),
	email VARCHAR(255)
);

CREATE TABLE tbEmpresa(
	idEmpr INT PRIMARY KEY IDENTITY(1,1),
	cnpj CHAR(14) NOT NULL UNIQUE,
	nomeEmpresa VARCHAR(70) NOT NULL,
	razaoSocial VARCHAR(50) NOT NULL,
	endereco VARCHAR(100) NOT NULL
);

CREATE TABLE tbAeroporto(
	idAeroporto INT PRIMARY KEY IDENTITY(1,1),
	nomeAeroporto VARCHAR(45),
	pais VARCHAR(45),
	cidade VARCHAR(45),
	endereco VARCHAR(45),
	fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES tbEmpresa(idEmpr)
);

CREATE TABLE tbColaborador(
	idColab INT PRIMARY KEY IDENTITY(1,1),
	cpf CHAR(11) NOT NULL UNIQUE,
	nome VARCHAR(70) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	senha VARCHAR(15) NOT NULL,
	cargo VARCHAR(35),
	administracao BIT,
	fkSuperior INT,
	telefone VARCHAR(11),
	fkEmpr INT NOT NULL,
	fkAeroporto INT,
	FOREIGN KEY (fkSuperior) REFERENCES tbColaborador(idColab),
	FOREIGN KEY (fkEmpr) REFERENCES tbEmpresa(idEmpr),
	FOREIGN KEY (fkAeroporto) REFERENCES tbAeroporto(idAeroporto)
);

CREATE TABLE tbServidor(
	idServ INT PRIMARY KEY IDENTITY(1,1),
	codAutentic CHAR(17) NOT NULL,
	apelido VARCHAR(50) NOT NULL,
	sistemaOp VARCHAR(25),
	ip VARCHAR(12),    
	funcao VARCHAR(40),
	fkAeroporto INT NOT NULL,
	FOREIGN KEY (fkAeroporto) REFERENCES tbAeroporto(idAeroporto)
);

CREATE TABLE tbManutencao(
	idManutencao INT PRIMARY KEY,
	dataHota DATETIME NOT NULL,
	fkResponsavel INT NOT NULL,
	fkServidor INT NOT NULL,
	descricaoManutencao VARCHAR(255) NOT NULL,
	FOREIGN KEY (fkResponsavel) REFERENCES tbColaborador(idColab),
	FOREIGN KEY (fkServidor) REFERENCES tbServidor(idServ)
);

CREATE TABLE tbTipoComponente(
	idTipoComponente INT PRIMARY KEY IDENTITY(1,1),
	tipo VARCHAR(45)
);

CREATE TABLE tbComponente(
	idComp INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(100) NOT NULL, 
	fktipoComponente INT NOT NULL, 
	preco DECIMAL(9,2),
	fkServ INT,
	FOREIGN KEY (fktipoComponente) REFERENCES tbTipoComponente(idTipoComponente),
	FOREIGN KEY (fkServ) REFERENCES tbServidor(idServ)
);

CREATE TABLE tbUnidadeMedida(
	idUnidadeMedida INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	sinal VARCHAR(5)
);

CREATE TABLE tbMetrica(
	idMetrica INT PRIMARY KEY IDENTITY(1,1),
	valor DECIMAL(10,2),
	fkComponente INT,
	fkUnidadeMedida INT,
	FOREIGN KEY (fkComponente) REFERENCES tbComponente(idComp),
	FOREIGN KEY (fkUnidadeMedida) REFERENCES tbUnidadeMedida(idUnidadeMedida)
);

CREATE TABLE tbProcessos(
	idProcesso INT PRIMARY KEY IDENTITY(1,1),
	pid INT,
	totalProcessos INT,
	fkServidor INT,
	FOREIGN KEY (fkServidor) REFERENCES tbServidor(idServ)
);

CREATE TABLE tbRegistro(
	idRegst INT PRIMARY KEY IDENTITY(1,1),
	valor VARCHAR(100) NOT NULL,
	dataHora DATETIME DEFAULT(GETDATE()),
	alerta BIT,
	fkServidor INT,
	fkComp INT,
	fkMetrica INT,
	FOREIGN KEY (fkServidor) REFERENCES tbServidor(idServ),
	FOREIGN KEY (fkComp) REFERENCES tbComponente(idComp),
	FOREIGN KEY (fkMetrica) REFERENCES tbMetrica(idMetrica)
);

CREATE TABLE tbChamados(
	idChamados INT PRIMARY KEY IDENTITY(1,1),
	nivel VARCHAR(45),
	sla VARCHAR(45), 
	estado VARCHAR(45),
	fkRegistro INT,
	FOREIGN KEY (fkRegistro) REFERENCES tbRegistro(idRegst)
);

CREATE TABLE tbPedidosInspecao(
	idPedidoInspecao INT PRIMARY KEY IDENTITY(1,1),
	motivo VARCHAR(45) NOT NULL,
	descricao VARCHAR(500) NOT NULL,
	fkServidor INT NOT NULL,
	fkRequisitante INT NOT NULL,
	FOREIGN KEY (fkServidor) REFERENCES tbServidor(idServ),
	FOREIGN KEY (fkRequisitante) REFERENCES tbColaborador(idColab)
);

CREATE TABLE tbRespostaInspecao(
	idRespostaInspecao INT PRIMARY KEY IDENTITY(1,1),
	resposta VARCHAR(500) NOT NULL,
	fkRespondente INT NOT NULL,
	fkPedido INT NOT NULL,
	FOREIGN KEY (fkRespondente) REFERENCES tbColaborador(idColab),
	FOREIGN KEY (fkPedido) REFERENCES tbPedidosInspecao(idPedidoInspecao)
);

CREATE TABLE tbComponenteSinalizados(
	fkRespostaInspecao INT,
	fkComponente INT, 
	motivo VARCHAR(100) NOT NULL,    
	PRIMARY KEY (fkRespostaInspecao, fkComponente),
	FOREIGN KEY (fkRespostaInspecao) REFERENCES tbRespostaInspecao(idRespostaInspecao),
	FOREIGN KEY (fkComponente) REFERENCES tbComponente(idComp)
);

CREATE TABLE tbSpecs (
	idSpec INT PRIMARY KEY IDENTITY(1,1),
	valor CHAR(20) NOT NULL,
	fkComponente INT,
	fkUnidadeMedida INT,
	FOREIGN KEY (fkComponente) REFERENCES tbComponente(idComp),
	FOREIGN KEY (fkUnidadeMedida) REFERENCES tbUnidadeMedida(idUnidadeMedida)    
);

create table tbSudeste(
	id int primary key identity(1,1),
	localizacao varchar(255),
	regiao char(2),
	dataCompleta date,
	hora varchar(max),
	precipitacao float,
	previsao float
);

create table tbSul(
	id int primary key identity(1,1),
	localizacao varchar(255),
	regiao char(2),
	dataCompleta date,
	hora varchar(max),
	precipitacao float,
	previsao float
);

create table tbCentroOeste(
	id int primary key identity(1,1),
	localizacao varchar(255),
	regiao char(2),
	dataCompleta date,
	precipitacao float,
	previsao float
);

create table tbNordeste(
	id int primary key identity(1,1),
	localizacao varchar(255),
	regiao char(2),
	dataCompleta date,
	hora varchar(max),
	precipitacao float,
	previsao float
);

create table tbNorte(
	id int primary key identity(1,1),
	localizacao varchar(255),
	regiao char(2),
	dataCompleta date,
	hora varchar(max),
	precipitacao float,
	previsao float
);

create table tbClimaEstado(
	id int primary key identity(1,1),
	regiao char(2),
	dataCompleta date,
	previsao float
)

CREATE TABLE voos(
	id INT PRIMARY KEY IDENTITY(1,1),
	siglaEmpresaAerea VARCHAR(20),
	nVoo VARCHAR(20),
	siglaAeroportoOrigem VARCHAR(20),
	horaPartidaPrevista DATETIME,
	horaPartidaReal DATETIME,
	siglaAeroportoDestino VARCHAR(30),
	horaChegadaPrevista DATETIME,
	horaChegadaReal DATETIME,
	situacao VARCHAR(30)
);

CREATE TABLE tbFeriados(
	idFeriado INT PRIMARY KEY IDENTITY(1,1),
	dia VARCHAR(2),
	mes VARCHAR(10),
	titulo VARCHAR(50),
	diaSemana VARCHAR(50)
);

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'deleteByMonth') AND type in (N'P', N'PC'))
	DROP PROCEDURE deleteByMonth;
GO

CREATE PROCEDURE deleteByMonth
	@deleteYear INT,
	@deleteMonth INT
AS
BEGIN
	CREATE TABLE #temp
	(
		id INT
	);

	INSERT INTO #temp
	SELECT id FROM voos
	WHERE
		(YEAR(horaPartidaPrevista) = @deleteYear OR YEAR(horaPartidaReal) = @deleteYear) AND
		(MONTH(horaPartidaPrevista) = @deleteMonth OR MONTH(horaPartidaReal) = @deleteMonth);

	DELETE FROM voos WHERE id IN (SELECT id FROM #temp);

	DROP TABLE #temp;
END;
GO
