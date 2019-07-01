$(function() {
	$('#hide').hide();
	buscarAno();
	$("#busca_mes").click(function() {
		var ano = $('#busca_ano').find(':selected').val();
		var mes = $('#busca_mes').find(':selected').val();
		if (!ano) {
			alert('selecione um ano');
		} else {
			$.ajax({
				url : "dashboard.php",
				type : 'POST',
				data : {
					acao : "graficos",
					ano : ano,
					mes : mes
				},
				success : function(resul) {
					// console.log(resul);
					if (resul) {
						$('#hide').show();
						var colsMaioresReceita = '', colsMaioresDespesas = '';
						var res = resul
								.replace("[", "");
						var stringExemplo = res
								.replace("]", "");
						var resultado = stringExemplo
								.split(",");
						obj = JSON.parse(resul);
						// console.log(obj.maioresReceita);
						$('#receitabrut').text('$ '+ obj.sqlCalculos[0].receitabruta);
						$('#receitaliquita').text('$ '+ obj.sqlCalculos[0].receitaliquita);
						$('#receitatotal1').text('$ '+ obj.sqlCalculos[0].receitatotal1);
						$('#receitatotal2').text('$ '+ obj.sqlCalculos[0].receitatotal2);
						$('#despesaacumulo').text('$ '+ obj.sqlCalculos[0].descreclivreacum);
						$('#despesames').text('$ '+ obj.sqlCalculos[0].descreclivremes);
						$('.ColumnTDRemove').remove();
						$.each(obj.maioresReceita,function(chave,nome) {
							colsMaioresReceita += '<tr class="ColumnTDRemove">'
									+ '<td>'
									+ nome['tla_descricao']
									+ '</td>'
									+ '<td>'
									+ nome['posicao']
									+ '</td>'
									+ '<td>'
									+ nome['valor']
									+ '</td>'
									+ '<td>'
									+ nome['acumulo']
									+ '</td>'
									+ '</tr>';
						});
						$.each(obj.maioresDespesas,function(chave,nome) {
							colsMaioresDespesas += '<tr class="ColumnTDRemove">'
									+ '<td>'
									+ nome['tla_descricao']
									+ '</td>'
									+ '<td>'
									+ nome['posicao']
									+ '</td>'
									+ '<td>'
									+ nome['valor']
									+ '</td>'
									+ '<td>'
									+ nome['acumulo']
									+ '</td>'
									+ '</tr>';
						});
						$('#maiorReceita').append(colsMaioresReceita);
						$('#maiorDespesas').append(colsMaioresDespesas);
						// console.log(obj.maioresDespesas);
						grafico1(obj.maioresReceita);
						grafico2(obj.maioresDespesas);
						grafico3(obj.ReceitaDespesas);
						graficoCirculo(obj.maioresDespesas);
						graficoLinha(obj.ipca);
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
	$("#busca_ano").click(function() {
		$('#busca_mes').find('option').remove();
		$('#busca_mes').append($('<option>', {
			value : '',
			text : 'Selecione um Mes'
		}));
		var ano = $('#busca_ano').find(':selected').val();

		if (ano) {
			$.ajax({
				url : "dashboard.php",
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
							$.each(mesesNome, function(chave, nome) {
								if (chave == key) {
									$('#busca_mes').append($('<option>', {
										value : meses['lan_mes'],
										text : nome
									}));
								}
							});
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
//grafico 1 Por receitas
function grafico1(graf1) {
//	cria uma array
	var dataPoints1 = [];
//	dados retorna tudo com string quebrar a array e converter o valor float
	$.each(graf1, function(chave, nome) {
//		insere uma nova array com a chave label e y
		dataPoints1[chave] = {
			label : nome['tla_descricao'],
//			converte string em float
			y : parseFloat(nome['valor'])
		};
	});
	var options1 = {
		animationEnabled : true,
		axisY : {
			suffix : "R$",
			includeZero : false
		},
		axisX : {
		},
		data : [ {
			type : "column",
//			mascara para mostrar o valor
			yValueFormatString : "#,##0.0#",
//			array com o valor e a label para mostrar
			dataPoints : dataPoints1
		} ]
	};
//	insere o grafico na tela pelo Canvas 
	$("#chart_div1").CanvasJSChart(options1);

}
//grafico 2 Por Despesas
function grafico2(graf2) {
//	cria uma array
	var dataPoints2 = [];
//	dados retorna tudo com string quebrar a array e converter o valor float
	$.each(graf2, function(chaves, nomes) {
//		insere uma nova array com a chave label e y
		dataPoints2[chaves] = {
			label : nomes['tla_descricao'],
//			converte string em float
			y : parseFloat(nomes['valor'])
		};
	});
	var options2 = {
		animationEnabled : true,
		axisY : {
			suffix : "R$",
			includeZero : false
		},
		axisX : {
		},
		data : [ {
			type : "column",
//			mascara para mostrar o valor
			yValueFormatString : "#,##0.0#",
//			array com o valor e a label para mostrar
			dataPoints : dataPoints2
		} ]
	};
//	insere o grafico na tela pelo Canvas 
	$("#chart_div2").CanvasJSChart(options2);

}
//grafico Receita X Despesas
function grafico3(graf3) {

	var options3 = {
		animationEnabled : true,
		axisY : {
			suffix : "R$",
			includeZero : false
		},
		axisX : {
		},
		data : [ {
			type : "column",
			yValueFormatString : "#,##0.0#",
			dataPoints : [ {
				label : "receitas",
				y : parseFloat(graf3[0]['receitas'])
			}, {
				label : "despesas",
				y : parseFloat(graf3[0]['despesas'])
			},

			]
		} ]
	};
//	insere o grafico na tela pelo Canvas 
	$("#chart_div3").CanvasJSChart(options3);

}
// Grafico circular por Despesa(acumulada)
function graficoCirculo(graf4) {
	var legenta = '';
//	cria uma array
	var dataNome = [], dataValor = [], tuto = [];
//	cria array com text para as cor
	var legentaCor = [ 'text-primary', 'text-success', 'text-info',
			'text-warning', 'tla_descricao', ];
	$(".fa-circle, #nomeLabel").remove();
//	quebra a array que vem da consulta e insere nas novas array
	$.each(graf4, function(chave, nome) {
//		nome que esta no sql
		dataNome[chave] = nome['tla_descricao'];
//		valor convertendo em float
		dataValor[chave] = parseFloat(nome['acumulo']);
//		legenta para saber de qual e qual valor com a cor
		legenta = '<span class="mr-2"><h4>' + '<i class="fa fa-circle '
				+ legentaCor[chave] + '" ></i>' + '<laber id="nomeLabel"> '
				+ nome['tla_descricao'] + ' </laber></h4>';
//		adiciona na tela a legenta
		$("#legenta").append(legenta);
	});

			// Set new default font family and font color to mimic Bootstrap's
			// default styling
			Chart.defaults.global.defaultFontFamily = 'Nunito',
			'-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#858796';

	// Pie Chart Example
	var ctx = document.getElementById("myPieChart");
	var myPieChart = new Chart(ctx, {
		type : 'doughnut',
		data : {
//			array com o nomes
			labels : dataNome,
			datasets : [ {
//				array com os valores para o grafico em circulo
				data : dataValor,
//				cores do cicrulo, tem que esta na mesma ortem da legentaCor
				backgroundColor : [ '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e',
						'#858796' ],
				hoverBackgroundColor : [ '#2e59d9', '#17a673', '#2c9faf',
						'#f6c23e', '#858796' ],
				hoverBorderColor : "rgba(234, 236, 244, 1)",
			} ],
		},
		options : {
			maintainAspectRatio : false,
			tooltips : {
				backgroundColor : "rgb(255,255,255)",
				bodyFontColor : "#858796",
				borderColor : '#dddfeb',
				borderWidth : 1,
				xPadding : 15,
				yPadding : 15,
				displayColors : false,
				caretPadding : 10,
			},
			legend : {
				display : false
			},
			cutoutPercentage : 80,
		},
	});
}

// Grafico Linera IPCA (acumulado 12 meses)
function graficoLinha(graf5) {
//	cria a arry
	var valor = [];
//	quebra e converte a array em float
	$.each(graf5, function(chave, nome) {
		valor[chave] = Number(nome['lan_valor']);
	});

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
//						insere no grafico a array 
						data : valor,
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
//									retorna o valor no bonto das linhas
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
//						legenta superior do grafico
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
//								retorna para a tela o balao com o mes e o valor
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
