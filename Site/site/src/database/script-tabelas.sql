create database planeit;
use planeit;

create table usuario (
id int primary key auto_increment,
cnpj char(14),
nomeGerente varchar(50),
telefone char(11),
nomeEmpresa varchar(75),
emailEmpresa varchar(250),
senha varchar(50),
confirmacao varchar(50)
);