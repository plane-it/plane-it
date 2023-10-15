INSERT INTO tbEmpresa (cnpj, nomeEmpresa, razaoSocial)
VALUES
('12345678900110', 'Azul Linhas Aéreas', 'Azul S.A.'),
('98765432000120', 'LATAM Airlines Brasil', 'LATAM Airlines Group S.A.');

insert into tbAeroporto (nomeAeroporto, pais, cidade, endereco, fkEmpresa) values
('Aeroporto Internacional de São Paulo', 'Brasil', 'Guarulhos', 'Rodovia Hélio Smidt, s/n', 2),
('Galeão', 'Brasil', 'Rio de Janeiro', 'Av. Vinte de Janeiro, s/n', 2),
('Juscelino Kubitschek', 'Brasil', 'Brasília', 'SGAS Quadra 515, s/n', 2),
('Eduardo Gomes', 'Brasil', 'Manaus', 'Rodovia AM-070, km 11', 2),
('Deputado Luís Eduardo Magalhães', 'Brasil', 'Salvador', 'Av. Tancredo Neves, s/n', 2),
('Pinto Martins', 'Brasil', 'Fortaleza', 'Av. Senador Carlos Jereissati, 3155', 2),
('Gilberto Freyre', 'Brasil', 'Recife', 'Av. Marechal Mascarenhas de Moraes, s/n', 2),
('Salgado Filho', 'Brasil', 'Porto Alegre', 'Av. Severo Dullius, s/n', 2),
('Afonso Pena', 'Brasil', 'Curitiba', 'Av. Afonso Pena, km 33, s/n', 2),
('Confins', 'Brasil', 'Belo Horizonte', 'Rodovia BR-356, km 464, s/n', 1),
('Congonhas', 'Brasil', 'São Paulo', 'Av. Washington Luís, s/n', 1),
('Hercílio Luz', 'Brasil', 'Florianópolis', 'Rodovia SC-401, km 49, s/n', 1),
('Augusto Severo', 'Brasil', 'Natal', 'Av. Capitão-aviador Alberto Santos Dumont', 1),
('Castro Pinto', 'Brasil', 'João Pessoa', 'Av. Marechal Eurico Gaspar Dutra, s/n', 1),
('Júlio Cezar Ribeiro', 'Brasil', 'Belém', 'Rodovia BR-316, km 8, s/n', 1),
('Marechal Rondon', 'Brasil', 'Cuiabá', 'Rodovia BR-163, km 294, s/n', 1),
('Zumbi dos Palmares', 'Brasil', 'Maceió', 'Av. Menino Marcelo, s/n', 1),
('Eurico de Aguiar Salles', 'Brasil', 'Vitória', 'Rodovia BR-101, km 39, s/n', 1);

INSERT INTO tbColaborador (cpf, nome, email, senha, cargo, telefone, fkEmpr, fkAeroporto, fkSuperior)
VALUES
('12345678900', 'João da Silva', 'joao.silva@example.com', '123456789', 'Desenvolvedor', '99999999999', 1, 1, null),
('98765432100', 'Maria Santos', 'maria.santos@example.com', '123456789', 'Analista de Sistemas', '88888888888', 1, 2, 1),
('09876543210', 'Pedro Souza', 'pedro.souza@example.com', '123456789', 'Engenheiro de Software', '77777777777', 1, 3, 1),
('10987654320', 'Ana Costa', 'ana.costa@example.com', '123456789', 'Arquiteta de Soluções', '66666666666', 1, 4, 1),
('21098765430', 'Carlos Oliveira', 'carlos.oliveira@example.com', '123456789', 'Gerente de Projetos', '55555555555', 1, 5, 1),
('54321098700', 'José Pereira', 'jose.pereira@example.com', '123456789', 'Desenvolvedor', '44444444444', 2, 6, null),
('65432109800', 'Luciana Silva', 'luciana.silva@example.com', '123456789', 'Analista de Sistemas', '33333333333', 2, 7, 6),
('76543210900', 'Marcos Santos', 'marcos.santos@example.com', '123456789', 'Engenheiro de Software', '22222222222', 2, 8, 6),
('87654321000', 'Patrícia Oliveira', 'patricia.oliveira@example.com', '123456789', 'Arquiteta de Soluções', '11111111111', 2, 9, 6),
('98765432110', 'Roberto Costa', 'roberto.costa@example.com', '123456789', 'Gerente de Projetos', '00000000000', 2, 10, 6),
('90876543216', 'Vinícius Silva', 'vinicius.silva@example.com', '123456789', 'Desenvolvedor', '00001000100', 1, 16, 1),
('09876543217', 'Zilda Santos', 'zilda.santos@example.com', '123456789', 'Analista de Sistemas', '00002000200', 1, 17, 1);

