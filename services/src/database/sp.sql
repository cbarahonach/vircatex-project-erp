
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_asistencias_listar`()
    NO SQL
SELECT pers.*
    FROM personal pers
    LEFT JOIN asistencias ast ON ast.id_personal = pers.id AND DATE(ast.created_at) = DATE(NOW())
    WHERE ast.id_personal IS NULL AND pers.deleted_status = 1 ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_asistencias_registrar`(IN `p_tipo_asistencia` VARCHAR(50), IN `p_id_personal` INT)
    NO SQL
INSERT INTO asistencias(tipo_asistencia, id_personal)
    VALUES(p_tipo_asistencia, p_id_personal) ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_avios_familia_proveedor_listar`()
BEGIN
	select afp.id, a.nombre, p.nombre
	from avios_familia_proveedor afp
	inner join proveedor p on p.id = afp.proveedor_id
	inner join avios_familia af ON af.id = f.avios_familia_id
	inner join avios a ON a.avios_familia_id = af.id;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_clientes_actualizar`(
    IN `Pnombre` VARCHAR(255),
    IN `Ppais` INT,
    IN `Ptc` VARCHAR(255),
    IN `Pcontacto_nombre` VARCHAR(255),
    IN `Pcontacto_email` VARCHAR(255),
    IN `Pcontacto_telefono` VARCHAR(255),
    IN `Pdivision` INT,
    IN `Pvolumen` INT,
    IN `Pid` INT
)
BEGIN
    UPDATE clientes
    SET nombre=Pnombre, pais_id=Ppais, tc_id=Ptc, contacto_nombre=Pcontacto_nombre,
    contacto_email=Pcontacto_email, contacto_telefono=Pcontacto_telefono, 
    division_id=Pdivision, volumen_id=Pvolumen
    WHERE id=Pid AND    deleted_status=1;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_clientes_buscarPorId`(IN `Pid` INT)
    NO SQL
SELECT * FROM clientes WHERE id = Pid and deleted_status = 1 ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_clientes_listar`(IN `pEstado` INT)
BEGIN
	SELECT 
cli.id as 'codigo',cli.nombre,cli.contacto_nombre,cli.contacto_email,cli.contacto_telefono,
DATE(cli.created_at ) as 'creado',
pa.nombre as 'pais', tcli.nombre as 'tipo_cliente', vol.rango as 'volumen', divi.nombre as 'division'
 FROM clientes cli
 INNER JOIN paises pa ON cli.pais_id = pa.id
 INNER JOIN tipos_clientes tcli ON cli.tc_id = tcli.id
 INNER JOIN volumenes vol ON cli.volumen_id = vol.id
 INNER JOIN divisiones divi ON cli.division_id = divi.id
 WHERE cli.deleted_status= pEstado
 ORDER BY cli.id asc;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_clientes_listar_utility`(IN `Pestado` INT)
    NO SQL
SELECT * FROM clientes WHERE deleted_status = Pestado ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_clientes_registrar`(
	IN `pNombre` VARCHAR(255),
	IN `pContacto_nombre` VARCHAR(255),
	IN `pContacto_email` VARCHAR(255),
	IN `pContacto_telefono` VARCHAR(255),
	IN `pUsuario_id` INT,
	IN `pPais_id` INT,
	IN `pTc_id` INT,
	IN `pDivision_id` INT,
	IN `pVolumen_id` INT
)
BEGIN
	INSERT INTO clientes (nombre, contacto_nombre, contacto_email, contacto_telefono, usuario_id, pais_id, tc_id, division_id, volumen_id)
	VALUES (pNombre, pContacto_nombre, pContacto_email, pContacto_telefono, pUsuario_id, pPais_id, pTc_id, pDivision_id, pVolumen_id);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_configuracion_sistema_ver`()
    NO SQL
select * from configuracion_sistema ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_ft_buscarPorId`(
	IN `Pid` INT
)
BEGIN
	SELECT * FROM cotizaciones WHERE id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_ft_consumo_buscarPorId`(
	IN `Pid` INT
)
BEGIN
	SELECT * FROM cotizaciones_ft_hoja_consumo WHERE cotizacion_id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_buscarPorId`(
	IN `Pid` INT
)
BEGIN
	SELECT cot.*, 
	cli.nombre as 'cli_nombre', tem.nombre as 'tem_nombre', 
	vol.rango as 'vol_rango', usu.nombre as 'usu_nombre',
	divi.nombre as 'div_nombre'
	FROM cotizaciones cot 
	INNER JOIN clientes cli ON cli.id = cot.cliente_id
	INNER JOIN divisiones divi ON divi.id = cli.division_id
	INNER JOIN temporadas tem ON tem.id = cot.temporada_id
	INNER JOIN volumenes vol ON vol.id = cli.volumen_id
	INNER JOIN usuarios usu ON usu.id = cot.usuario_id
	WHERE cot.id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_curvas_buscarPorId`(
	IN `Pid` INT
)
BEGIN
	SELECT cc.*, ta.medida FROM cotizaciones_curvas cc
	INNER JOIN tallas ta ON ta.id = cc.talla_id
	WHERE cotizacion_id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_hcot_buscarPorId`(
	IN `Pid` INT
)
BEGIN
	SELECT * FROM cotizaciones_ft_hoja_cotizacion
	WHERE cotizacion_id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_listar`(
	IN `Pestado` INT

)
BEGIN
	SELECT c.`*`, cli.nombre as 'cliente' FROM cotizaciones c
	INNER JOIN clientes cli ON cli.id = c.cliente_id
	WHERE c.deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_curvas_registrar`(
	IN `Pcotizacion_id` INT,
	IN `Ptalla_id` INT,
	IN `Pcantidad` INT
)
BEGIN
	INSERT INTO cotizaciones_curvas (cotizacion_id, talla_id, cantidad)
	VALUES (Pcotizacion_id, Ptalla_id, Pcantidad);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_actualizar`(
	IN `Pcliente_id` INT,
	IN `Pusuario_id` INT,
	IN `Ptemporada_id` INT,
	IN `Pestilo` VARCHAR(255),
	IN `Ptipo_tela` VARCHAR(255),
	IN `Pcomposicion_tela` VARCHAR(255),
	IN `Pcomplemento1` VARCHAR(250),
	IN `Pcomplemento2` VARCHAR(250),
	IN `Pcomplemento3` VARCHAR(250),
	IN `Pcomplemento4` VARCHAR(250),
	IN `Ptp_archivo` VARCHAR(255),
	IN `Phm_archivo` VARCHAR(255),
	IN `Pid` INT
)
BEGIN
	UPDATE cotizaciones SET cliente_id = Pcliente_id, usuario_id = Pusuario_id,
	temporada_id = Ptemporada_id, estilo = Pestilo, tipo_tela = Ptipo_tela,
	composicion_tela = Pcomposicion_tela, complemento1 = Pcomplemento1,
	complemento2 = Pcomplemento2, complemento3 = Pcomplemento3, complemento4 = Pcomplemento4,
	tp_archivo = Ptp_archivo, hm_archivo = Phm_archivo 
	WHERE id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_registrar`(
	IN `Pcliente_id` INT,
	IN `Pusuario_id` INT,
	IN `Ptemporada_id` INT,
	IN `Pestilo` VARCHAR(255),
	IN `Ptipo_tela` VARCHAR(255),
	IN `Pcomposicion_tela` VARCHAR(255),
	IN `Pcomplemento1` VARCHAR(250),
	IN `Pcomplemento2` VARCHAR(250),
	IN `Pcomplemento3` VARCHAR(250),
	IN `Pcomplemento4` VARCHAR(250),
	IN `Ptp_archivo` VARCHAR(255),
	IN `Phm_archivo` VARCHAR(255),
	OUT `last_id` INT
)
BEGIN
	SET @lastID := (SELECT COALESCE(MAX(id),0)+1  FROM cotizaciones);
	SET @dateFormat := (SELECT DATE_FORMAT(NOW(), '%Y%m%d'));
	SET @codRS = CONCAT(Pcliente_id, @dateFormat, @lastID);
	
	INSERT INTO cotizaciones 
	(codigo, estilo, tipo_tela, composicion_tela, complemento1, 
	 complemento2, complemento3, complemento4, tp_archivo, hm_archivo,
	 cliente_id, usuario_id, temporada_id
	)
	 VALUES
	 (@codRS, Pestilo, Ptipo_tela, Pcomposicion_tela, Pcomplemento1,
	  Pcomplemento2, Pcomplemento3, Pcomplemento4, Ptp_archivo, Phm_archivo,
	  Pcliente_id, Pusuario_id, Ptemporada_id
	 );

	SET last_id = (SELECT LAST_INSERT_ID());
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_registrar_ft_hoja_consumo`(
	IN `Pid` INT,
	IN `Pe_molde` VARCHAR(255),
	IN `Pminutaje` VARCHAR(255)
)
BEGIN
	SET @total = (SELECT COUNT(cotizacion_id) FROM cotizaciones_ft_hoja_consumo WHERE cotizacion_id = Pid);
	
	IF(@total > 0) 
	THEN
		UPDATE cotizaciones_ft_hoja_consumo SET 
		encogimiento_molde = Pe_molde, minutaje_corte = Pminutaje
		WHERE cotizacion_id = Pid;
	ELSE
		INSERT INTO cotizaciones_ft_hoja_consumo 
		(cotizacion_id, encogimiento_molde, minutaje_corte)
		VALUES
		(Pid, Pe_molde, Pminutaje);
	END IF;
END ;;
DELIMITER ;

DELIMITER ;;
	CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_eliminar_ft_hoja_cotizacion_rutas`(
	IN `Pcotizacion_id` INT
)
BEGIN
	UPDATE cotizaciones_ft_hoja_cotizacion_rutas SET deleted_status = 0
	WHERE cotizacion_id = Pcotizacion_id;
