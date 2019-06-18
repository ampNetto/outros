<?php
class LancamentoENT extends jnENT {
	public function __construct() {
		// Chama o construtor da classe pai
		parent::__construct ( 'lan_id', 'financas.lancamento' );

		// Seta os campos da entidade
		$this->setNovoCampo ( "tla_id", jnENT::TYPE_INTEGER, "Tipo de Lançamento" );
		$this->setNovoCampo ( "lan_ano", jnENT::TYPE_INTEGER, "Ano" );
		$this->setNovoCampo ( "lan_mes", jnENT::TYPE_INTEGER, "Mês" );
		$this->setNovoCampo ( "lan_descricao", jnENT::TYPE_VARCHAR, "Descrição" );
		$this->setNovoCampo ( "lan_reclivre", jnENT::TYPE_BOOLEAN, "Recurso Livre" );
		$this->setNovoCampo ( "lan_valor", jnENT::TYPE_DECIMAL, "Valor" );
		
		$this->setPropriedade("lan_valor", 	jnENT::PROP_VALIDACAO,  jnENT::VALIDACAO_MOEDA);
		
		/// Seta os campos Fk
		$this->setPropriedade("tla_id", jnENT::PROP_FK, new TipoLancamentoDAO());
		$this->setPropriedade("tla_id", jnENT::PROP_AUTOCOMPLETE, "tipo_lancamento");
		
		// Boolena
		$this->setOpcoesBoolean("lan_reclivre", array("Sim","Nao"));
		
		// Seta o nome legivel da da tela
		$this->setNomeTela ( "Lançamento" );
	}
}
/*
 * tla_id integer,
  lan_ano integer,
  lan_mes integer,
  lan_descricao character varying,
  lan_reclivre boolean,
  lan_valor double precision,
 */












