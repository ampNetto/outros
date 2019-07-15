$(function() {
	
	$('#hide').hide();
	$('#hideCarregando').hide();
	buscarAno();
	$("#busca_tipo").click(function() {
		$("#busca_mes").val('');
		$("#busca_ano").val('');
		$('#hide').hide();
	});
	$("#hideGrafico1").click(function() {
//		console.log($("#grafico1").find('hidden'));
		if($("#grafico1").is(':visible')){
			$("#grafico1").hide();
		}else{
			$("#grafico1").show();
		}
	});
	$("#hideGrafico2").click(function() {
		if($("#grafico2").is(':visible')){
			$("#grafico2").hide();
		}else{
			$("#grafico2").show();
		}
	});
	$("#busca_mes").click(function() {
		$('#hideCarregando').show();
		var tipo = $('#busca_tipo').find(':selected').val();
		var ano = $('#busca_ano').find(':selected').val();
		var mes = $('#busca_mes').find(':selected').val();
		var valor = [], valores = [];
		if (!ano || !tipo) {
			var msgAlertaTipo = tipo?' ':'Selecione um tipo de lançamento !\n'
			var msgAlertaAno = ano?' ':'Selecione um Ano !'
			alert(msgAlertaAno +'\n'+ msgAlertaTipo);
		} else {
			$.ajax({
				url : "seriehistorica.php",
				type : 'POST',
				data : {
					acao : "graficos",
					ano : ano,
					mes : mes,
					tipo: tipo
				},
				success : function(resul) {
//					 console.log(resul);
					obj = JSON.parse(resul);
					$('.ColumnTDRemove').remove();
					var mes = meses();
					if (obj.msg) {
						alert(obj.msg);
					}else{
						$('#hideCarregando').hide();
						$('#hide').show();
					 obj = JSON.parse(resul);
//					 console.log(obj);
					 $.each(obj.seriHist,function(chave,nome) {
//						 console.log(nome);
						 tabelHistfpm = '<tr class="ColumnTDRemove" align="center">'
												+ '<td>'
												+ nome['lan_ano']
												+ '</td>'
												+ '<td>'
												+ mes[nome['lan_mes']-1]
												+ '</td>'
												+ '<td>'
												+ nome['repase']
												+ '</td>'
												+ '<td>'
												+ nome['mensal']
												+ '</td>'
											+ '</tr>';
						 $('#tabelHistfpm').append(tabelHistfpm);
						
						 if(nome['lan_ano']== ano){
								valores.push(Number(nome['lan_valor']));
							}else{
								valor.push(Number(nome['lan_valor']));
							}
						});
//					 console.log(obj.indici);
					 $.each(obj.indici,function(key,name) {
						 var icone;
						 if(name.valor > 0){
							 icone = '<i class="fa fa-level-up" aria-hidden="true"></i>'
						 }else{
							 icone = '<i class="fa fa-level-down" aria-hidden="true"></i>'
						 }
						 if(name.valor == 0){
							 icone = '';
						 }
						 tabelIndici = '<tr class="ColumnTDRemove" align="center">'
								+ '<td>'
								+ mes[name.mes]
								+ '</td>'
								+ '<td>'
								+ name.valorSelec 
								+ '</td>'
								+ '<td>'
								+ name.valorAnterior
								+ '</td>'
								+ '<td>'
								+ name.valor
								+ '</td>'
								+ '<td>'
								+ icone
								+ '</td>'
							+ '</tr>';
						 $('#tabelaIndice').append(tabelIndici);
						 $('#anoAntText').text(name.anoAnteriorTexto);
						 $('#anoSelec').text(name.anoTexto);
					 });
					 var anoAnterios = ano-1
					 $('#anoAnterior').text('Gráfico -'+anoAnterios);
					 $('#anoSelecionado').text('Gráfico -'+ano);

						graficoLinha1(valor);
						graficoLinha2(valores);
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(errorThrown + " <==> " + textStatus);
				}
			});
		}
	});

});
// pega os meses do determinado ano
function buscarAno() {
//	console.log('buscar ano');
	$("#busca_ano").click(function() {

		$('#busca_mes').find('option').remove();
		$('#busca_mes').append($('<option>', {
			value : '',
			text : 'Selecione um Mes'
		}));
		var ano = $('#busca_ano').find(':selected').val();

		if (ano) {
			$.ajax({
				url : "seriehistorica.php",
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

// Grafico Linera IPCA (acumulado 12 meses)
function graficoLinha1(graf1,) {
//	console.log(graf1);


			// Set new default font family and font color to mimic Bootstrap's
			// default styling
			Chart.defaults.global.defaultFontFamily = 'Nunito',
			'-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#858796';

	function number_format(number, decimals, dec_point, thousands_sep) {
		// * example: number_format(1234.56, 2, ',', ' ');
		// * return: '1 234,56'
		number = (number + '').replace(',', '').replace(' ', '');

		var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0
				: Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ','
				: thousands_sep, dec = (typeof dec_point === 'undefined') ? '.'
				: dec_point, s = '', toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
		// Fix for IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	}

	// Area Chart Example
	var ctx = document.getElementById("myAreaChart");
	var myLineChart = new Chart(
			ctx,
			{
				type : 'line',
				data : {
					labels : [ "Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul",
							"Ago", "Set", "Out", "Nov", "Dez" ],
					datasets : [ {
						label : "Valor",
						lineTension : 0.3,
						backgroundColor : "rgba(78, 115, 223, 0.05)",
						borderColor : "rgba(78, 115, 223, 1)",
						pointRadius : 3,
						pointBackgroundColor : "rgba(78, 115, 223, 1)",
						pointBorderColor : "rgba(78, 115, 223, 1)",
						pointHoverRadius : 3,
						pointHoverBackgroundColor : "rgba(78, 115, 223, 1)",
						pointHoverBorderColor : "rgba(78, 115, 223, 1)",
						pointHitRadius : 10,
						pointBorderWidth : 2,
						// insere no grafico a array
//						data : [ 0, 10000, 5000, 15000, 10000, 20000, 15000,
//								25000, 20000, 30000, 25000, 40000 ]
					 data : graf1,
					} ],
				},
				options : {
					maintainAspectRatio : false,
					layout : {
						padding : {
							left : 10,
							right : 25,
							top : 25,
							bottom : 0
						}
					},
					scales : {
						xAxes : [ {
							time : {
								unit : 'date'
							},
							gridLines : {
								display : false,
								drawBorder : false
							},
							ticks : {
								maxTicksLimit : 7
							}
						} ],
						yAxes : [ {
							ticks : {
								maxTicksLimit : 5,
								padding : 10,
								// Include a dollar sign in the ticks
								callback : function(value, index, values) {
									// retorna o valor no bonto das linhas
									return '$' + number_format(value);
								}
							},
							gridLines : {
								color : "rgb(234, 236, 244)",
								zeroLineColor : "rgb(234, 236, 244)",
								drawBorder : false,
								borderDash : [ 2 ],
								zeroLineBorderDash : [ 2 ]
							}
						} ],
					},
					legend : {
						// legenta superior do grafico
						display : false
					},
					tooltips : {
						backgroundColor : "rgb(255,255,255)",
						bodyFontColor : "#858796",
						titleMarginBottom : 10,
						titleFontColor : '#6e707e',
						titleFontSize : 14,
						borderColor : '#dddfeb',
						borderWidth : 1,
						xPadding : 15,
						yPadding : 15,
						displayColors : false,
						intersect : false,
						mode : 'index',
						caretPadding : 15,
						callbacks : {
							label : function(tooltipItem, chart) {
								var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label
										|| '';
								// retorna para a tela o balao com o mes e o
								// valor
								return datasetLabel + ': $'
										+ tooltipItem.yLabel;
							}
						}
					}
				}
			});
}
function graficoLinha2(graf2) {
	
			// Set new default font family and font color to mimic Bootstrap's
			// default styling
			Chart.defaults.global.defaultFontFamily = 'Nunito',
			'-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#858796';

	function number_format(number, decimals, dec_point, thousands_sep) {
		// * example: number_format(1234.56, 2, ',', ' ');
		// * return: '1 234,56'
		number = (number + '').replace(',', '').replace(' ', '');

		var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0
				: Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ','
				: thousands_sep, dec = (typeof dec_point === 'undefined') ? '.'
				: dec_point, s = '', toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
		// Fix for IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	}

	// Area Chart Example
	var ctx = document.getElementById("myAreaChart2");
	var myLineChart = new Chart(
			ctx,
			{
				type : 'line',
				data : {
					labels : [ "Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul",
							"Ago", "Set", "Out", "Nov", "Dez" ],
					datasets : [ {
						label : "Valor",
						lineTension : 0.3,
						backgroundColor : "rgba(78, 115, 223, 0.05)",
						borderColor : "rgba(78, 115, 223, 1)",
						pointRadius : 3,
						pointBackgroundColor : "rgba(78, 115, 223, 1)",
						pointBorderColor : "rgba(78, 115, 223, 1)",
						pointHoverRadius : 3,
						pointHoverBackgroundColor : "rgba(78, 115, 223, 1)",
						pointHoverBorderColor : "rgba(78, 115, 223, 1)",
						pointHitRadius : 10,
						pointBorderWidth : 2,
						// insere no grafico a array
//						data : [ 0, 100000, 500000, 1500, 1000000, 200, 15000,
//								25000, 200, 30000, 25000, 400 ]
					 data : graf2,
					} ],
				},
				options : {
					maintainAspectRatio : false,
					layout : {
						padding : {
							left : 10,
							right : 25,
							top : 25,
							bottom : 0
						}
					},
					scales : {
						xAxes : [ {
							time : {
								unit : 'date'
							},
							gridLines : {
								display : false,
								drawBorder : false
							},
							ticks : {
								maxTicksLimit : 7
							}
						} ],
						yAxes : [ {
							ticks : {
								maxTicksLimit : 5,
								padding : 10,
								// Include a dollar sign in the ticks
								callback : function(value, index, values) {
									// retorna o valor no bonto das linhas
									return '$' + number_format(value);
								}
							},
							gridLines : {
								color : "rgb(234, 236, 244)",
								zeroLineColor : "rgb(234, 236, 244)",
								drawBorder : false,
								borderDash : [ 2 ],
								zeroLineBorderDash : [ 2 ]
							}
						} ],
					},
					legend : {
						// legenta superior do grafico
						display : false
					},
					tooltips : {
						backgroundColor : "rgb(255,255,255)",
						bodyFontColor : "#858796",
						titleMarginBottom : 10,
						titleFontColor : '#6e707e',
						titleFontSize : 14,
						borderColor : '#dddfeb',
						borderWidth : 1,
						xPadding : 15,
						yPadding : 15,
						displayColors : false,
						intersect : false,
						mode : 'index',
						caretPadding : 15,
						callbacks : {
							label : function(tooltipItem, chart) {
								var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label
										|| '';
								// retorna para a tela o balao com o mes e o
								// valor
								return datasetLabel + ': $'
										+ tooltipItem.yLabel;
							}
						}
					}
				}
			});
}
function meses() {
	var mes = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
			'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ];
	return mes
}
