<?php
require_once 'config.php';

class TipoLancamentoConsulta extends jnControleConsulta {
	/**
	 * Contrutor da classe
	 */
	public function __construct(){
		// Seta os arquivos de controle
		$this->setArquivo("tipolancamento");
		
		// Chama o contrutor da classe pai
		parent::__construct(new TipoLancamentoDAO(),true);

	}
	
}
new TipoLancamentoConsulta();