END ;;
DELIMITER ;

DELIMITER ;;
	CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_eliminar_ft_hoja_cotizacion_avios`(
	IN `Pcotizacion_id` INT
)
BEGIN
	UPDATE cotizaciones_ft_hoja_cotizacion_avios SET deleted_status = 0
	WHERE cotizacion_id = Pcotizacion_id;
END ;;
DELIMITER ;

DELIMITER ;;
	CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_eliminar_ft_hoja_cotizacion_secuencias`(
	IN `Pcotizacion_id` INT
)
BEGIN
	UPDATE cotizaciones_ft_hoja_cotizacion_secuencias SET deleted_status = 0
	WHERE cotizacion_id = Pcotizacion_id;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_hcot_avios_buscarPorId`(
	IN `Pcotizacion_id` INT,
	IN `Pestado` INT
)
BEGIN
	SELECT * FROM cotizaciones_ft_hoja_cotizacion_avios
	WHERE cotizacion_id = Pcotizacion_id and deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_hcot_secuencias_buscarPorId`(
	IN `Pcotizacion_id` INT,
	IN `Pestado` INT
)
BEGIN
	SELECT * FROM cotizaciones_ft_hoja_cotizacion_secuencias
	WHERE cotizacion_id = Pcotizacion_id and deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_registrar_ft_hoja_cotizacion_avios`(
	IN `Pcotizacion_id` INT,
	IN `Pdescripcion` VARCHAR(255),
	IN `Pconsumo` VARCHAR(255),
	IN `Pu_medida` VARCHAR(255)
)
BEGIN
	INSERT INTO cotizaciones_ft_hoja_cotizacion_avios
	(cotizacion_id, descripcion, consumo, unidad_medida) 
	VALUES
	(Pcotizacion_id, Pdescripcion, Pconsumo, Pu_medida);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_registrar_ft_hoja_cotizacion_secuencias`(
	IN `Pcotizacion_id` INT,
	IN `Psecuencia` VARCHAR(255),
	IN `Pdescripcion` VARCHAR(255),
	IN `Pmerma` VARCHAR(255),
	IN `Pmaquina_id` INT,
	IN `Ppuntadas` VARCHAR(255)
)
BEGIN
	INSERT INTO cotizaciones_ft_hoja_cotizacion_secuencias
	(cotizacion_id, secuencia, descripcion, merma, maquina_id, puntadas) 
	VALUES
	(Pcotizacion_id, Psecuencia, Pdescripcion, Pmerma, Pmaquina_id, Ppuntadas);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_hcot_rutas_buscarPorId`(
	IN `Pcotizacion_id` INT,
	IN `Pestado` INT
)
BEGIN
	SELECT * FROM cotizaciones_ft_hoja_cotizacion_rutas 
	WHERE cotizacion_id = Pcotizacion_id and deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_registrar_ft_hoja_cotizacion_rutas`(
	IN `Pcotizacion_id` INT,
	IN `Pruta` VARCHAR(255),
	IN `Pobservacion` VARCHAR(255)
)
BEGIN
	INSERT INTO cotizaciones_ft_hoja_cotizacion_rutas
	(cotizacion_id, rutas, observacion) 
	VALUES
	(Pcotizacion_id, Pruta, Pobservacion);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_registrar_ft_hoja_cotizacion`(
	IN `Pcotizacion_id` INT,
	IN `Pdescripcion` VARCHAR(255),
	IN `Pestilo_interno` VARCHAR(255),
	IN `Pproceso` VARCHAR(255),
	IN `Pimg1` VARCHAR(250),
	IN `Pimg2` VARCHAR(250),
	IN `Pimg3` VARCHAR(250)
)
BEGIN
	SET @total = (SELECT COUNT(cotizacion_id) FROM cotizaciones_ft_hoja_cotizacion WHERE cotizacion_id = Pcotizacion_id);

	IF(@total > 0)
	THEN
		UPDATE cotizaciones_ft_hoja_cotizacion SET descripcion = Pdescripcion, estilo_interno = Pestilo_interno,
		proceso = Pproceso, imagen1 = Pimg1, imagen2 = Pimg2, imagen3 = Pimg3
		WHERE cotizacion_id = Pcotizacion_id;
	ELSE
		INSERT INTO cotizaciones_ft_hoja_cotizacion
		(cotizacion_id, descripcion, estilo_interno, proceso, imagen1, imagen2, imagen3) 
		VALUES
		(Pcotizacion_id, Pdescripcion, Pestilo_interno, Pproceso, Pimg1, Pimg2, Pimg3);
	END IF;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_textil_registrar`(
	IN `Pcotizacion_id` INT,
	IN `Ptipo` INT,
	IN `Particulo` VARCHAR(150),
	IN `Pcolor` VARCHAR(150),
	IN `Ptitulo_tela` VARCHAR(150),
	IN `Pancho_total` VARCHAR(150),
	IN `Pdensidad_aw` VARCHAR(150),
	IN `Pdensidad_bw` VARCHAR(150),
	IN `Pproveedor` VARCHAR(150),
	IN `Previrado` VARCHAR(150),
	IN `Penc_largo` VARCHAR(150),
	IN `Penc_ancho` VARCHAR(150),
	IN `Pprecio` VARCHAR(150)
)
BEGIN
	SET @rs = (SELECT COUNT(cotizacion_id) FROM cotizaciones_textil WHERE cotizacion_id= Pcotizacion_id AND tipo = Ptipo);

	IF( @rs > 0 )
	THEN
		UPDATE cotizaciones_textil SET articulo = Particulo, color = Pcolor, 
		titulo_tela = Ptitulo_tela, ancho_total = Pancho_total, densidad_aw = Pdensidad_aw,
		densidad_bw = Pdensidad_bw, proveedor = Pproveedor, revirado = Previrado,
		encogimiento_largo = Penc_largo, encogimiento_ancho = Penc_ancho, precio = Pprecio
		WHERE cotizacion_id = Pcotizacion_id AND tipo = Ptipo;
	ELSE
		INSERT INTO cotizaciones_textil 
		(
			tipo, articulo, color, titulo_tela, ancho_total, densidad_aw, densidad_bw, 
			proveedor, revirado, encogimiento_largo, encogimiento_ancho, precio, cotizacion_id
		)
		VALUES
		(
			Ptipo, Particulo, Pcolor, Ptitulo_tela, Pancho_total, Pdensidad_aw, Pdensidad_bw,
			Pproveedor, Previrado, Penc_largo, Penc_ancho, Pprecio, Pcotizacion_id
		);
	END IF;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_textil_actualizar_ft_consumos`(
	IN `Pcotizacion_id` INT,
	IN `Ptipo` INT,
	IN `Plargo_tizado_a` VARCHAR(150),
	IN `Ptolerancia` VARCHAR(150),
	IN `Pcomponente` VARCHAR(150),
	IN `Peficiencia` VARCHAR(150),
	IN `Plargo_tizado_b` VARCHAR(150),
	IN `Pconsumo_neto` VARCHAR(150),
	IN `Pmerma_corte` VARCHAR(150)
)
BEGIN
	SET @rs = (SELECT COUNT(cotizacion_id) FROM cotizaciones_textil WHERE cotizacion_id= Pcotizacion_id AND tipo = Ptipo);

	IF( @rs > 0 )
	THEN
		UPDATE cotizaciones_textil SET largo_tizado_a = Plargo_tizado_a, tolerancia = Ptolerancia,
		componente = Pcomponente, eficiencia = Peficiencia, largo_tizado_b = Plargo_tizado_b,
		consumo_neto = Pconsumo_neto, merma_corte = Pmerma_corte
		WHERE cotizacion_id = Pcotizacion_id AND tipo = Ptipo;
	ELSE
		INSERT INTO cotizaciones_textil 
		(
			cotizacion_id, tipo, largo_tizado_a, tolerancia, componente, eficiencia, 
			largo_tizado_b, consumo_neto, merma_corte
		)
		VALUES
		(
			Pcotizacion_id, Ptipo, Plargo_tizado_a, Ptolerancia, Pcomponente, Peficiencia,
			Plargo_tizado_b, Pconsumo_neto, Pmerma_corte
		);
	END IF;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cotizaciones_textil_buscarPorId`(
	IN `Pcotizacion_id` INT,
	IN `Pestado` INT
)
BEGIN
	SELECT * FROM cotizaciones_textil 
	WHERE cotizacion_id = Pcotizacion_id and deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_divisiones_listar`(
	IN `pEstado` INT
)
BEGIN
 SELECT * FROM divisiones WHERE deleted_status = pEstado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_personal`(IN `p_id` INT)
    NO SQL
