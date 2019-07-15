<?php
require_once '../../jnfw/config.php';
class ProjecaoAnual extends jnControlePadrao {
	
	/**
	 * Contrutor da classe
	 */
	public function __construct() {
		parent::__construct ( "projecaoanual.tpl", "Projeção de Arrecadação Anual" );
	}
	public function doBeforeGeraTemplate() {
		parent::doBeforeGeraTemplate ();
		
		$this->acaoDefault ();
	}
	
	public function acaoDefault() {
		$acao = $this->_request ( 'acao' );
		
		switch ($acao) {
			case 'getProjAnos' :
				$this->getProjAnos ();
				break;
		}
	}
	
	public function getProjAnos() {
		$lan = new LancamentoDAO();

			if($lan->getProjAno()){
				$projecao = $lan->getProjAno();
				
				
				$msg = false;
			}else{
				$projecao = false;
				$msg = 'Erro, registro não encontrado';
			}
			
		if(!$msg){
			$th = '<th>mes/ano</th>';
			
			foreach ( $projecao as $key => $value ) {
				$anos[$key] = $value['lan_ano'];
				$projecao[$key]['lan_valor'] = 'R$ ' . number_format ( $value ['lan_valor'], 2, ',', '.' );
				$tipo[]= $value['tla_id'];
			}
			
			$uniqAno = array_unique($anos);
			$uniqTipo = array_unique($tipo);
			foreach ( $uniqAno as $key => $value ) {
				$th .= '<th id="ano'.$key.'">'.$value.'</th>';				
			}
			foreach ( $uniqAno as $key => $value ) {
				foreach ( $uniqTipo as $keys => $values ) {
					if($lan->getTotalAno($values, $value)){
						$totalAno[] = $lan->getTotalAno($values, $value);
					}
				}
			}
		}
		foreach ( $totalAno as $key => $value ) {
			
			$totalAno[$key][0]['sum'] = 'R$ ' . number_format ( $value[0]['sum'], 2, ',', '.' );
			
		}
// 		$uniqtotalAno = array_unique($totalAno);
// 		echo "<pre>";
// 		var_dump($totalAno);die;
		$arrayTabela = [
				"totalAno" => $totalAno,
				"th" => $th,
				"projecao" => $projecao,
				"msg" => $msg
		];
		echo json_encode ( $arrayTabela );
		exit ();
	}
}
new ProjecaoAnual ();
