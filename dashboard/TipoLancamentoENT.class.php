<?php
class TipoLancamentoENT extends jnENT {
	public function __construct() {
		// Chama o construtor da classe pai
		parent::__construct ( 'tla_id', 'financas.TipoLancamento' );

		// Seta os campos da entidade
		$this->setNovoCampo ( "tla_descricao", jnENT::TYPE_VARCHAR, "Descrição" );
		$this->setNovoCampo ( "tla_tipo", jnENT::TYPE_VARCHAR, "Tipo" );
		
		
// 		// Opçoes para o campo
		$this->setOpcoes("tla_tipo", array(
				array("valor"=>'c', "label"=>"C"),
				array("valor"=>'d', "label"=>"D"),
				array("valor"=>'i', "label"=>"I")
		));
		
		$this->setDescricao("tla_descricao");

		// Seta o nome legivel da da tela
		$this->setNomeTela ( "Tipo de Lançamento" );
	}
}













