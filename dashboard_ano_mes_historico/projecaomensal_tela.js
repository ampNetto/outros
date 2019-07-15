$(function() {

	 $('#hide').hide();
	 $('#hideCarregando').hide();
	buscarAno();
	$("#busca_ano").click(function() {
		$("#busca_mes").val('');
		 $('#hide').hide();
	});
	$("#busca_mes").click(function() {
		$('#hideCarregando').show();
		var tipo = $('#busca_tipo').find(':selected').val();
		var ano = $('#busca_ano').find(':selected').val();
		var mes = $('#busca_mes').find(':selected').val();
		var valor = [], valores = [];
		if (!ano) {
			var msgAlertaAno = ano ? ' ' : 'Selecione um Ano !'
			alert(msgAlertaAno);
		} else {
			$.ajax({
				url : "projecaomensal.php",
				type : 'POST',
				data : {
					acao : "projecao",
					ano : ano,
					mes : mes,
					tipo : tipo
				},
				success : function(resul) {
//					 console.log(resul);
					 obj = JSON.parse(resul);
					$('.ColumnTDRemove').remove();
					var mes = meses();
					if (obj.msg) {
						$('#hide').hide();
						alert(obj.msg);
						$("#busca_mes").val('');
						$('#hideCarregando').hide();

					}else{

						$('#hide').show();
						$('#hideCarregando').hide();
						var DespecaFixaTexto , proDespecaFixaTotal, DespecaVariTexto, proDespecaVariTotal;
//						 console.log(obj.proDespecaVariaveis);
						 var proDespecaFixa = [],proDespecaVariaveis = [];
						 $.each(obj.proDespecaFixa,function(chave,nome){
							 
							proDespecaFixa[chave] =  '<tr class="ColumnTDRemove" align="center">'
														+ '<td>'
														+ nome['lan_descricao']
														+ '</td>'
														+ '<td>'
														+ nome['lan_valor']
														+ '</td>'
													+ '</tr>';
							 
							 DespecaFixaTexto = 'TOTAL PROJ. DESP. FIXAS';
							 proDespecaFixaTotal = nome['totaldespesas'];
						 });
						 proDespecaFixa.push('<tr class="ColumnTDRemove" align="center" '
														+'style="background-color: #8B8989; color: #f5f5f0;">'
														+ '<td>'
														+ DespecaFixaTexto
														+ '</td>'
														+ '<td>'
														+ proDespecaFixaTotal
														+ '</td>'
													+ '</tr>');
						 $.each(obj.proDespecaVariaveis,function(chaves,nomes){
							 
								proDespecaVariaveis[chaves] =  '<tr class="ColumnTDRemove" align="center">'
															+ '<td>'
															+ nomes['lan_descricao']
															+ '</td>'
															+ '<td>'
															+ nomes['lan_valor']
															+ '</td>'
														+ '</tr>';
								 
								 DespecaVariTexto = 'TOTAL PROJ. DESP. VARIÁVEIS';
								 proDespecaVariTotal = nomes['totaldespesas'];
							 });
						 proDespecaVariaveis.push('<tr class="ColumnTDRemove" align="center" '
									+'style="background-color: #8B8989; color: #f5f5f0;">'
									+ '<td>'
									+ DespecaVariTexto
									+ '</td>'
									+ '<td>'
									+ proDespecaVariTotal
									+ '</td>'
								+ '</tr>');
						 $('#despesasFixas').append(proDespecaFixa);
						 $('#despesasVariaveis').append(proDespecaVariaveis);
						 $('#totalSub').text(obj.totalSub);
						 $('#totalSoma').text(obj.totalSoma);
						// console.log(obj.projecao['totalArrProj']);
						addTabelas(obj);
						
					}
				},
				error : function(jqXHR, textStatus,
						errorThrown) {
					console.log(errorThrown + " <==> "
							+ textStatus);
				}
			});
		}
	});

});
// pega os meses do determinado ano
function buscarAno() {
	// console.log('buscar ano');
	$("#busca_ano").click(function() {

		$('#busca_mes').find('option').remove();
		$('#busca_mes').append($('<option>', {
			value : '',
			text : 'Selecione um Mes'
		}));
		var ano = $('#busca_ano').find(':selected').val();

		if (ano) {
			$.ajax({
				url : "projecaomensal.php",
				type : 'POST',
				data : {
					acao : "buscarMes",
					ano : ano
				},
				success : function(mes) {
					if (mes) {
						obj = JSON.parse(mes);
						var mesesNome = meses();
						$.each(obj, function(key, meses) {
							$('#busca_mes').append($('<option>', {
								value : meses['lan_mes'],
								text : mesesNome[key]
							}));
						});

					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(errorThrown + " <==> " + textStatus);
				}
			});
		}

	})

}
function meses() {
	var mes = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
			'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ];
	return mes
}
function addTabelas(obj) {
	tabelSaldoInicial = '<th class="ColumnTDRemove">'
			+ obj.projecao['fpmInicial'] + '</th>'
			+ '<th class="ColumnTDRemove">' + obj.projecao['icmsInicial']
			+ '</th>' + '<th class="ColumnTDRemove">'
			+ obj.projecao['ipvaInicial'] + '</th>'
			+ '<th class="ColumnTDRemove">' + obj.projecao['tmInicial']
			+ '</th>' + '<th class="ColumnTDRemove">'
			+ obj.projecao['totalInicial'] + '</th>';

	tabelprojecao = '<td class="ColumnTDRemove">' + obj.projecao['fpm']
			+ '</td>' + '<td class="ColumnTDRemove">' + obj.projecao['icms']
			+ '</td>' + '<td class="ColumnTDRemove">' + obj.projecao['ipva']
			+ '</td>' + '<td class="ColumnTDRemove">' + obj.projecao['tm']
			+ '</td>' + '<td class="ColumnTDRemove">'
			+ obj.projecao['totalArrProj'] + '</td>';
	tabelEducacao = '<td class="ColumnTDRemove">' + obj.projecao['fpmEducacao']
			+ '</td>' + '<td class="ColumnTDRemove">'
			+ obj.projecao['icmsEducacao'] + '</td>'
			+ '<td class="ColumnTDRemove">' + obj.projecao['ipvaEducacao']
			+ '</td>' + '<td class="ColumnTDRemove">'
			+ obj.projecao['tmEducacao'] + '</td>'
			+ '<td class="ColumnTDRemove">' + obj.projecao['totalEducacao']
			+ '</td>';
	tabelSaude = '<td class="ColumnTDRemove">' + obj.projecao['fpmSaude']
			+ '</td>' + '<td class="ColumnTDRemove">'
			+ obj.projecao['icmsSaude'] + '</td>'
			+ '<td class="ColumnTDRemove">' + obj.projecao['ipvaSaude']
			+ '</td>' + '<td class="ColumnTDRemove">' + obj.projecao['tmSaude']
			+ '</td>' + '<td class="ColumnTDRemove">'
			+ obj.projecao['totalSaude'] + '</td>';
	tabelTotalCal = '<td class="ColumnTDRemove">'
			+ obj.projecao['fpmTotaloCal'] + '</td>'
			+ '<td class="ColumnTDRemove">' + obj.projecao['icmsTotaloCal']
			+ '</td>' + '<td class="ColumnTDRemove">'
			+ obj.projecao['ipvaTotaloCal'] + '</td>'
			+ '<td class="ColumnTDRemove">' + obj.projecao['tmTotaloCal']
			+ '</td>' + '<td class="ColumnTDRemove">'
			+ obj.projecao['totalTotaloCal'] + '</td>';
	$('#arrecatacaoTabela').append(tabelprojecao);
	$('#saldosInicial').append(tabelSaldoInicial);
	$('#educacaoCalculo').append(tabelEducacao);
	$('#saudeCalculo').append(tabelSaude);
	$('#totalCalculo').append(tabelTotalCal);

}