UPDATE personal
    SET deleted_status = 0
    WHERE id = p_id ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_formas_pagos_listar`(IN `Pestado` INT)
    NO SQL
SELECT * FROM formas_pagos WHERE deleted_status = Pestado ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_hoja_minutos_listar_by_id`(
	IN `Pestado` INT

,
	IN `Pid` INT


)
BEGIN
	SELECT hm.`*`
	FROM hoja_minutos hm
	WHERE hm.deleted_status = Pestado and hm.cotizacion_id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_hoja_minutos_operaciones_eliminar`(
	IN `Pid_hoja_minutos` INT
)
BEGIN
	UPDATE hoja_minutos_operaciones SET deleted_status = 0, deleted_at = now() WHERE id_hoja_minutos = Pid_hoja_minutos;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_hoja_minutos_operaciones_listar_by_id`(
	IN `Pid` INT,
	IN `Pestado` INT

)
BEGIN
	SELECT * FROM hoja_minutos_operaciones
	WHERE deleted_status = Pestado and id_hoja_minutos = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_hoja_minutos_operaciones_registrar`(IN `Pbloque` VARCHAR(50), IN `Poperacion` VARCHAR(50), IN `Pmaquina` INT, IN `Pts` VARCHAR(50), IN `Pcat` VARCHAR(50), IN `Pid_hoja_minutos` INT)
BEGIN
	/*set @val = (SELECT count(id) FROM hoja_minutos_operaciones WHERE id_hoja_minutos = Pid_hoja_minutos);
	
	IF(@val > 0) THEN
		UPDATE hoja_minutos_operaciones SET deleted_status = 0, deleted_at = now() WHERE id_hoja_minutos = Pid_hoja_minutos;
	END IF;
	*/
	insert into hoja_minutos_operaciones ( bloque, operacion,
	 	id_maquina, ts, cat, id_hoja_minutos )
	values 
	(	Pbloque,Poperacion,Pmaquina,Pts,
		Pcat,Pid_hoja_minutos );
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_hoja_minutos_registrar`(
	IN `Panalista` VARCHAR(50), IN `Pfecha` VARCHAR(50), IN `Ppo` VARCHAR(50), 
	IN `Ptipo_prenda` VARCHAR(50), IN `Ptela_cuerpo_1` VARCHAR(50), IN `Ptela_cuerpo_2` VARCHAR(50), 
	IN `Partes` VARCHAR(50), IN `Pacabados` VARCHAR(50), IN `Ptallas` VARCHAR(50), 
	IN `Pjornada` VARCHAR(50), IN `Poperarios` VARCHAR(50), IN `Peficiencia` VARCHAR(50), 
	IN `Pquiero_sacar` VARCHAR(50), IN `Psi_tengo` VARCHAR(50), IN `Ptpo_corte` VARCHAR(50), 
	IN `Ptpo_acabados` VARCHAR(50), IN `Pcotizacion_id` INT, OUT `Oid` INT
	)
