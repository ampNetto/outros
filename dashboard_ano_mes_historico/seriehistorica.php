<?php
require_once '../../jnfw/config.php';
class SerieHistorica extends jnControlePadrao {

	/**
	 * Contrutor da classe
	 */
	public function __construct() {
		parent::__construct ( "seriehistorica.tpl", "SÉRIE HISTÓRICA" );
	}
	public function doBeforeGeraTemplate() {
		parent::doBeforeGeraTemplate ();

		$this->cosnultaAno ();
		$this->acaoDefault ();
	}
	public function cosnultaAno() {
		// recupara os anos que tem no banco para mostrar na tela conbobox
		$anoDao = new LancamentoDAO ();
		$anos = $anoDao->getAnos ();
		$tipo = $anoDao->getTipoLancamento ();
		$this->smarty->assign ( "tipos", $tipo );
		$this->smarty->assign ( "anos", $anos );
	}
	public function acaoDefault() {
		$acao = $this->_request ( 'acao' );

		switch ($acao) {
			case 'graficos' :
				$this->graficos ();
				break;
			case 'buscarMes' :
				$this->buscarMes ();
				break;
		}
	}
	public function buscarMes() {
		// recupera o ano por ajax e mosta os messes que tem no banco com aquele ano
		$ano = $_REQUEST ['ano'];
		$anoDao = new LancamentoDAO ();
		$meses = $anoDao->getMes ( $ano );
		echo json_encode ( $meses );
		exit ();
	}
	public function graficos() {
		// recupera o ano por ajax e mosta os messes que tem no banco com aquele ano
		$ano = $_REQUEST ['ano'];
		$mes = $_REQUEST ['mes'];
		$tipo = $_REQUEST ['tipo'];
		if (strlen ( ( string ) $mes ) == 1) {
			$mes = '0' . $mes;
		}
		$anoMes = $ano . $mes;

		$anoDao = new LancamentoDAO ();
// 		var_dump($anoDao->getSeriHistrica($ano, $anoMes, $tipo));die;
		
		if (!$anoDao->getSeriHistrica ( $ano, $anoMes, $tipo )) {
			$msg = 'Erro, registro nao encontrado';
			$grafico = false;
			$indici = false;
		} else {
			$grafico = $anoDao->getSeriHistrica ( $ano, $anoMes, $tipo );

			foreach ( $grafico as $key => $value ) {
				// $chave = $key-1;
				if ($value ['lan_mes'] != 1) {
					$mesAntValor = isset ( $grafico [$key - 1] ['lan_valor'] ) ? $grafico [$key - 1] ['lan_valor'] : 0;
					if ($mesAntValor <= 0) {
						$grafico [$key] ['mensal'] = 'erro de calculo';
					} else {
						$grafico [$key] ['mensal'] = round ( (floatval ( $value ['lan_valor'] ) / floatval ( $mesAntValor ) - 1) * 100, 2 );
					}
					// calculo (mesMaior/mesMenor-1)*100 = %
					// var_dump(floatval($value['lan_valor'])/floatval($mesAntValor));die;
				}
				$grafico [$key] ['repase'] = 'R$ ' . number_format ( $value ['lan_valor'], 2, ',', '.' );

				if ($key < 12) {
					$valorAterior = 0;
					$calculo = 0;
					foreach ( $grafico as $keys => $values ) {
// 						echo '<pre>';
// 						var_dump($values ['lan_ano'] != $value ['lan_ano']);
						if ($values ['lan_ano'] != $value ['lan_ano'] && $values ['lan_mes'] == $value ['lan_mes']) {
							$valorAterior = 'R$ ' . number_format ( $values ['lan_valor'], 2, ',', '.' );

							$calculo = round ( (floatval ( $values ['lan_valor'] ) / floatval ( $value ['lan_valor'] ) - 1) * 100, 2 );
							// var_dump($values['lan_valor'],$value['lan_valor']);die;
						}
					}
					$valorSelec = 'R$ ' . number_format ( $value ['lan_valor'], 2, ',', '.' );
					$indici [$key] = [ 
							'mes' => $key,
							'anoTexto' => $ano,
							'anoAnteriorTexto' => $ano - 1,
							'valor' => $calculo,
							'valorAnterior' => $valorAterior,
							'valorSelec' => $valorSelec
					];
					$calculo = 0;
					$valorAterior = 0;
					$valorSelec = 0;
				}
			}
// 			die;
			$msg = false;
			
		}

		$graficos = [ 
				'seriHist' => $grafico,
				'indici' => $indici,
				'msg' => $msg
		];
		// echo '<pre>';
		// var_dump($graficos);die;
		echo json_encode ( $graficos );
		exit ();
	}
}
new SerieHistorica ();