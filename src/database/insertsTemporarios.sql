INSERT INTO tbEmpresa (cnpj, nomeEmpresa, razaoSocial, endereco)
VALUES
('12345678900110', 'Azul Linhas Aéreas', 'Azul S.A.', 'Rodovia Hélio Smidt, s/n'),
('98765432000120', 'LATAM Airlines Brasil', 'LATAM Airlines Group S.A.', 'SGAS Quadra 515, s/n');


INSERT INTO tbAeroporto (nomeAeroporto, siglaAeroporto, pais, cidade, endereco, fkEmpresa) VALUES
('Aeroporto Internacional de São Paulo', 'GRU', 'Brasil', 'Guarulhos', 'Rodovia Hélio Smidt, s/n', 2),
('Galeão', 'GIG', 'Brasil', 'Rio de Janeiro', 'Av. Vinte de Janeiro, s/n', 2),
('Juscelino Kubitschek', 'BSB', 'Brasil', 'Brasília', 'SGAS Quadra 515, s/n', 2),
('Eduardo Gomes', 'MAO', 'Brasil', 'Manaus', 'Rodovia AM-070, km 11', 2),
('Deputado Luís Eduardo Magalhães', 'SSA', 'Brasil', 'Salvador', 'Av. Tancredo Neves, s/n', 2),
('Pinto Martins', 'FOR', 'Brasil', 'Fortaleza', 'Av. Senador Carlos Jereissati, 3155', 2),
('Gilberto Freyre', 'REC', 'Brasil', 'Recife', 'Av. Marechal Mascarenhas de Moraes, s/n', 2),
('Salgado Filho', 'POA', 'Brasil', 'Porto Alegre', 'Av. Severo Dullius, s/n', 2),
('Afonso Pena', 'CWB', 'Brasil', 'Curitiba', 'Av. Afonso Pena, km 33, s/n', 2),
('Confins', 'CNF', 'Brasil', 'Belo Horizonte', 'Rodovia BR-356, km 464, s/n', 1),
('Congonhas', 'CGH', 'Brasil', 'São Paulo', 'Av. Washington Luís, s/n', 1),
('Hercílio Luz', 'FLN', 'Brasil', 'Florianópolis', 'Rodovia SC-401, km 49, s/n', 1),
('Augusto Severo', 'NAT', 'Brasil', 'Natal', 'Av. Capitão-aviador Alberto Santos Dumont', 1),
('Castro Pinto', 'JPA', 'Brasil', 'João Pessoa', 'Av. Marechal Eurico Gaspar Dutra, s/n', 1),
('Júlio Cezar Ribeiro', 'BEL', 'Brasil', 'Belém', 'Rodovia BR-316, km 8, s/n', 1),
('Marechal Rondon', 'CGB', 'Brasil', 'Cuiabá', 'Rodovia BR-163, km 294, s/n', 1),
('Zumbi dos Palmares', 'MCZ', 'Brasil', 'Maceió', 'Av. Menino Marcelo, s/n', 1),
('Eurico de Aguiar Salles', 'VIX', 'Brasil', 'Vitória', 'Rodovia BR-101, km 39, s/n', 1);

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

INSERT INTO tbServidor (codAutentic, apelido, sistemaOp, ip, funcao, fkAeroporto)
VALUES
('A12345', 'Servidor 1', 'Windows', '192.168.1.1', 'Servidor de aplicação', 11),
('B12345', 'Servidor 2', 'Windows', '192.168.1.2', 'Servidor de banco de dados', 11),
('C12345', 'Servidor 3', 'Ubuntu', '192.168.1.3', 'Servidor de arquivos', 2),
('D12345', 'Servidor 4', 'Fedora', '192.168.1.4', 'Servidor de impressão', 2),
('T12345', 'Servidor 20', 'Arch Linux', '192.168.1.20', 'Servidor de rede', 11),
('U12345', 'Servidor 21', 'Gentoo', '192.168.1.21', 'Servidor web', 18),
('V12345', 'Servidor 22', 'Debian', '192.168.1.22', 'Servidor de aplicação', 11),
('W12345', 'Servidor 23', 'Red Hat Enterprise Linux', '192.168.1.23', 'Servidor de banco de dados', 1),
('W12345', 'Servidor 23', 'Red Hat Enterprise Linux', '192.168.1.23', 'Servidor de banco de dados', 1),
('X12345', 'Servidor 24', 'SUSE Linux Enterprise', '192.168.1.24', 'Servidor de arquivos', 2),
('Y12345', 'Servidor 25', 'CentOS', '192.168.1.25', 'Servidor de impressão', 11),
('Z12345', 'Servidor 32', 'OpenSUSE', '192.168.1.32', 'Servidor web', 18);

INSERT INTO tbTipoComponente (tipo) VALUES 
('CPU'),
('Memória RAM'),
('Disco');
 
