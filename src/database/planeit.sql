drop database if exists planeit;

create database planeit;

use planeit;

create user
    if not exists 'acessoProduction' identified by 'urubu100';

grant all privileges on planeit.* to 'acessoProduction';

create table
    tbFaleConosco(
        idFaleConosco int primary key,
        mensagem varchar(255),
        email varchar(255),
        tefelone varchar(11)
    );

create table
    tbEmpresa(
        idEmpr int primary key auto_increment,
        cnpj char(14) not null unique,
        nomeEmpresa varchar(70) not null,
        razaoSocial varchar(50) not null
    );

insert into
    tbEmpresa(cnpj, nomeEmpresa, razaoSocial)
values (
        "12341234123412",
        "Andrey airport",
        "TESTE"
    );

create table
    tbAeroporto(
        idAeroporto int primary key auto_increment,
        nome varchar(45),
        pais varchar(45),
        cidade varchar(45),
        endereco varchar(45),
        fkEmpresa int,
        foreign key (fkEmpresa) references tbEmpresa(idEmpr)
    );

insert into
    tbAeroporto(
        nome,
        pais,
        cidade,
        endereco,
        fkEmpresa
    )
VALUES (
        "Cumbica",
        "Brasil",
        "Guarulhos",
        "teste 1234 N14",
        1
    );

create table
    tbColaborador(
        idColab int primary key auto_increment,
        cpf char(11) not null unique,
        nome varchar(70) not null,
        email varchar(100) not null unique,
        senha varchar(15) not null,
        cargo varchar(15),
        telefone varchar(11),
        fkEmpr int not null,
        foreign key (fkEmpr) references tbEmpresa(idEmpr),
        fkAeroporto int,
        foreign key (fkAeroporto) references tbAeroporto(idAeroporto)
    );

insert into tbColaborador values (null, "12345678901", "Andrey", "Andrey@teste", "12341234","gerente",null, 1, 1);

alter table tbAeroporto
add fkEncarregado int,
add
    constraint foreign key (fkEncarregado) references tbColaborador(idColab);

create table
    tbServidor(
        idServ int primary key auto_increment,
        codAutentic char(6) not null,
        -- Cerca de 1 milhão e 300 mil possibilidades
        apelido varchar(50) not null,
        sistemaOp varchar(25),
        ip varchar(12),
        funcao varchar(40),
        ultimaManutencao date,
        fkAeroporto int not null,
        foreign key (fkAeroporto) references tbAeroporto(idAeroporto)
    );

insert
    tbServidor(
        codAutentic,
        apelido,
        sistemaOp,
        ip,
        funcao,
        ultimaManutencao,
        fkAeroporto
    )
values (
        '123456',
        'Servidor 1',
        'Windows',
        '192.0.0.0',
        'Servidor de Banco de Dados',
        '2020-01-01',
        1
    ), (
        '654321',
        'Servidor 2',
        'Linux',
        '182.0.0.0',
        'Servidor de Aplicação',
        '2020-01-01',
        1
    );

insert into
    tbServidor(
        codAutentic,
        apelido,
        sistemaOp,
        ip,
        funcao,
        ultimaManutencao,
        fkAeroporto
    )
values (
        '123456',
        'Servidor 3',
        'Windows',
        '192.168.2.0',
        'Servidor de Banco de Dados',
        '2020-01-01',
        1
    );

create table
    tbComponente(
        idComp int primary key auto_increment,
        tipo varchar(75) not null,
        preco decimal(9, 2),
        fkServ int,
        foreign key (fkServ) references tbServidor(idServ)
    );

insert
    tbComponente(tipo, preco, fkServ)
values ('CPU', 13500.00, 1), ('RAM', 1200.00, 1), ("HD", 1400.00, 1), ("CPU", 13500.00, 2), ("RAM", 1200.00, 2), ("HD", 1400.00, 2);

create table
    tbUnidadeMedida(
        idUnidadeMedida int primary key auto_increment,
        nome varchar(50),
        sinal varchar(5)
    );

insert
    tbUnidadeMedida(nome, sinal)
values ('Temperatura', '°C'), ('Memória', 'GB'), ('Disco', 'GB'), ('Processamento', 'GHz');