INSERT INTO tbServidor (codAutentic, apelido, sistemaOp, ip, funcao, ultimaManutencao, fkAeroporto)
VALUES
('A12345', 'Servidor 1', 'Windows', '192.168.1.1', 'Servidor de aplicação', '2023-07-20', 11),
('B12345', 'Servidor 2', 'Windows', '192.168.1.2', 'Servidor de banco de dados', '2023-07-21', 11),
('C12345', 'Servidor 3', 'Ubuntu', '192.168.1.3', 'Servidor de arquivos', '2023-07-22', 2),
('D12345', 'Servidor 4', 'Fedora', '192.168.1.4', 'Servidor de impressão', '2023-07-23', 2),
('T12345', 'Servidor 20', 'Arch Linux', '192.168.1.20', 'Servidor de rede', '2023-07-29', 11),
('U12345', 'Servidor 21', 'Gentoo', '192.168.1.21', 'Servidor web', '2023-07-30', 18),
('V12345', 'Servidor 22', 'Debian', '192.168.1.22', 'Servidor de aplicação', '2023-07-31', 11),
('W12345', 'Servidor 23', 'Red Hat Enterprise Linux', '192.168.1.23', 'Servidor de banco de dados', '2023-08-01', 1),
('X12345', 'Servidor 24', 'SUSE Linux Enterprise', '192.168.1.24', 'Servidor de arquivos', '2023-08-02', 2),
('Y12345', 'Servidor 25', 'CentOS', '192.168.1.25', 'Servidor de impressão', '2023-08-03', 11),
('Z12345', 'Servidor 32', 'OpenSUSE', '192.168.1.32', 'Servidor web', '2023-08-09', 18);

INSERT INTO tbComponente (tipo, preco, fkServ) VALUES
('CPU', 250.00, 1),
('Memória RAM', 100.00, 1),
('Disco Rígido', 150.00, 1),
('CPU', 50.00, 2),
('Memoria Ram', 200.00, 2),
('Disco Rígido', 150.00, 2),
('CPU', 250.00, 3),
('Memória RAM', 100.00, 3),
('Disco Rígido', 150.00, 3),
('CPU', 50.00, 4),
('Memoria Ram', 200.00, 4),
('Disco Rígido', 150.00, 4),
('CPU', 250.00, 5),
('Memória RAM', 100.00, 5),
('Disco Rígido', 150.00, 5),
('CPU', 50.00, 6),
('Memoria Ram', 200.00, 6),
('Disco Rígido', 150.00, 6),
('CPU', 250.00, 7),
('Memória RAM', 100.00, 7),
('Disco Rígido', 150.00, 7),
('CPU', 50.00, 8),
('Memória RAM', 200.00, 8),
('Disco Rígido', 150.00, 8),
('CPU', 250.00, 9),
('Memória RAM', 100.00, 9),
('Disco Rígido', 150.00, 9),
('CPU', 50.00, 10),
('Memória RAM', 200.00, 10),
('Disco Rígido', 150.00, 10),
('CPU', 250.00, 11),
('Memória RAM', 100.00, 11),
('Disco Rígido', 150.00, 11);

INSERT INTO tbUnidadeMedida (nome, sinal)
VALUES
('Celsius', '°C'),
('Porcentagem', '%');

INSERT INTO tbMetrica (valor, fkComponente, fkUnidadeMedida)
VALUES
(45.5, 1, 1),
(75.2, 2, 2),
(150.0, 3, 2),
(45.5, 4, 1),
(75.2, 5, 2),
(150.0, 6, 2),
(45.5, 7, 1),
(75.2, 8, 2),
(150.0, 9, 2),
(45.5, 10, 1),
(75.2, 11, 2),
(150.0, 12, 2),
(45.5, 13, 1),
(75.2, 14, 2),
(150.0, 15, 2),
(45.5, 16, 1),
(75.2, 17, 2),
(150.0, 18, 2),
(45.5, 19, 1),
(75.2, 20, 2),
(150.0, 21, 2),
(45.5, 22, 1),
(75.2, 23, 2),
(150.0, 24, 2),
(45.5, 25, 1),
(75.2, 26, 2),
(150.0, 27, 2),
(45.5, 28, 1),
(75.2, 29, 2),
(150.0, 30, 2),
(45.5, 31, 1),
(75.2, 32, 2),
(150.0, 33, 2);

INSERT INTO tbRegistro (valor, fkComp, alerta, fkServidor, fkMetrica)
VALUES
(45.5, 1, 0, 1, 1),
(75.2, 2, 0, 1, 2),
(150.0, 3, 1, 2, 3),
(45.5, 4, 0, 3, 4),
(75.2, 5, 0, 3, 5),
(150.0, 6, 1, 4, 6),
(45.5, 7, 0, 4, 7),
(75.2, 8, 0, 4, 8),
(150.0, 9, 1, 5, 9),
(45.5, 10, 0, 5, 10),
(75.2, 11, 0, 5, 11),
(150.0, 12, 1, 6, 12),
(45.5, 13, 0, 6, 13),
(75.2, 14, 0, 6, 14),
(150.0, 15, 1, 7, 15),
(45.5, 16, 0, 7, 16),
(75.2, 17, 0, 7, 17),
(150.0, 18, 1, 8, 18),
(45.5, 19, 0, 8, 19),
(75.2, 20, 0, 8, 20),
(150.0, 21, 1, 9, 21),
(45.5, 22, 0, 9, 22),
(75.2, 23, 0, 9, 23),
(150.0, 24, 1, 10, 24),
(45.5, 25, 0, 10, 25),
(75.2, 26, 0, 10, 26),
(150.0, 27, 1, 11, 27),
(45.5, 28, 0, 11, 28),
(75.2, 29, 0, 11, 29),
(150.0, 30, 1, 1, 30),
(45.5, 31, 0, 1, 31),
(75.2, 32, 0, 1, 32),
(150.0, 33, 1, 2, 33);