BEGIN
	set @val = (SELECT count(id) FROM hoja_minutos WHERE cotizacion_id = Pcotizacion_id);
	
	IF(@val > 0)
	THEN
			update hoja_minutos set analista = Panalista, fecha = Pfecha,
			po = Ppo, tipo_prenda = Ptipo_prenda, tela_cuerpo_1 = Ptela_cuerpo_1, tela_cuerpo_2 = Ptela_cuerpo_2,
			artes = Partes, acabados = Pacabados, tallas = Ptallas, jornada = Pjornada, operarios = Poperarios,
			eficiencia = Peficiencia, quiero_sacar = Pquiero_sacar, si_tengo = Psi_tengo, tpo_corte = Ptpo_corte, tpo_acabados = Ptpo_acabados
            WHERE cotizacion_id = Pcotizacion_id;
			
			SET Oid = (SELECT id FROM hoja_minutos WHERE cotizacion_id = Pcotizacion_id);
	ELSE 
			 insert into hoja_minutos(analista, fecha, po, tipo_prenda,
			 tela_cuerpo_1, tela_cuerpo_2, artes, acabados, tallas, jornada, 
			 operarios, eficiencia, quiero_sacar, si_tengo, tpo_corte, tpo_acabados, cotizacion_id)
			 values
			 (Panalista, Pfecha, Ppo, Ptipo_prenda, 
			 Ptela_cuerpo_1, Ptela_cuerpo_2, Partes, Pacabados, Ptallas, Pjornada, 
			 Poperarios, Peficiencia, Pquiero_sacar, Psi_tengo, Ptpo_corte, Ptpo_acabados, Pcotizacion_id);
			 
			 SET Oid = LAST_INSERT_ID();
	END IF;
	 
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_maquinas_listar`(
	IN `Pestado` INT
)
BEGIN
	SELECT * FROM maquinas WHERE deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_modulos_listar`(
	IN `Pestado` INT
)
BEGIN
	SELECT * FROM modulos WHERE deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_modulos_registrar`(
	IN `Pnombre` VARCHAR(50),
	IN `Pruta` VARCHAR(50)
)
BEGIN
	INSERT INTO modulos (nombre, ruta) VALUES (Pnombre, Pruta);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_modulos_rutas_listar`(
	IN `Pestado` INT
)
BEGIN
	SELECT m.nombre AS 'modulo', mr.*  FROM modulos_rutas mr
	INNER JOIN modulos m ON m.id = mr.modulo_id
	WHERE mr.deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_modulos_rutas_registrar`(
	IN `Pmodulo_id` INT,
	IN `Pnombre` VARCHAR(100),
	IN `Pruta` VARCHAR(100)


)
BEGIN
	INSERT INTO modulos_rutas (modulo_id, nombre, ruta) VALUES (Pmodulo_id, Pnombre, Pruta);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_modulos_usuarioAccesos`(
	IN `Pid` INT
)
BEGIN
	
	SELECT mo.nombre AS 'modulo', mr.nombre AS 'mr_nombre', mr.ruta AS 'mr_ruta', rr.id, rr.rol_id, rr.ruta_id 
	FROM usuarios usu 
	INNER JOIN rutas_roles rr ON rr.rol_id = usu.rol_id
	INNER JOIN modulos_rutas mr ON mr.id = rr.ruta_id
	INNER JOIN modulos mo ON mo.id = mr.modulo_id
	WHERE usu.id = Pid AND mr.deleted_status = 1;

