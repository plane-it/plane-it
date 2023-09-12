drop database if exists planeit;
create database planeit;
use planeit;

create table tbEmpresa(
	idEmpr int primary key auto_increment,
    cnpj char(14) not null unique,
    nomeEmpresa varchar(35) not null,
    razaoSocial varchar(50) not null,
    corDestaque char(6)
);
select * from tbEmpresa;

create table tbColaborador(
	idColab int primary key auto_increment,
    cpf char(11) not null unique,
    nome varchar(75) not null,
    email varchar(25) not null unique,
    senha varchar(15) not null,
    cargo char(1) default('1'),
    fkEmpr int not null,
    foreign key (fkEmpr) references tbEmpresa(idEmpr)
);

create table tbLocal(
	idLocal int primary key auto_increment,
    nome varchar(25) not null,
    localPai int,
    foreign key (localPai) references tbLocal(idLocal)
);

create table tbServidor(
	idServ int primary key auto_increment,
    codAutentic char(6) not null, -- Cerca de 1 milhão e 300 mil possibilidades
    apelido varchar(50) not null,
    sistemaOp varchar(25),
    fkAutenticador int,
    foreign key (fkAutenticador) references tbColaborador(idColab),
    fkLocal int not null,
    foreign key (fkLocal) references tbLocal(idLocal),
    fkEmpresa int not null,
    foreign key (fkEmpresa) references tbEmpresa(idEmpr)
);

create table tbComponente(
	idComp int primary key auto_increment,
    tipo varchar(75) not null
);

create table tbComponenteServidor(
	fkServ int not null,
    fkComp int not null,
    primary key(fkServ, fkComp),
    foreign key (fkServ) references tbServidor(idServ),
    foreign key (fkComp) references tbComponente(idComp)
);

create table tbPropriedade(
	idComp int,
    idProp int,
    primary key(idComp, idProp),
    nome varchar(20) not null,
    foreign key (idComp) references tbComponente(idComp)
);

create table tbRegistro(
	idRegst int primary key auto_increment,
    valor varchar(50) not null,
    dataHora dateTime default(now()),
    fkComp int not null,
	fkProp int not null,
	foreign key (fkComp, fkProp) references tbPropriedade(idComp, idProp)
)    