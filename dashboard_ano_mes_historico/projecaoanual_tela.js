$(function() {
	$('#hidefull').hide();
	$("#hideFPM").click(function() {
		console.log(this);
		if($('#projecaoFPM').is(':visible')){
			$('#projecaoFPM').hide();
		}else{
			$('#projecaoFPM').show();
		}
	});
	$("#hideICMS").click(function() {
		console.log(this);
		if($('#projecaoICMS').is(':visible')){
			$('#projecaoICMS').hide();
		}else{
			$('#projecaoICMS').show();
		}
	});
	$("#hideIPVA").click(function() {
		console.log(this);
		if($('#projecaoIPVA').is(':visible')){
			$('#projecaoIPVA').hide();
		}else{
			$('#projecaoIPVA').show();
		}
	});
	$("#hideTM").click(function() {
		console.log(this);
		if($('#projecaoTM').is(':visible')){
			$('#projecaoTM').hide();
		}else{
			$('#projecaoTM').show();
		}
	});
	$.ajax({
		url : "projecaoanual.php",
		type : 'POST',
		data : {
			acao : "getProjAnos"
		},
		success : function(resul) {
//			console.log(resul);
			obj = JSON.parse(resul);
//			console.log(obj);
			if (obj.msg) {
				alert(obj.msg);
			} else {
				$('#hideCarregando').hide();
				tiposLancamento(obj, 1, '#tabelaAnualFPM', '#anoFPM', '#tabelaAnualTotalFPM');
				tiposLancamento(obj, 2, '#tabelaAnualICMS', '#anoICMS', '#tabelaAnualTotalICMS');
				tiposLancamento(obj, 3, '#tabelaAnualIPVA', '#anoIPVA', '#tabelaAnualTotalIPVAM');
				tiposLancamento(obj, 4, '#tabelaAnualTM', '#anoTM', '#tabelaAnualTotalTM');
				$('#hidefull').show();
			}
//			
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log(errorThrown + " <==> " + textStatus);
		}
	});
});
function meses() {
	var mes = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
			'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ];
	return mes
}
function tiposLancamento(obj,tipo, tabela, ano, totalTabela){
	mes = meses();
	var valorTotal = '';
//	console.log(ano);
	$(ano).append(obj.th);
//	console.log(obj.projecao);
	$.each(mes,function(chaves, nomes) {
		var valor = '';
		$.each(obj.projecao,function(chave, nome) {
			if(nome['tla_id']== tipo && nome['lan_mes'] == (chaves+1)){
				valor += '<td>'
						+ nome['lan_valor']
						+ '</td>';
			}
		});
//		console.log(valor);
		if(chaves > 0){
			tr = '<tr class="ColumnTDRemove" align="center">';
		}else{
			tr = '';
		}
//		console.log(valor);
		if(valor){
			tdMes = '<tr class="ColumnTDRemove" align="center">'
				+ '<td>'
				+ nomes
				+ '</td>'
				+ valor
				+ '</tr>';
			$(tabela).append(tdMes);
		}
		
		
	});
	$.each(obj.totalAno,function(key, name) {
//		console.log(name[0]['tla_id']);
		if(name[0]['tla_id'] == tipo){
//			console.log(name)
			valorTotal += '<th>'
					+ name[0]['sum']
					+ '</th>';
		}
//		console.log(valorTotal)
	});
	console.log(valorTotal)
	tdTotal = '<tr class="ColumnTDRemove" align="center">'
			+ '<th>'
			+ 'Totals'
			+ '</th>'
			+ valorTotal
			+ '</tr>';
	$(tabela).append(tdTotal);
}

