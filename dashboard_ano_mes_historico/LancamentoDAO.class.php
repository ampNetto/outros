<?php
class LancamentoDAO extends jnDAO {
	public function getAnos() {
		$sql = "
			SELECT
				DISTINCT lan_ano
			FROM
				financas.lancamento
			ORDER BY lan_ano
			";

		// Prepara a query
		$stm = $this->conex->prepare ( $sql );

		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getMes($ano) {
		$sql = "
			SELECT
				DISTINCT lan_mes
			FROM
				financas.lancamento
			WHERE
				lan_ano = {$ano}
			ORDER BY lan_mes
			";

		// Prepara a query
		$stm = $this->conex->prepare ( $sql );

		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getReceitaMensal($ano, $mes) {
		$sql = "
				SELECT 
					(SELECT
						SUM(financas.lancamento.lan_valor) AS valor
					FROM
						financas.lancamento
					INNER JOIN financas.tipolancamento ON (financas.lancamento.tla_id = financas.tipolancamento.tla_id)
					WHERE
						financas.lancamento.lan_ano = {$ano} AND
						financas.lancamento.lan_mes = {$mes} AND
						financas.tipolancamento.tla_tipo = 'c') AS receitabruta,
					(SELECT
						SUM(financas.lancamento.lan_valor) AS valor
					FROM
						financas.lancamento
					INNER JOIN financas.tipolancamento ON (financas.lancamento.tla_id = financas.tipolancamento.tla_id)
					WHERE
						financas.lancamento.lan_ano = {$ano} AND
						financas.lancamento.lan_mes = {$mes} AND
						financas.tipolancamento.tla_tipo = 'c'
						AND tla_reclivre  = true ) AS receitaliquita,
					(SELECT
						SUM(financas.lancamento.lan_valor) AS valor
					FROM
						financas.lancamento
					INNER JOIN financas.tipolancamento ON (financas.lancamento.tla_id = financas.tipolancamento.tla_id)
					WHERE
						financas.lancamento.lan_ano = {$ano} AND
						financas.tipolancamento.tla_tipo = 'c') AS receitatotal1,
					(SELECT
						SUM(financas.lancamento.lan_valor) AS valor
					FROM
						financas.lancamento
					INNER JOIN financas.tipolancamento ON (financas.lancamento.tla_id = financas.tipolancamento.tla_id)
					WHERE
						financas.lancamento.lan_ano = {$ano} AND
						financas.tipolancamento.tla_tipo = 'c'
						AND tla_reclivre  = true ) AS receitatotal2,
					(SELECT
						SUM(financas.lancamento.lan_valor) AS valor
					FROM
						financas.lancamento
					INNER JOIN financas.tipolancamento ON (financas.lancamento.tla_id = financas.tipolancamento.tla_id)
					WHERE
						financas.lancamento.lan_ano = {$ano} AND
						financas.tipolancamento.tla_tipo = 'd') AS descreclivreacum,
					(SELECT
						SUM(financas.lancamento.lan_valor) AS valor
					FROM
						financas.lancamento
					INNER JOIN financas.tipolancamento ON (financas.lancamento.tla_id = financas.tipolancamento.tla_id)
					WHERE
						financas.lancamento.lan_ano = {$ano} AND
						financas.lancamento.lan_mes = {$mes} AND
						financas.tipolancamento.tla_tipo = 'd'
						AND tla_reclivre  = true ) AS descreclivremes
				FROM financas.lancamento
				WHERE
						financas.lancamento.lan_ano = {$ano} AND
						financas.lancamento.lan_mes = {$mes}
				LIMIT 1
			";

		// Prepara a query
		$stm = $this->conex->prepare ( $sql );

		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getMaioresReceita($ano, $mes) {
		$sql = "
				SELECT 
					  financas.tipolancamento.tla_descricao,
					  SUM(financas.lancamento.lan_valor) AS valor,
					  ROW_NUMBER() OVER(ORDER BY SUM(financas.lancamento.lan_valor) DESC) as posicao,
					  (SELECT 
					      SUM(L01.lan_valor) 
					  FROM financas.lancamento L01
					  INNER JOIN financas.tipolancamento L02 ON (L02.tla_id = L01.tla_id)
					WHERE
					  L01.lan_ano = {$ano} AND 
					  L02.tla_tipo = 'c' AND
					  L02.tla_id = financas.tipolancamento.tla_id
					) as acumulo 
					FROM
					  financas.lancamento
					  INNER JOIN financas.tipolancamento ON (financas.lancamento.tla_id = financas.tipolancamento.tla_id)
					WHERE
					  financas.lancamento.lan_ano = {$ano} AND 
					  financas.lancamento.lan_mes = {$mes} AND 
					  financas.tipolancamento.tla_tipo = 'c'
					GROUP BY 
					  financas.tipolancamento.tla_descricao,financas.tipolancamento.tla_id
					ORDER BY
					  SUM(financas.lancamento.lan_valor) DESC
					LIMIT 5
				
			";

		// Prepara a query
		$stm = $this->conex->prepare ( $sql );

		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getMaioresDespesas($ano, $mes) {
		$sql = "
				SELECT
					  financas.tipolancamento.tla_descricao,
					  SUM(financas.lancamento.lan_valor) AS valor,
					  ROW_NUMBER() OVER(ORDER BY SUM(financas.lancamento.lan_valor) DESC) as posicao,
					  (SELECT
					      SUM(L01.lan_valor)
					  FROM financas.lancamento L01
					  INNER JOIN financas.tipolancamento L02 ON (L02.tla_id = L01.tla_id)
					WHERE
					  L01.lan_ano = {$ano} AND
					  L02.tla_tipo = 'd' AND
					  L02.tla_id = financas.tipolancamento.tla_id
					) as acumulo
					FROM
					  financas.lancamento
					  INNER JOIN financas.tipolancamento ON (financas.lancamento.tla_id = financas.tipolancamento.tla_id)
					WHERE
					  financas.lancamento.lan_ano = {$ano} AND
					  financas.lancamento.lan_mes = {$mes} AND
					  financas.tipolancamento.tla_tipo = 'd'
					GROUP BY
					  financas.tipolancamento.tla_descricao,financas.tipolancamento.tla_id
					ORDER BY
					  SUM(financas.lancamento.lan_valor) DESC
					LIMIT 5
					
			";
		
		// Prepara a query
		$stm = $this->conex->prepare ( $sql );
		
		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getReceitaDespesas($ano, $mes) {
		$sql = "
				SELECT 
					  (SELECT 
						 SUM(L01.lan_valor) 
						  FROM financas.lancamento L01
						  INNER JOIN financas.tipolancamento L02 ON (L02.tla_id = L01.tla_id)
						WHERE
						  L01.lan_ano = {$ano} AND 
						  L02.tla_tipo = 'c'
					) as receitas,
					(SELECT 
						SUM(L03.lan_valor) 
						  FROM financas.lancamento L03
						  INNER JOIN financas.tipolancamento L04 ON (L04.tla_id = L03.tla_id)
						WHERE
						  L03.lan_ano = {$ano} AND 
						  L04.tla_tipo = 'd'
					) as despesas 
				FROM
				  financas.lancamento
				  INNER JOIN financas.tipolancamento ON (financas.lancamento.tla_id = financas.tipolancamento.tla_id)
				WHERE
				  financas.lancamento.lan_ano = {$ano} AND 
				  financas.lancamento.lan_mes = {$mes}
				GROUP BY 
				  financas.tipolancamento.tla_descricao,financas.tipolancamento.tla_id
				ORDER BY
				  SUM(financas.lancamento.lan_valor) DESC
				LIMIT 1

			";
		
		// Prepara a query
		$stm = $this->conex->prepare ( $sql );
		
		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getIPCA($ano) {
		$sql = "
				SELECT
						financas.lancamento.lan_valor,
						financas.lancamento.lan_mes
					FROM
						financas.lancamento
					INNER JOIN financas.tipolancamento ON (financas.lancamento.tla_id = financas.tipolancamento.tla_id)
					WHERE
						financas.lancamento.lan_ano = {$ano} AND
						financas.tipolancamento.tla_tipo = 'i'
					ORDER BY
						financas.lancamento.lan_mes
			";
		
		// Prepara a query
		$stm = $this->conex->prepare ( $sql );
		
		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getSeriHistrica($ano, $mes, $tipo){
		$anoAnt = $ano-1;
// 		var_dump($mes);die;

		$sql = "
				SELECT 
					* ,
				lan_valor AS	repase,
				'' AS	mensal,
				3 AS	ir,
				4 AS	porc1,
				5 AS	ipi,
				6 AS	porc2
				FROM 
						financas.lancamento
				WHERE 
						lan_ano between {$anoAnt} AND {$ano}
				AND ((lan_ano::varchar||lpad((lan_mes::varchar),2,'0'))::int <= {$mes}::int)
				AND tla_id = {$tipo}
			";
		
		// Prepara a query
		$stm = $this->conex->prepare ( $sql );
		
		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
		
	}
	public function getTipoLancamento() {
		$sql = "
			SELECT
				tla_id,
				tla_descricao||' '||' \" '|| tla_tipo ||' \"' AS tla_descricao
			FROM
				financas.tipolancamento
			WHERE tla_tipo = 'c'
			ORDER BY tla_descricao
			";
		
		// Prepara a query
		$stm = $this->conex->prepare ( $sql );
		
		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getProjecao($ano,$mes) {
		$sql = "
			SELECT
				(SELECT lan_valor FROM financas.lancamento 
				WHERE lan_ano = {$ano}
				AND lan_mes = {$mes}
				AND tla_id = 1) AS fpm,
				(SELECT lan_valor FROM financas.lancamento 
				WHERE lan_ano = {$ano}
				AND lan_mes = {$mes}
				AND tla_id = 2) AS icms,
				(SELECT lan_valor FROM financas.lancamento 
				WHERE lan_ano = {$ano}
				AND lan_mes = {$mes}
				AND tla_id = 3) AS ipva,
				(SELECT lan_valor FROM financas.lancamento 
				WHERE lan_ano = {$ano}
				AND lan_mes = {$mes}
				AND tla_id = 4) AS tm
			FROM
				financas.lancamento
			WHERE
				lan_ano = {$ano}
				AND lan_mes = {$mes}

			";
		
		// Prepara a query
		$stm = $this->conex->prepare ( $sql );
		
		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetch ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getDespesaLivre($ano,$mes) {
		$sql = "
			SELECT
					*,
					(SELECT sum(lan_valor) FROM
				financas.lancamento
			WHERE
				lan_ano = {$ano}
				AND lan_mes = {$mes}
				AND tla_id = 18) AS totalDespesas
				
			FROM
				financas.lancamento
			WHERE
				lan_ano = {$ano}
				AND lan_mes = {$mes}
				AND tla_id = 18
				
			";
		
		// Prepara a query
		$stm = $this->conex->prepare ( $sql );
		
		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getDespesaVariaveis($ano,$mes) {
		$sql = "
			SELECT
					*,
					(SELECT sum(lan_valor) FROM
				financas.lancamento
			WHERE
				lan_ano = {$ano}
				AND lan_mes = {$mes}
				AND tla_id = 19) AS totalDespesas
				
			FROM
				financas.lancamento
			WHERE
				lan_ano = {$ano}
				AND lan_mes = {$mes}
				AND tla_id = 19
				
			";
		
		// Prepara a query
		$stm = $this->conex->prepare ( $sql );
		
		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getProjAno() {
		$sql = "
			SELECT
				lan_id,
				tla_id,
				lan_ano,
				lan_mes,
				lan_valor,
				lan_descricao
			FROM
				financas.lancamento
			WHERE tla_id >= 1 AND tla_id <=4
			ORDER BY lan_ano, lan_mes,tla_id
				
			";
		
		// Prepara a query
		$stm = $this->conex->prepare ( $sql );
		
		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
	public function getTotalAno($tipo,$ano) {
		$sql = "
			SELECT
				sum(lan_valor),
				tla_id,
				lan_ano
			FROM
				financas.lancamento
			WHERE tla_id = {$tipo} AND lan_ano = {$ano}
			GROUP BY
				tla_id,
				lan_ano
				
			";
		
		// Prepara a query
		$stm = $this->conex->prepare ( $sql );
		
		// Executa a query
		if ($stm->execute ()) {
			return $stm->fetchAll ( PDO::FETCH_ASSOC );
		} else {
			return array ();
		}
	}
}