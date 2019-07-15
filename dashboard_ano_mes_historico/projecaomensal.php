<?php
require_once '../../jnfw/config.php';
class ProjecaoMensal extends jnControlePadrao {

	/**
	 * Contrutor da classe
	 */
	public function __construct() {
		parent::__construct ( "projecaomensal.tpl", "Projeção de Arrecadação Mensal" );
	}
	public function doBeforeGeraTemplate() {
		parent::doBeforeGeraTemplate ();

		$this->cosnultaAno ();
		$this->acaoDefault ();
	}
	public function cosnultaAno() {
		// recupara os anos que tem no banco para mostrar na tela conbobox
		$anoDao = new ProjecaoArrecadacaoDAO ();
		$anos = $anoDao->getAnos ();
		$this->smarty->assign ( "anos", $anos );
	}
	public function acaoDefault() {
		$acao = $this->_request ( 'acao' );

		switch ($acao) {
			case 'projecao' :
				$this->projecao ();
				break;
			case 'buscarMes' :
				$this->buscarMes ();
				break;
		}
	}

	public function projecao() {
		// recupera o ano e o mes por ajax
		$ano = $_REQUEST ['ano'];
		$mes = $_REQUEST ['mes'];
		$lanDao = new LancamentoDAO ();
		$msg1 = true;
		$msg2 = true;
		$msg3 = true;
		$proDespecaVariaveis = null;
		$totalVariavel = null;
		$proDespecaFixa = null;
		$totalFixa = null;
		$msg = 'Erro na consulta , registro nao encontrado';
		// consultas para recuparar os valores e jogar no grafico
		if($lanDao->getProjecao ( $ano, $mes )){
			$projecaos = $lanDao->getProjecao ( $ano, $mes );
			$projecao = $this->calculoProjecao($projecaos);
			$msg1 = false;
		}else{
			$projecao ['paraCalculo'] = null;
			$msg1 = ',Projecao. ';
		}
		if($lanDao->getDespesaLivre($ano, $mes)){
			$proDespecaFixa = $lanDao->getDespesaLivre($ano, $mes);
			foreach ($proDespecaFixa as $key => $value){
				$totalFixa = $value['totaldespesas'];
				$proDespecaFixa[$key]['lan_valor'] = 'R$ ' . number_format ( $value['lan_valor'], 2, ',', '.' );
				$proDespecaFixa[$key]['totaldespesas'] = 'R$ ' . number_format ( $value['totaldespesas'], 2, ',', '.' );
			}
			$msg2 = false;
		}else{
			$msg2 = ', Despesa Livre ';
		}
		
		if($lanDao->getDespesaVariaveis($ano, $mes)){
			
			$proDespecaVariaveis =  $lanDao->getDespesaVariaveis($ano, $mes);
			foreach ($proDespecaVariaveis as $keys => $value){
				$totalVariavel = $value['totaldespesas'];
				$proDespecaVariaveis[$keys]['lan_valor'] = 'R$ ' . number_format ( $value['lan_valor'], 2, ',', '.' );
				$proDespecaVariaveis[$keys]['totaldespesas'] = 'R$ ' . number_format ( $value['totaldespesas'], 2, ',', '.' );
			}
			$msg3 = false;
		}else{
			$msg3 = ', Despesa Variaveis ';
		}
// 		var_dump($totalVariavel);die;
		if($projecao ['paraCalculo'] && $totalFixa && $totalVariavel){
			$valorSub = $projecao ['paraCalculo']+$totalFixa+$totalVariavel;
			$totalSub = 'R$ ' . number_format (($valorSub), 2, ',', '.' );
			$totalSoma = 'R$ ' . number_format (($projecao ['valorIniciado']-$valorSub), 2, ',', '.' );
		}else{
			$totalSub = null;
			$totalSoma = null;
		}
// 		var_dump($msg1 , $msg2 , $msg3);die;
		if(!$msg1 && !$msg2 && !$msg3){
			$msg = false;
		}else{
			$msg = $msg.'. Erro em '.$msg1.$msg2.$msg3;
		}
		$arrayTabela = [
				"projecao" => $projecao,
				"proDespecaFixa" => $proDespecaFixa,
				"proDespecaVariaveis" => $proDespecaVariaveis,
				"totalSub" => $totalSub,
				"totalSoma" => $totalSoma,
				"msg" => $msg
		];
		echo json_encode ( $arrayTabela );
		exit ();
	}
	
	
	public function buscarMes() {
		// recupera o ano por ajax e mosta os messes que tem no banco com aquele ano
		$ano = $_REQUEST ['ano'];
		$anoDao = new LancamentoDAO ();
		$meses = $anoDao->getMes ( $ano );
		echo json_encode ( $meses );
		exit ();
	}
	public function calculoProjecao($projecaos){
		
		$projecao ['fpm'] = 'R$ ' . number_format ( $projecaos ['fpm'], 2, ',', '.' );
		$projecao ['icms'] = 'R$ ' . number_format ( $projecaos ['icms'], 2, ',', '.' );
		$projecao ['ipva'] = 'R$ ' . number_format ( $projecaos ['ipva'], 2, ',', '.' );
		$projecao ['tm'] = 'R$ ' . number_format ( $projecaos ['tm'], 2, ',', '.' );
		$projecao ['fpmInicial'] = 0;
		$projecao ['icmsInicial'] = 0;
		$projecao ['ipvaInicial'] = 0;
		$projecao ['tmInicial'] = 0;
		$projecao ['totalInicial'] = 10;
		$projecao ['valorIniciado'] = 10;
		$total = $projecaos ['fpm'] + $projecaos ['icms'] + $projecaos ['ipva'] + $projecaos ['tm'];
		$projecao ['totalArrProj'] = 'R$ ' . number_format ( $total, 2, ',', '.' );
		
		$projecao ['fpmEducacao'] = 'R$ ' . number_format ( ($projecaos ['fpm'] / 100) * 25, 2, ',', '.' );
		$projecao ['icmsEducacao'] = 'R$ ' . number_format ( ($projecaos ['icms'] / 100) * 25, 2, ',', '.' );
		$projecao ['ipvaEducacao'] = 'R$ ' . number_format ( ($projecaos ['ipva'] / 100) * 25, 2, ',', '.' );
		$projecao ['tmEducacao'] = 'R$ ' . number_format ( ($projecaos ['tm'] / 100) * 25, 2, ',', '.' );
		$totalEducacao = (($projecaos ['fpm'] / 100) * 25) + (($projecaos ['icms'] / 100) * 25) + (($projecaos ['ipva'] / 100) * 25) + (($projecaos ['tm'] / 100) * 25);
		$projecao ['totalEducacao'] = 'R$ ' . number_format ( $totalEducacao, 2, ',', '.' );
		
		$projecao ['fpmSaude'] = 'R$ ' . number_format ( ($projecaos ['fpm'] / 100) * 15, 2, ',', '.' );
		$projecao ['icmsSaude'] = 'R$ ' . number_format ( ($projecaos ['icms'] / 100) * 125, 2, ',', '.' );
		$projecao ['ipvaSaude'] = 'R$ ' . number_format ( ($projecaos ['ipva'] / 100) * 15, 2, ',', '.' );
		$projecao ['tmSaude'] = 'R$ ' . number_format ( ($projecaos ['tm'] / 100) * 15, 2, ',', '.' );
		$totalSaude = (($projecaos ['fpm'] / 100) * 15) + (($projecaos ['icms'] / 100) * 15) + (($projecaos ['ipva'] / 100) * 15) + (($projecaos ['tm'] / 100) * 15);
		$projecao ['totalSaude'] = 'R$ ' . number_format ( $totalSaude, 2, ',', '.' );
		$fpm = $projecaos ['fpm'] - (($projecaos ['fpm'] / 100) * 25) - (($projecaos ['fpm'] / 100) * 15);
		$icms = $projecaos ['icms'] - (($projecaos ['icms'] / 100) * 25) - (($projecaos ['icms'] / 100) * 15);
		$ipva = $projecaos ['ipva'] - (($projecaos ['ipva'] / 100) * 25) - (($projecaos ['ipva'] / 100) * 15);
		$tm = $projecaos ['tm'] - (($projecaos ['tm'] / 100) * 25) - (($projecaos ['tm'] / 100) * 15);
		$projecao ['fpmTotaloCal'] = 'R$ ' . number_format ( $fpm, 2, ',', '.' );
		$projecao ['icmsTotaloCal'] = 'R$ ' . number_format ( $icms, 2, ',', '.' );
		$projecao ['ipvaTotaloCal'] = 'R$ ' . number_format ( $ipva, 2, ',', '.' );
		$projecao ['tmTotaloCal'] = 'R$ ' . number_format ( $tm, 2, ',', '.' );
		$totalTotaloCal = $fpm + $icms + $ipva + $tm;
		$projecao ['totalTotaloCal'] = 'R$ ' . number_format ( $totalTotaloCal, 2, ',', '.' );
		$projecao ['paraCalculo'] = $totalTotaloCal;
		
		return $projecao;
	}
}
new ProjecaoMensal ();