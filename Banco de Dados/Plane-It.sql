create database planeit;
use planeit;

create table cadastro (
id int primary key auto_increment,
cnpj char(14),
nome varchar(60),
senha varchar(50),
confirmacao varchar(50)
);