END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_monedas_listar`(IN `Pestado` INT)
    NO SQL
SELECT * FROM monedas WHERE deleted_status = Pestado ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_paises_listar`(
	IN `pEstado` INT
)
BEGIN
	SELECT * FROM paises WHERE deleted_status = pEstado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_personal_actualizar`(
    IN `Pnombres` VARCHAR(50),
    IN `Papellidos` VARCHAR(50),
    IN `Parea` VARCHAR(50),
    IN `Phora_ingreso` TIME,
    IN `Phora_salida` TIME,
    IN `Pid` INT
)
BEGIN
    UPDATE personal
    SET nombres=Pnombres, apellidos=Papellidos, area=Parea, 
    hora_ingreso=Phora_ingreso, hora_salida=Phora_salida
    WHERE id=Pid AND deleted_status=1;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_personal_buscarPorId`(
    IN `Pid` INT
)
BEGIN
    SELECT * FROM personal
    WHERE id = Pid and deleted_status = 1;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_personal_listar`(IN `pEstado` INT)
    NO SQL
SELECT id, concat(nombres,' ',apellidos) as Personal, area, hora_ingreso, hora_salida,
    deleted_status, created_at, updated_at, deleted_at
    FROM personal WHERE deleted_status=pEstado ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_personal_registrar`(IN `pNombres` VARCHAR(50), IN `pApellidos` VARCHAR(50), IN `pArea` VARCHAR(50), IN `pHora_ingreso` TIME, IN `pHora_salida` TIME)
    NO SQL
INSERT INTO personal(nombres, apellidos, area, hora_ingreso, hora_salida)
    VALUES(pNombres, pApellidos, pArea, pHora_ingreso, pHora_Salida) ;;
DELIMITER ;


DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_proveedores_registrar`
(IN `Pforma_pago_id` INT,
 IN `Pmoneda_id` INT, 
 IN `Prazon_social` VARCHAR(100),
 IN `Pruc` VARCHAR(50), 
 IN `Pdireccion` VARCHAR(150),
 IN `Ptelefono` VARCHAR(20),
 IN `Pbanco_id` INT,
 IN `Pnum_cuenta` VARCHAR(50),
 IN `Pnum_cuenta_cci` VARCHAR(50),
 IN `Pcorreo` VARCHAR(100))
    NO SQL
INSERT INTO proveedores(
forma_pago_id, moneda_id, razon_social, ruc,
direccion, telefono, banco_id, num_cuenta, num_cuenta_interbancaria,correo)
VALUES
(
    Pforma_pago_id, Pmoneda_id, Prazon_social, Pruc,
    Pdireccion, Ptelefono, Pbanco_id, Pnum_cuenta, Pnum_cuenta_cci,Pcorreo
) ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reportes_manufactura_actualizar`(
	IN `Pid` INT,
	IN `Pdata` TEXT
)
BEGIN
	UPDATE reportes_manufactura 
	SET data_json = Pdata
	WHERE id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reportes_manufactura_buscarPorId`(
	IN `Pid` INT

)
BEGIN
	SELECT rm.id, rm.cliente, rm.usuario_id, rm.created_at, rm.data_json, usu.nombre as 'usuario_nombre'
	FROM reportes_manufactura rm
	INNER JOIN usuarios usu ON usu.id = rm.usuario_id
	WHERE rm.id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reportes_manufactura_listar`(
	IN `Pestado` INT


)
BEGIN
	SELECT rm.id,rm.cliente, rm.usuario_id, rm.created_at, usu.nombre as 'usuario_nombre', rm.updated_at
	FROM reportes_manufactura rm
	INNER JOIN usuarios usu ON usu.id = rm.usuario_id
	WHERE rm.deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reportes_manufactura_registrar`(
	IN `Pcliente` VARCHAR(100),
	IN `Pusuario_id` INT,
	IN `Pdata_json` TEXT


)
BEGIN
	INSERT INTO reportes_manufactura
	(cliente, usuario_id, data_json)
	VALUES
	(Pcliente,Pusuario_id,Pdata_json);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reportes_textil_actualizar`(
	IN `Pid` INT,
	IN `Pfabrica` VARCHAR(255),
	IN `Pcliente` VARCHAR(255),
	IN `Pfecha_creacion_po` VARCHAR(100),
	IN `Ppo_buy` VARCHAR(255),
	IN `Pestilo` VARCHAR(255),
	IN `Pop` VARCHAR(255),
	IN `Ptintoreria` VARCHAR(255),
	IN `Poc_tela` VARCHAR(255),
	IN `Pfecha_oc_tela` VARCHAR(100),
	IN `Particulo` VARCHAR(510),
	IN `Ptela_principal_complemento` VARCHAR(255),
	IN `Pcolor` VARCHAR(255),
	IN `Pkg_prog` VARCHAR(255),
	IN `Ppartida` VARCHAR(255),
	IN `Pfecha_hilado` VARCHAR(100),
	IN `Pfecha_tejido` VARCHAR(100),
	IN `Pfecha_tenhido` VARCHAR(100),
	IN `Pfecha_ta_planta` VARCHAR(100),
	IN `Pfecha_programada_auditoria` VARCHAR(100),
	IN `Pfecha_reprogramada_auditoria` VARCHAR(100),
	IN `Pfecha_despacho_real` VARCHAR(100),
	IN `Pkilos_despacho` VARCHAR(100),
	IN `Pdias_atraso` VARCHAR(100),
	IN `Pcomentarios` VARCHAR(510),
	IN `Psituacion_actual` VARCHAR(255),
	IN `Ptipo_req` VARCHAR(255)
)
BEGIN
	UPDATE reportes_textil SET
	fabrica = Pfabrica,
	cliente = Pcliente,
	fecha_creacion_po = Pfecha_creacion_po,
	po_buy = Ppo_buy,
	estilo = Pestilo,
	op = Pop,
	tintoreria = Ptintoreria,
	oc_tela = Poc_tela,
	fecha_oc_tela = Pfecha_oc_tela,
	articulo = Particulo,
	tela_principal_complemento = Ptela_principal_complemento,
	color = Pcolor,
	kg_prog = Pkg_prog,
	partida = Ppartida,
	fecha_hilado = Pfecha_hilado,
	fecha_tejido = Pfecha_tejido,
	fecha_tenhido = Pfecha_tenhido,
	fecha_ta_planta = Pfecha_ta_planta,
	fecha_programada_auditoria = Pfecha_programada_auditoria,
	fecha_reprogramada_auditoria = Pfecha_reprogramada_auditoria,
	fecha_despacho_real = Pfecha_despacho_real,
	kilos_despacho = Pkilos_despacho,
	dias_atraso = Pdias_atraso,
	comentarios = Pcomentarios,
	situacion_actual = Psituacion_actual,
	tipo_req = Ptipo_req
	WHERE id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reportes_textil_listar`(
	IN `Pestado` INT
)
BEGIN
	SELECT * FROM reportes_textil WHERE deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reportes_textil_registrar`(
	IN `Pfabrica` VARCHAR(255),
	IN `Pcliente` VARCHAR(255),
	IN `Pfecha_creacion_po` VARCHAR(100),
	IN `Ppo_buy` VARCHAR(255),
	IN `Pestilo` VARCHAR(255),
	IN `Pop` VARCHAR(255),
	IN `Ptintoreria` VARCHAR(255),
	IN `Poc_tela` VARCHAR(255),
	IN `Pfecha_oc_tela` VARCHAR(100),
	IN `Particulo` VARCHAR(510),
	IN `Ptela_principal_complemento` VARCHAR(255),
	IN `Pcolor` VARCHAR(255),
	IN `Pkg_prog` VARCHAR(255),
	IN `Ppartida` VARCHAR(255),
	IN `Pfecha_hilado` VARCHAR(100),
	IN `Pfecha_tejido` VARCHAR(100),
	IN `Pfecha_tenhido` VARCHAR(100),
	IN `Pfecha_ta_planta` VARCHAR(100),
	IN `Pfecha_programada_auditoria` VARCHAR(100),
	IN `Pfecha_reprogramada_auditoria` VARCHAR(100),
	IN `Pfecha_despacho_real` VARCHAR(100),
	IN `Pkilos_despacho` VARCHAR(100),
	IN `Pdias_atraso` VARCHAR(100),
	IN `Pcomentarios` VARCHAR(510),
	IN `Psituacion_actual` VARCHAR(255),
	IN `Ptipo_req` VARCHAR(255)

)
BEGIN
	INSERT INTO reportes_textil 
	(
	 fabrica, cliente, fecha_creacion_po, po_buy, estilo, op, tintoreria, oc_tela, fecha_oc_tela, 
	 articulo, tela_principal_complemento, color, kg_prog, partida, fecha_hilado, fecha_tejido,
	 fecha_tenhido, fecha_ta_planta, fecha_programada_auditoria, fecha_reprogramada_auditoria,
	 fecha_despacho_real, kilos_despacho, dias_atraso, comentarios, situacion_actual, tipo_req
	 )
	 VALUES
	 (
	 Pfabrica, Pcliente, Pfecha_creacion_po, Ppo_buy, Pestilo, Pop, Ptintoreria, Poc_tela, Pfecha_oc_tela, 
	 Particulo, Ptela_principal_complemento, Pcolor, Pkg_prog, Ppartida, Pfecha_hilado, Pfecha_tejido,
	 Pfecha_tenhido, Pfecha_ta_planta, Pfecha_programada_auditoria, Pfecha_reprogramada_auditoria,
	 Pfecha_despacho_real, Pkilos_despacho, Pdias_atraso, Pcomentarios, Psituacion_actual, Ptipo_req
	 );
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_roles_listar`(
	IN `Pestado` INT
)
BEGIN
	SELECT * FROM roles WHERE deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rutas_roles_listar_roles_registrados`(
	IN `Pestado` INT



)
BEGIN
	SELECT roles.id as 'rol_id', modulos_rutas.modulo_id, roles.nombre as 'rol_nombre', modulos_rutas.nombre as 'ruta_nombre' FROM rutas_roles 
	INNER JOIN modulos_rutas ON modulos_rutas.id = rutas_roles.ruta_id
	INNER JOIN roles ON rutas_roles.rol_id = roles.id
	WHERE modulos_rutas.deleted_status = Pestado
	ORDER BY modulos_rutas.modulo_id, roles.nombre;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_rutas_roles_registrar_roles_accesos`(
	IN `Prol` INT,
	IN `Pruta` INT
)
BEGIN
	INSERT INTO rutas_roles (rutas_roles.rol_id, rutas_roles.ruta_id)
	VALUES (Prol, Pruta);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tallas_listar`(
	IN `Pestado` INT
)
BEGIN
	SELECT * FROM tallas WHERE  deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_temporadas_listar`(
	IN `Pestado` INT

)
BEGIN
	SELECT * FROM temporadas WHERE deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tipos_clientes_listar`(
	IN `pEstado` INT
)
BEGIN
 SELECT * FROM tipos_clientes WHERE deleted_status = pEstado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuarios_change_password`(
 IN Pid INT,
 IN Ppassword varchar(255)
)
BEGIN
UPDATE usuarios SET usuarios.password = Ppassword WHERE usuarios.id = Pid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuarios_listar`(
	IN `Pestado` INT

)
BEGIN
	SELECT * FROM usuarios WHERE deleted_status = Pestado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuarios_registrar`(IN `pNombre` VARCHAR(255), IN `pEmail` VARCHAR(255), IN `pPassword` VARCHAR(255), IN `pRol_id` INT)
BEGIN
	INSERT INTO usuarios (nombre, email, password, rol_id) 
   VALUES (pNombre, pEmail, pPassword, pRol_id);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuarios_verificar`(
	IN `pEmail` VARCHAR(255),
	IN `pEstado` INT

)
    NO SQL
