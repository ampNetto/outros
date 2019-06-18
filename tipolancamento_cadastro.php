<?php
require_once 'config.php';

class TipoLancamentoCadastro extends jnControleCadastro {
	/**
	 * Contrutor da classe
	 */
	public function __construct(){
		// Seta os arquivos de controle
		$this->setArquivo("tipolancamento");
		
		// Chama o contrutor da classe pai
		parent::__construct(new TipoLancamentoDAO(), true);
		
	}
}
new TipoLancamentoCadastro();