create table
    tbMetrica(
        idMetrica int primary key auto_increment,
        valor decimal(10, 2),
        fkComponente int,
        foreign key (fkComponente) references tbComponente(idComp),
        fkUnidadeMedida int,
        foreign key (fkUnidadeMedida) references tbUnidadeMedida(idUnidadeMedida)
    );

INSERT
    tbMetrica(
        valor,
        fkComponente,
        fkUnidadeMedida
    )
VALUES (80.00, 1, 1), (80.00, 2, 2), (80.00, 3, 3), (80.00, 4, 1), (80.00, 5, 2), (80.00, 6, 3);

create table
    tbRegistro(
        idRegst int primary key auto_increment,
        valor decimal(10, 2) not null,
        dataHora dateTime default(now()),
        fkComp int,
        foreign key (fkComp) references tbComponente(idComp),
        fkServidor int,
        foreign key (fkServidor) references tbServidor(idServ),
        fkMetrica int,
        foreign key (fkMetrica) references tbMetrica(idMetrica)
    );

insert
    tbRegistro(
        valor,
        dataHora,
        fkComp,
        fkServidor,
        fkMetrica
    ) -- VALUES (50.00, now(), 1, 1, 1), (90.00, now(), 2, 1, 2), (70.00, now(), 3, 1, 3);

VALUES (30.00, now(), 1, 1, 1), (90.00, now(), 2, 1, 2), (10.00, now(), 3, 1, 3), (10.00, now() -10, 1, 1, 1), (10.00, now() -10, 2, 1, 2), (10.00, now() -10, 3, 1, 3), (10.00, now(), 4, 2, 4), (30.00, now(), 5, 2, 5), (81.00, now(), 6, 2, 6);

insert
    tbRegistro(
        valor,
        dataHora,
        fkComp,
        fkServidor,
        fkMetrica
    )
VALUES (10.00, now() - 100000000, 1, 1, 1), (10.00, now() - 100000000, 2, 1, 2), (80.00, now() - 100000000, 3, 1, 3);

create table
    tbChamados(
        idChamados int primary key auto_increment,
        nivel varchar(45),
        sla VARCHAR(45),
        estado VARCHAR(45),
        fkRegistro int,
        foreign key (fkRegistro) references tbRegistro(idRegst)
    );

SELECT
    DATE_SUB(
        FROM_UNIXTIME(
            MIN(UNIX_TIMESTAMP(r.datahora))
        ),
        INTERVAL MINUTE(
            FROM_UNIXTIME(
                MIN(UNIX_TIMESTAMP(r.datahora))
            )
        ) - ROUND(
            MINUTE(
                FROM_UNIXTIME(
                    MIN(UNIX_TIMESTAMP(r.datahora))
                )
            ) / 5
        ) * 5 MINUTE
    ) as "datahora", (
        select rs.valor
        from tbRegistro rs
            join tbMetrica m on m.idMetrica = rs.fkMetrica
            join tbComponente c on c.idComp = m.fkComponente
            join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
        where
            c.tipo = "CPU"
            and rs.fkServidor = r.fkServidor
        order by rs.idRegst
        limit 1
    ) as "CPU", (
        select rs.valor
        from tbRegistro rs
            join tbMetrica m on m.idMetrica = rs.fkMetrica
            join tbComponente c on c.idComp = m.fkComponente
            join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
        where
            c.tipo = "RAM"
            and rs.fkServidor = r.fkServidor
        order by rs.idRegst
        limit 1
    ) as "RAM", (
        select rs.valor
        from tbRegistro rs
            join tbMetrica m on m.idMetrica = rs.fkMetrica
            join tbComponente c on c.idComp = m.fkComponente
            join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
        where
            c.tipo = "HD"
            and rs.fkServidor = r.fkServidor
        order by rs.idRegst
        limit
            1
    ) as "HD",
    r.fkServidor
FROM tbRegistro r
    JOIN tbMetrica m ON m.idMetrica = r.fkMetrica
WHERE
    r.valor >= m.valor * 0.95
    and month(r.datahora) = month(now())
    and year(r.datahora) = year(now())
GROUP BY
    DATE(r.datahora),
    HOUR(r.dataHora),
    ROUND(MINUTE(r.datahora) / 5) * 5,
    r.fkServidor;

    
select * from tbChamados;
insert into tbChamados values (null, "Alto", "Aberto", "3 horas", 1);