BEGIN
	SELECT usu.*, ro.nombre as 'rol_nombre' FROM usuarios usu 
	INNER JOIN roles ro ON ro.id = usu.rol_id
	WHERE usu.email=pEmail and usu.deleted_status=pEstado;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_volumenes_listar`(
	IN `pEstado` INT
)
BEGIN
 SELECT * FROM volumenes WHERE deleted_status = pEstado;
END ;;
DELIMITER ;






DELIMITER ;;
create procedure `sp_orden_compras_items_registrar`
(
    IN `pOrden_compra_id` INT,
    IN `pItem` VARCHAR(150),
    IN `pConcepto` VARCHAR(150),
    IN `pCantidad` INT,
    IN `pUnidad_medida` VARCHAR(150),
    IN `pPrecio_unitario` DOUBLE
)
BEGIN
  INSERT INTO orden_compras_items( orden_compra_id , item , concepto , cantidad , unidad_medida , precio_unitario  )
  VALUES (`pOrden_compra_id`,`pItem`,`pConcepto`,`pCantidad`,`pUnidad_medida`,`pPrecio_unitario`);
END;;
DELIMITER ;


/* prpcedimientos modulo logistica 26/02/2020 17:34 */

DELIMITER ;;
create PROCEDURE `sp_orden_compras_servicios_registrar`
(
	IN `pId_usuario` INT,
	IN `pTipo_orden` INT,
	IN `pProveedor_id` INT,
	IN `pPrograma` VARCHAR(150),
	IN `pPo` VARCHAR(100),
	IN `pFecha_entrega` VARCHAR(255),
    IN `pIgv` INT,
    OUT `pContador_orden_compras` INT,
    OUT `pContador_orden_compras_servicios` INT,
	OUT `pConfiguracion_sistema_orden_compras` INT,
    OUT `pConfiguracion_sistema_orden_compras_servicios` INT,
	OUT `pMax_id` INT
    
    )
BEGIN
 

  INSERT INTO orden_compras_servicios (usuario_id,tipo_orden,proveedor_id,programa,po,fecha_entrega,igv )
  VALUES (`pId_usuario`,`pTipo_orden`,`pProveedor_id`,`pPrograma`,`pPo`,`pFecha_entrega`,`pIgv`);
     
  SET pContador_orden_compras = (select count(tipo_orden) from orden_compras_servicios where tipo_orden = 1 );
  SET pContador_orden_compras_servicios = (select count(tipo_orden) from orden_compras_servicios  where tipo_orden = 2);
  set pConfiguracion_sistema_orden_compras = (select codigo_orden_compra from configuracion_sistema where id = 1);
  set pConfiguracion_sistema_orden_compras_servicios = (select codigo_orden_servicio from configuracion_sistema where id = 1);
  SET pMax_id = (SELECT LAST_INSERT_ID());   
     
     
  if pContador_orden_compras = 1 and pTipo_orden = 1 THEN
		update orden_compras_servicios set codigo_orden_compras = concat('VIT00',pConfiguracion_sistema_orden_compras)  where id = pMax_id;
		update configuracion_sistema SET codigo_orden_compra = (pConfiguracion_sistema_orden_compras + 1) where id = 1; 
   
  elseIF pContador_orden_compras > 1 and pTipo_orden = 1 THEN
		 if LENGTH(pConfiguracion_sistema_orden_compras) >= 3  then
			update orden_compras_servicios set codigo_orden_compras = concat('VIT00',pConfiguracion_sistema_orden_compras)  where id = pMax_id;
			update configuracion_sistema SET codigo_orden_compra = (pConfiguracion_sistema_orden_compras + 1) where id = 1; 
         end if ;
     if LENGTH(pConfiguracion_sistema_orden_compras) >= 4  then
		update orden_compras_servicios set codigo_orden_compras = concat('VIT0',pConfiguracion_sistema_orden_compras)  where id = pMax_id;
		update configuracion_sistema SET codigo_orden_compra = (pConfiguracion_sistema_orden_compras + 1) where id = 1; 
     end if ;
      if LENGTH(pConfiguracion_sistema_orden_compras) >= 5  then
		update orden_compras_servicios set codigo_orden_compras = concat('VIT',pConfiguracion_sistema_orden_compras)  where id = pMax_id;
		update configuracion_sistema SET codigo_orden_compra = (pConfiguracion_sistema_orden_compras + 1) where id = 1; 
      end if;
	END IF;
  /*orden_compra_servicio*/
  if  pContador_orden_compras_servicios =  1 and pTipo_orden = 2 THEN
	    update orden_compras_servicios set codigo_orden_compras_servicios = concat('VIT00',pConfiguracion_sistema_orden_compras_servicios)  where id = pMax_id;
		update configuracion_sistema SET codigo_orden_servicio = (codigo_orden_servicio + 1) where id = 1; 
	
  elseif  pContador_orden_compras_servicios > 1 and pTipo_orden = 2 THEN
                
		if LENGTH(pConfiguracion_sistema_orden_compras_servicios) >= 3  then
			update orden_compras_servicios set codigo_orden_compras_servicios = concat('VIT00',pConfiguracion_sistema_orden_compras_servicios)  where id = pMax_id;
			update configuracion_sistema SET codigo_orden_servicio = (pConfiguracion_sistema_orden_compras_servicios + 1) where id = 1; 
         end if ;
     if LENGTH(pConfiguracion_sistema_orden_compras_servicios) >= 4  then
		update orden_compras_servicios set codigo_orden_compras_servicios = concat('VIT0',pConfiguracion_sistema_orden_compras_servicios)  where id = pMax_id;
		update configuracion_sistema SET codigo_orden_servicio = (pConfiguracion_sistema_orden_compras_servicios + 1) where id = 1; 
     end if ;
      if LENGTH(pConfiguracion_sistema_orden_compras_servicios) >= 5  then
		update orden_compras_servicios set codigo_orden_compras_servicios = concat('VIT',pConfiguracion_sistema_orden_compras_servicios)  where id = pMax_id;
		update configuracion_sistema SET codigo_orden_servicio = (pConfiguracion_sistema_orden_compras_servicios + 1) where id = 1; 
      end if;
  END IF;
  
  
END;;
DELIMITER ;

DELIMITER ;;
create procedure `sp_orden_compras_servicios_listar`
(
    IN `pTipo_orden` INT,
	IN `pEstado` INT
)
BEGIN
	SELECT ocs.*, usu.nombre AS 'usuario_nombre', usu.email AS 'usuario_email', fp.nombre AS 'fp_nombre',
	mon.codigo AS 'moneda_codigo', mon.nombre AS 'moneda_nombre', prov.razon_social AS 'prov_razon_social',
	prov.ruc AS 'prov_ruc', prov.direccion AS 'prov_direccion', prov.telefono AS 'prov_telefono', 
	banc.nombre AS 'banco_nombre', prov.num_cuenta AS 'prov_num_cuenta', 
	prov.num_cuenta_interbancaria AS 'prov_num_cuenta_interbancaria', prov.correo AS 'prov_correo'
	FROM orden_compras_servicios ocs
	INNER JOIN usuarios usu ON usu.id = ocs.usuario_id
	INNER JOIN proveedores prov ON prov.id = ocs.proveedor_id
	INNER JOIN formas_pagos fp ON fp.id = prov.forma_pago_id
	INNER JOIN monedas mon ON mon.id = prov.moneda_id
	INNER JOIN bancos banc ON banc.id = prov.banco_id
	WHERE ocs.tipo_orden = pTipo_orden AND ocs.deleted_status = pEstado
	ORDER BY ocs.id desc;
END;;
DELIMITER ;

DELIMITER ;;
create procedure `sp_orden_compras_items_listar_por_id`
(
    IN `pId` INT,
	IN `pEstado` INT
)
BEGIN
	SELECT * FROM orden_compras_items
	WHERE deleted_status = pEstado AND  orden_compra_id = pId;
END;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_bancos_listar`(
	IN `pEstado` INT
)
BEGIN
 SELECT * FROM bancos WHERE deleted_status = pEstado;
