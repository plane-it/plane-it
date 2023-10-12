INSERT INTO tbEmpresa (cnpj, nomeEmpresa, razaoSocial)
VALUES
('12345678900110', 'Azul Linhas Aéreas', 'Azul S.A.'),
('98765432000120', 'LATAM Airlines Brasil', 'LATAM Airlines Group S.A.');

insert into tbAeroporto (nome, pais, cidade, endereco, fkEmpresa) values
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

INSERT INTO tbColaborador (cpf, nome, email, senha, cargo, telefone, fkEmpr, fkAeroporto)
VALUES
('12345678900', 'João da Silva', 'joao.silva@example.com', '123456', 'Desenvolvedor', '999999999', 1, 1),
('98765432100', 'Maria Santos', 'maria.santos@example.com', '654321', 'Analista de Sistemas', '888888888', 1, 2),
('09876543210', 'Pedro Souza', 'pedro.souza@example.com', '213456', 'Engenheiro de Software', '777777777', 1, 3),
('10987654320', 'Ana Costa', 'ana.costa@example.com', '321456', 'Arquiteta de Soluções', '666666666', 1, 4),
('21098765430', 'Carlos Oliveira', 'carlos.oliveira@example.com', '432156', 'Gerente de Projetos', '555555555', 1, 5),
('54321098700', 'José Pereira', 'jose.pereira@example.com', '543210', 'Desenvolvedor', '444444444', 2, 6),
('65432109800', 'Luciana Silva', 'luciana.silva@example.com', '654320', 'Analista de Sistemas', '333333333', 2, 7),
('76543210900', 'Marcos Santos', 'marcos.santos@example.com', '765430', 'Engenheiro de Software', '222222222', 2, 8),
('87654321000', 'Patrícia Oliveira', 'patricia.oliveira@example.com', '876540', 'Arquiteta de Soluções', '111111111', 2, 9),
('98765432110', 'Roberto Costa', 'roberto.costa@example.com', '987650', 'Gerente de Projetos', '000000000', 2, 10),
('90876543216', 'Vinícius Silva', 'vinicius.silva@example.com', '908760', 'Desenvolvedor', '000010001', 1, 16),
('09876543217', 'Zilda Santos', 'zilda.santos@example.com', '098760', 'Analista de Sistemas', '000020002', 1, 17);

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