INSERT INTO tbComponente (nome, preco, fkServ, fkTipoComponente) VALUES
('i7 12700h', 250.00, 1, 1),
('HyperX fury 16gb ddr4', 100.00, 1, 2),
('Toshiba 2tb 1000rpm', 150.00, 1, 3),
('i7 12700h', 250.00, 2, 1),
('HyperX fury 16gb ddr4', 100.00, 2, 2),
('Toshiba 2tb 7200rpm', 150.00, 2, 3),
('Ryzen 9 5900X', 320.00, 3, 1),
('Corsair Vengeance 32gb ddr4', 130.00, 3, 2),
('Seagate 4tb 7200rpm', 190.00, 3, 3),
('Intel Core i9-12900K', 360.00, 4, 1),
('Kingston 64gb ddr4', 140.00, 4, 2),
('Western Digital 6tb 7200rpm', 210.00, 4, 3),
('AMD Ryzen 7 5800X', 300.00, 5, 1),
('Crucial 32gb ddr4', 120.00, 5, 2),
('Samsung 1tb NVMe SSD', 180.00, 5, 3),
('Intel Core i5-12600K', 280.00, 6, 1),
('G.Skill Ripjaws 16gb ddr4', 110.00, 6, 2),
('Western Digital 2tb 7200rpm', 160.00, 6, 3),
('Ryzen 5 5600X', 260.00, 7, 1),
('Crucial Ballistix 16gb ddr4', 100.00, 7, 2),
('Seagate 1tb 7200rpm', 150.00, 7, 3),
('Intel Core i7-12700K', 340.00, 8, 1),
('Corsair Vengeance LPX 32gb ddr4', 130.00, 8, 2),
('Samsung 2tb 7200rpm', 160.00, 8, 3),
('AMD Ryzen 5 5600G', 270.00, 9, 1),
('HyperX Predator 16gb ddr4', 100.00, 9, 2),
('Toshiba 4tb 7200rpm', 200.00, 9, 3),
('Intel Core i7-12700KF', 330.00, 10, 1),
('Crucial 8gb ddr4', 80.00, 10, 2),
('Samsung 4tb 7200rpm', 220.00, 10, 3),
('AMD Ryzen 3 5300G', 240.00, 11, 1),
('G.Skill Trident Z 32gb ddr4', 140.00, 11, 2),
('Western Digital 1tb NVMe SSD', 170.00, 11, 3);

INSERT INTO tbUnidadeMedida (nome, sinal)
VALUES
('Celsius', '°C'),
('Porcentagem', '%'),
('Gigabyte', 'Gb'), 
('Megahertz', 'MHz');

INSERT INTO tbMetrica (valor, fkComponente, fkUnidadeMedida)
VALUES
(45.5, 1, 1),
(75.2, 2, 3),
(150.0, 3, 3),
(45.5, 4, 1),
(75.2, 5, 3),
(150.0, 6, 3),
(45.5, 7, 1),
(75.2, 8, 3),
(150.0, 9, 3),
(45.5, 10, 1),
(75.2, 11, 3),
(150.0, 12, 3),
(45.5, 13, 1),
(75.2, 14, 3),
(150.0, 15, 3),
(45.5, 16, 1),
(2000, 16, 4), 
(75.2, 17, 3),
(150.0, 18, 3),
(45.5, 19, 1),
(75.2, 20, 3),
(150.0, 21, 3),
(45.5, 22, 1),
(75.2, 23, 3),
(150.0, 24, 3),
(45.5, 25, 1),
(75.2, 26, 3),
(150.0, 27, 3),
(45.5, 28, 1),
(75.2, 29, 3),
(150.0, 30, 3),
(45.5, 31, 1),
(75.2, 32, 3),
(150.0, 33, 3);


INSERT INTO tbRegistro (valor, fkComp, alerta, fkServidor, fkMetrica)
VALUES
(5.5, 1, 1, 1, 1),
(15.5, 1, 1, 1, 1);




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
(150.0, 9, 0, 5, 9),
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
(150.0, 33, 1, 2, 33),
(45.5, 1, 1, 2, 1),
(75.2, 2, 1, 2, 2),
(45.5, 1, 1, 2, 1),
(75.2, 2, 1, 2, 2),
(45.5, 1, 1, 2, 1),
(75.2, 2, 1, 2, 2),
(45.5, 1, 1, 1, 1),
(75.2, 2, 1, 1, 2),
(45.5, 1, 1, 1, 1),
(75.2, 2, 1, 1, 2),
(45.5, 1, 1, 1, 1),
(75.2, 2, 1, 1, 2),
(45.5, 1, 1, 1, 1),
(75.2, 2, 1, 1, 2),
(45.5, 1, 1, 5, 1),
(75.2, 2, 1, 5, 2),
(45.5, 1, 1, 5, 1),
(75.2, 2, 1, 5, 2);

update tbRegistro set dataHora = '2023-01-10 17:12:55' WHERE idRegst in (48,49,50,51);
update tbRegistro set dataHora = '2023-02-10 17:12:55' WHERE idRegst in (44,45,46,47);
update tbRegistro set dataHora = '2023-03-10 17:12:55' WHERE idRegst in (40,41,42,43);
update tbRegistro set dataHora = '2023-04-10 17:12:55' WHERE idRegst in (36,37,38,39);
update tbRegistro set dataHora = '2023-05-10 17:12:55' WHERE idRegst in (32,33,34,35);
update tbRegistro set dataHora = '2023-06-10 17:12:55' WHERE idRegst in (28,29,30,31);
update tbRegistro set dataHora = '2023-07-10 17:12:55' WHERE idRegst in (24,25,26,27);
update tbRegistro set dataHora = '2023-08-10 17:12:55' WHERE idRegst in (20,21,22,23);
update tbRegistro set dataHora = '2023-09-10 17:12:55' WHERE idRegst in (16,17,18,19);

INSERT INTO tbChamados (nivel, sla, estado, fkRegistro)
VALUES
('Alto', '4 horas', 'Aberto', 3),
('Médio', '8 horas', 'Aberto', 6),
('Baixo', '24 horas', 'Aberto', 9),
('Alto', '4 horas', 'Aberto', 12),
('Médio', '8 horas', 'Aberto', 15),
('Baixo', '24 horas', 'Aberto', 18),
('Alto', '4 horas', 'Aberto', 21),
('Médio', '8 horas', 'Aberto', 24),
('Baixo', '24 horas', 'Aberto', 27),
('Alto', '4 horas', 'Aberto', 30),
('Alto', '4 horas', 'Aberto', 31);