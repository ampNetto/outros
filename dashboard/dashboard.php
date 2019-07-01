<?php
require_once '../../jnfw/config.php';
class Inicio extends jnControlePadrao {

	/**
	 * Contrutor da classe
	 */
	public function __construct() {
		parent::__construct ( "dashboard.tpl", "Controle Gerencial Financeiro" );
	}
	public function doBeforeGeraTemplate() {
		parent::doBeforeGeraTemplate ();

		$this->cosnultaAno ();
		$this->acaoDefault ();
	}
	public function cosnultaAno() {
// 		recupara os anos que tem no banco para mostrar na tela conbobox
		$anoDao = new LancamentoDAO ();
		$anos = $anoDao->getAnos ();
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
	
	/*
	 * Grafico Barras
	 * arquivo ../view/js/dashboard.js
	 * Por Receita
	 */
	public function graficos() {
// 		recupera o ano e o mes por ajax
		$ano = $_REQUEST ['ano'];
		$mes = $_REQUEST ['mes'];
		$lanDao = new LancamentoDAO ();
// 		consultas para recuparar os valores e jogar no grafico 
 		$sqlCalculos = $lanDao->getReceitaMensal($ano, $mes);
 		$maioresReceita = $lanDao->getMaioresReceita($ano, $mes);
 		$maioresDespesas = $lanDao->getMaioresDespesas($ano, $mes);
 		
 		$ReceitaDespesas = $lanDao->getReceitaDespesas($ano, $mes);
		$ipca =  $lanDao->getIPCA($ano);
// 		cria uma array com todas as consultas para mostrar nos graficos
		$arrayGraficoBarra = [ 
				"ReceitaDespesas" => $ReceitaDespesas,
				"ipca" => $ipca,
				"sqlCalculos" => $sqlCalculos,
				"maioresReceita" => $maioresReceita,
				"maioresDespesas" => $maioresDespesas

		];
		echo json_encode ( $arrayGraficoBarra );
		exit ();
	}
	public function buscarMes() {
// 		recupera o ano por ajax e mosta os messes que tem no banco com aquele ano
		$ano = $_REQUEST ['ano'];
		$anoDao = new LancamentoDAO ();
		$meses = $anoDao->getMes ( $ano );
		echo json_encode ( $meses );
		exit ();
	}
}
new Inicio ();