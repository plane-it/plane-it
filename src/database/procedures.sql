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
