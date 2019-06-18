<?php
require_once 'config.php';

class LancamentoCadastro extends jnControleCadastro {
	/**
	 * Contrutor da classe
	 */
	public function __construct(){
		// Seta os arquivos de controle
		$this->setArquivo("lancamento");
		
		// Chama o contrutor da classe pai
		parent::__construct(new LancamentoDAO(), true);
		
	}
}
new LancamentoCadastro();