END ;;
DELIMITER ;

/* prpcedimientos modulo externo 26/02/2020 17:34 */
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reportes_manufactura_eliminarPorId`(
	IN `pId` INT
)
BEGIN
 UPDATE reportes_manufactura SET deleted_status=0 WHERE id = pId;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_reportes_textil_eliminar`(
	IN `pId` INT
)
BEGIN
 UPDATE reportes_textil SET deleted_status=0 WHERE id = pId;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE  PROCEDURE `sp_proveedor_actualizar_orden_compra`(
	 IN `pFormaPagoId` INT,
	 IN `pMonedaId` INT,
     IN `pBanco_id`  INT,
     IN `pNum_cuenta` varchar(100),
     IN `pNum_cuenta_interbancaria` varchar(100),
     IN `pId` INT
)
BEGIN
 UPDATE proveedores SET forma_pago_id =pFormaPagoId,
 moneda_id = pMonedaId , banco_id = pBanco_id ,
  num_cuenta= pNum_cuenta,
  num_cuenta_interbancaria = pNum_cuenta_interbancaria
  WHERE id = pId;
END;;
DELIMITER ;

/* 27/02/20  15:21*/
DELIMITER ;;
CREATE  PROCEDURE `sp_proveedores_eliminar`(
     IN `pId` INT
)
BEGIN
 UPDATE proveedores SET deleted_status = 0
 WHERE id = pId;
END;;
DELIMITER ;

/* 27/02/20  15:21*/
DELIMITER ;;
CREATE  PROCEDURE `sp_orden_compra_eliminar_por_id`(
     IN `pId` INT
)
BEGIN
 UPDATE orden_compras_servicios SET deleted_status = 0
 WHERE id = pId;
END;;
DELIMITER ;

/* 27/02/20  16:58*/
DELIMITER ;;
create  PROCEDURE `sp_proveedores_listar_por_id`
(
     IN `pId` INT,
     IN `pEstado` INT
)
BEGIN
   SELECT * FROM proveedores
	WHERE deleted_status = pEstado AND  id = pId;
END;;
DELIMITER ;

/* 28/02/20  09:51*/

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_proveedores_actualizar`(
	 IN `pFormaPagoId` INT,
	 IN `pMonedaId` INT,
     IN `pRazon_social` varchar(150),
	 IN `pRuc` varchar(100),
     IN `pDireccion` varchar(100),
     IN `pTelefono` varchar(50),
     IN `pBanco_id` INT,
     IN `pNum_cuenta` varchar(100),
     IN `pNum_cuenta_interbancaria` varchar(100),
     IN `pCorreo` varchar(100),
     IN `pId` INT
)
BEGIN
  UPDATE proveedores SET
  forma_pago_id =pFormaPagoId,
  moneda_id = pMonedaId ,
  razon_social = pRazon_social,
  ruc = pRuc,
  direccion = pDireccion,
  telefono = pTelefono,
  banco_id = pBanco_id ,
  num_cuenta= pNum_cuenta,
  num_cuenta_interbancaria = pNum_cuenta_interbancaria,
  correo = pCorreo
  WHERE id = pId;
END ;;
DELIMITER ;


DELIMITER ;;
CREATE  PROCEDURE `sp_proveedores_listar`(IN `Pestado` INT)
BEGIN
	SELECT prov.*, fp.nombre as 'forma_pago', m.nombre as 'moneda', b.nombre as 'banco' FROM proveedores prov
	INNER JOIN formas_pagos fp ON fp.id = prov.forma_pago_id
	INNER JOIN monedas m ON m.id = prov.moneda_id
	INNER JOIN bancos b ON  b.id = prov.banco_id
	WHERE prov.deleted_status = Pestado
	ORDER BY prov.id desc;
END ;;
DELIMITER ;
