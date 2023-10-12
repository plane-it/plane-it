drop database if exists planeit;
create database planeit;
use planeit;

create user if not exists 'acessoProduction' identified by 'urubu100';
grant all privileges  on planeit.* to 'acessoProduction';


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
    razaoSocial varchar(50) not null
);

insert into tbEmpresa values(null,"1234","Aero","Aerort");

create table tbAeroporto(
	idAeroporto int primary key auto_increment,
    nomeAeroporto varchar(45),
    pais varchar(45),
    cidade varchar(45),
    endereco varchar(45),
    fkEmpresa int,
    foreign key (fkEmpresa) references tbEmpresa(idEmpr)
);

insert into tbAeroporto values(null,"Cegonha","","","",1);

create table tbColaborador(
	idColab int primary key auto_increment,
    cpf char(11) not null unique,
    nome varchar(70) not null,
    email varchar(100) not null unique,
    senha varchar(15) not null,
    cargo varchar(35),
    telefone varchar(11),
    fkEmpr int not null,
    foreign key (fkEmpr) references tbEmpresa(idEmpr),
    fkAeroporto int,
    foreign key (fkAeroporto) references tbAeroporto(idAeroporto),
    fkSupervisor int,
    foreign key (fkSupervisor) references tbColaborador(idColab)
);

insert into tbColaborador values (null,"1234","lu","","","Gerente","1234",1,1);

alter table tbAeroporto 
	add fkEncarregado int,
    add constraint foreign key (fkEncarregado) references tbColaborador(idColab);

create table tbServidor(
	idServ int primary key auto_increment,
    codAutentic char(6) not null, -- Cerca de 1 milhão e 300 mil possibilidades
    apelido varchar(50) not null,
    sistemaOp varchar(25),
    ip varchar(12),
    funcao varchar(40),
    ultimaManutencao date,
    fkAeroporto int not null,
    foreign key (fkAeroporto) references tbAeroporto(idAeroporto)
);

create table tbComponente(
	idComp int primary key auto_increment,
    tipo varchar(75) not null,
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

create table tbRegistro(
	idRegst int primary key auto_increment,
    valor decimal(10,2) not null,
    dataHora dateTime default(now()),
    fkComp int,
    foreign key (fkComp) references tbComponente(idComp),
    fkServidor int,
    foreign key	(fkServidor) references tbServidor(idServ),
    fkMetrica int,
    foreign key (fkMetrica) references tbMetrica(idMetrica)
);