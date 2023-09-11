drop database if exists planeit;
create database planeit;
use planeit;

create user if not exists 'acessoProduction' identified by 'urubu100';
grant all privileges  on planeit.* to 'acessoProduction';

create table usuario (
id int primary key auto_increment,
cpf char(11),
cnpj char(14),
nomeGerente varchar(50),
telefone char(11),
nomeEmpresa varchar(75),
emailEmpresa varchar(250),
senha varchar(50),
confirmacao varchar(50)
);