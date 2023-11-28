DELIMITER //
CREATE PROCEDURE buscarEstadoDeServidor(IN _fkServ INT)
BEGIN
    SELECT 
        (SELECT SUM(cpu.alerta) FROM 
            (SELECT * FROM tbServidor 
                JOIN tbComponente ON fkServ = idServ 
                JOIN tbRegistro ON fkComp = idComp 
                    WHERE fkServ = _fkServ 
                    AND fkTipoComponente = 1 
                    ORDER BY idComp DESC 
                    LIMIT 50
            ) AS cpu
        ) AS qtsAlertasCpu,
        (SELECT SUM(ram.alerta) FROM 
            (SELECT * FROM tbServidor    
                JOIN tbComponente ON fkServ = idServ     
                JOIN tbRegistro ON fkComp = idComp 
                    WHERE fkServ = _fkServ 
                    AND fkTipoComponente = 2 
                    ORDER BY idComp DESC 
                    LIMIT 50
            ) AS ram
        ) AS qtsAlertasRam,
        (SELECT SUM(disco.alerta) FROM 
            (SELECT * FROM tbServidor 
                JOIN tbComponente ON fkServ = idServ 
                JOIN tbRegistro ON fkComp = idComp 
                    WHERE fkServ = _fkServ 
                    AND fkTipoComponente = 3 
                    ORDER BY idComp DESC 
                    LIMIT 50
            ) AS disco
        ) AS qtsAlertasDisco;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE MedianBeneficioByType(IN fkEmpresa INT)
BEGIN
    CREATE TEMPORARY TABLE medians AS
    SELECT fktipoComponente, valor_preco_ratio,
           ROW_NUMBER() OVER (
               PARTITION BY fktipoComponente 
               ORDER BY valor_preco_ratio
           ) AS rn,
           COUNT(*) OVER (
               PARTITION BY fktipoComponente
           ) AS cnt
    FROM (
        SELECT tbComponente.fktipoComponente, (tbSpecs.valor / tbComponente.preco) AS valor_preco_ratio
        FROM tbSpecs
        JOIN tbComponente ON tbSpecs.fkComponente = tbComponente.idComp
        JOIN tbServidor ON tbComponente.fkServ = tbServidor.idServ
        JOIN tbAeroporto ON tbServidor.fkAeroporto = tbAeroporto.idAeroporto
        WHERE tbAeroporto.fkEmpresa = fkEmpresa
    ) subquery1;

    SELECT fktipoComponente, AVG(valor_preco_ratio) AS median
    FROM medians
    WHERE rn BETWEEN cnt / 2.0 AND cnt / 2.0 + 1
    GROUP BY fktipoComponente;
    
    DROP TEMPORARY TABLE medians;
END//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE MedianPriceByComponentType(IN empresaID INT)
BEGIN
  SELECT fktipoComponente, AVG(preco) AS median_val
  FROM
  (
    SELECT fktipoComponente, preco, COUNT(*) OVER (PARTITION BY fktipoComponente) AS cnt, ROW_NUMBER() OVER (PARTITION BY fktipoComponente ORDER BY preco) AS rn
    FROM tbComponente
    JOIN tbServidor ON idServ = fkServ
    JOIN tbAeroporto ON idAeroporto = fkAeroporto
    WHERE fkEmpresa = empresaID
  ) AS subquery
  WHERE rn IN (FLOOR((cnt + 1) / 2), FLOOR((cnt + 2) / 2))
  GROUP BY fktipoComponente;
END //
DELIMITER ;



----------------------------------

CREATE PROCEDURE buscarEstadoDeServidor
    @_fkServ INT
AS
BEGIN
    SELECT 
        (SELECT SUM(case when cpu.alerta = 1 then 1 else 0 end) FROM
            (SELECT TOP 50 * FROM tbServidor 
                JOIN tbComponente ON fkServ = idServ 
                JOIN tbRegistro ON fkComp = idComp 
                    WHERE fkServ = @_fkServ
                    AND fkTipoComponente = 1
                    ORDER BY idComp DESC 
            ) AS cpu
        ) AS qtsAlertasCpu,
        (SELECT SUM(case when ram.alerta = 1 then 1 else 0 end) FROM 
            (SELECT TOP 50 * FROM tbServidor    
                JOIN tbComponente ON fkServ = idServ     
                JOIN tbRegistro ON fkComp = idComp 
                    WHERE fkServ = @_fkServ
                    AND fkTipoComponente = 2 
                    ORDER BY idComp DESC 
            ) AS ram
        ) AS qtsAlertasRam,
        (SELECT SUM(case when disco.alerta = 1 then 1 else 0 end) FROM 
            (SELECT TOP 50 * FROM tbServidor 
                JOIN tbComponente ON fkServ = idServ 
                JOIN tbRegistro ON fkComp = idComp 
                    WHERE fkServ = @_fkServ
                    AND fkTipoComponente = 3 
                    ORDER BY idComp DESC 
            ) AS disco
        ) AS qtsAlertasDisco;
END;

EXEC buscarEstadoDeServidor @_fkServ = 1;

CREATE PROCEDURE MedianBeneficioByType
    @fkEmpresa INT
AS
BEGIN
    -- Create a table variable to replace the temporary table
    DECLARE @medians TABLE (
        fktipoComponente INT,
        valor_preco_ratio FLOAT,
        rn INT,
        cnt INT
    )

    -- Populate the table variable
    INSERT INTO @medians
    SELECT fktipoComponente, valor_preco_ratio,
           ROW_NUMBER() OVER (
               PARTITION BY fktipoComponente 
               ORDER BY valor_preco_ratio
           ) AS rn,
           COUNT(*) OVER (
               PARTITION BY fktipoComponente
           ) AS cnt
    FROM (
        SELECT tbComponente.fktipoComponente, (tbSpecs.valor / tbComponente.preco) AS valor_preco_ratio
        FROM tbSpecs
        JOIN tbComponente ON tbSpecs.fkComponente = tbComponente.idComp
        JOIN tbServidor ON tbComponente.fkServ = tbServidor.idServ
        JOIN tbAeroporto ON tbServidor.fkAeroporto = tbAeroporto.idAeroporto
        WHERE tbAeroporto.fkEmpresa = @fkEmpresa
    ) subquery1;

    -- Select the median
    SELECT fktipoComponente, AVG(valor_preco_ratio) AS median
    FROM @medians
    WHERE rn BETWEEN cnt / 2.0 AND cnt / 2.0 + 1
    GROUP BY fktipoComponente;
END;

exec MedianBeneficioByType @fkEmpresa = 1;


CREATE PROCEDURE MedianPriceByComponentType
    @empresaID INT
AS
BEGIN
    SELECT fktipoComponente, AVG(preco) AS median_val
    FROM
    (
        SELECT fktipoComponente, preco, COUNT(*) OVER (PARTITION BY fktipoComponente) AS cnt, ROW_NUMBER() OVER (PARTITION BY fktipoComponente ORDER BY preco) AS rn
        FROM tbComponente
        JOIN tbServidor ON idServ = fkServ
        JOIN tbAeroporto ON idAeroporto = fkAeroporto
        WHERE fkEmpresa = @empresaID
    ) AS subquery
    WHERE rn IN (FLOOR((cnt + 1) / 2.0), FLOOR((cnt + 2) / 2.0))
    GROUP BY fktipoComponente;
END;
exec MedianPriceByComponentType @empresaID = 1;