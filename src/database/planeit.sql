DROP DATABASE IF EXISTS planeit;
CREATE DATABASE planeit;
USE planeit;

create table tbFaleConosco(
	idFaleConosco int primary key,
	mensagem varchar(255),
	email varchar(255),
	tefelone varchar(11)
);

create table tbEmpresa(
	idEmpr int primary key auto_increment,
	cnpj char(14) not null unique,
	nomeEmpresa varchar(70) not null,
	razaoSocial varchar(50) not null,
	endereco varchar(100) not null -- Criação do Endereço da empresa
);

create table tbAeroporto(
	idAeroporto int primary key auto_increment,
	nomeAeroporto varchar(45),
	pais varchar(45),
	cidade varchar(45),
	endereco varchar(45),
	fkEmpresa int,
        foreign key (fkEmpresa) references tbEmpresa(idEmpr)
);

create table tbColaborador(
	idColab int primary key auto_increment,
	cpf char(11) not null unique,
	nome varchar(70) not null,
	email varchar(100) not null unique,
	senha varchar(15) not null,
	cargo varchar(35),
	administracao boolean,
	fkSuperior int,
		foreign key (fkSuperior) references tbColaborador(idColab),
	telefone varchar(11),
	fkEmpr int not null, -- REDUNDANTE
		foreign key (fkEmpr) references tbEmpresa(idEmpr),
	fkAeroporto int,
		foreign key (fkAeroporto) references tbAeroporto(idAeroporto)
);

create table tbServidor(
	idServ int primary key auto_increment,
	codAutentic char(17) not null, -- Cerca de 1 milhão e 300 mil possibilidades
	apelido varchar(50) not null,
	sistemaOp varchar(25),
	ip varchar(12),	
	funcao varchar(40),
	fkAeroporto int not null,
        foreign key (fkAeroporto) references tbAeroporto(idAeroporto)
);

CREATE TABLE tbManutencao(
	idManutencao INT PRIMARY KEY,
	dataHota DATETIME NOT NULL,
	fkResponsavel INT NOT NULL,
		FOREIGN KEY (fkResponsavel) REFERENCES tbColaborador(idColab),
	fkServidor INT NOT NULL,
		FOREIGN KEY (fkServidor) REFERENCES tbServidor(idServ),	
	descricaoManutencao VARCHAR(255) NOT NULL
);


CREATE TABLE tbTipoComponente(
	idTipoComponente INT PRIMARY KEY AUTO_INCREMENT,
	tipo VARCHAR(45)
);

create table tbComponente(
	idComp int primary key auto_increment,
	nome VARCHAR(100) NOT NULL, 
	fktipoComponente INT NOT NULL, 
	foreign key (fktipoComponente) REFERENCES tbTipoComponente(idTipoComponente),
	preco decimal(9,2),
	fkServ int,
	foreign key (fkServ) references tbServidor(idServ)
);


create table tbUnidadeMedida(
	idUnidadeMedida int primary key auto_increment,
	nome varchar(50),
	sinal varchar(5)
);	

create table tbMetrica(
	idMetrica int primary key auto_increment,
	valor decimal(10,2),
	fkComponente int,
		foreign key (fkComponente) references tbComponente(idComp),
	fkUnidadeMedida int,
		foreign key (fkUnidadeMedida) references tbUnidadeMedida(idUnidadeMedida)
);	


CREATE TABLE tbProcessos(
	idProcesso INT PRIMARY KEY AUTO_INCREMENT,
	pid INT,
	totalProcessos INT,
	fkServidor INT,
		FOREIGN KEY (fkServidor) REFERENCES tbServidor(idServ)
);

create table tbRegistro(
	idRegst int primary key auto_increment,
	valor varchar(100) not null,
	dataHora dateTime default(now()),
    alerta boolean,
    fkServidor int,
		foreign key (fkServidor) references tbServidor(idServ),
	fkComp int,
		foreign key (fkComp) references tbComponente(idComp),
	fkMetrica int,
		foreign key (fkMetrica) references tbMetrica(idMetrica)
);

create table tbChamados(
	idChamados int primary key auto_increment,
	nivel varchar(45),
	sla VARCHAR(45), 
	estado VARCHAR(45),
	fkRegistro int,
		foreign key (fkRegistro) references tbRegistro(idRegst)
);

create table tbPedidosInspecao(
	idPedidoInspecao int primary key auto_increment,
	motivo varchar(45) not null,
	descricao varchar(500) not null,
	fkServidor int not null,
		foreign key (fkServidor) references tbServidor(idServ),
	fkRequisitante int not null,
		foreign key (fkRequisitante) references tbColaborador(idColab)
);

create table tbRespostaInspecao(
	idRespostaInspecao int primary key auto_increment,
	resposta varchar(500) not null,
	fkRespondente int not null,
		foreign key (fkRespondente) references tbColaborador(idColab),
	fkPedido int not null,
		foreign key (fkPedido) references tbPedidosInspecao(idPedidoInspecao)
);

create table tbComponenteSinalizados(
	fkRespostaInspecao int,
		foreign key (fkRespostaInspecao) references tbRespostaInspecao(idRespostaInspecao),
	fkComponente int, 
		foreign key (fkComponente) references tbComponente(idComp),
	motivo varchar(100) not null,	
	primary key (fkRespostaInspecao, fkComponente)
);

create table tbSpecs (
	idSpec int primary key auto_increment,
	valor char(20) not null,
	fkComponente int,
		foreign key (fkComponente) references tbComponente(idComp),
	fkUnidadeMedida int,
		foreign key (fkUnidadeMedida) references tbUnidadeMedida(idUnidadeMedida)	
);

create table tbClima(
	id int primary key auto_increment,
	localizacao varchar(255),
	regiao char(2),
	dataCompleta date,
	hora longtext,
	precipitacao double
);

create table voos(
	id int primary key auto_increment,
    siglaEmpresaAerea varchar(20),
    nVoo varchar(20),
    siglaAeroportoOrigem varchar(20),
    horaPartidaPrevista datetime,
    horaPartidaReal datetime,
    siglaAeroportoDestino varchar(30),
    horaChegadaPrevista datetime,
    horaChegadaReal datetime,
    situacao varchar(30)
);

create table tbFeriados(
	idFeriado int primary key auto_increment,
    dia varchar(2),
    mes varchar (10),
    titulo varchar(50)
);

drop procedure if exists deleteByMonth;
DROP TEMPORARY TABLE if exists TEMP;
DELIMITER $$
CREATE PROCEDURE deleteByMonth(deleteYear int,deleteMonth INT)
BEGIN 
    CREATE TEMPORARY TABLE temp
	SELECT id FROM voos
	WHERE
		(YEAR(horaPartidaPrevista) = deleteYear or YEAR(horaPartidaReal) = deleteYear) and
		(MONTH(horaPartidaPrevista) = deleteMonth OR MONTH(horaPartidaReal) = deleteMonth);

    DELETE FROM voos WHERE id IN (SELECT id FROM temp);

    DROP TEMPORARY TABLE temp;
END $$