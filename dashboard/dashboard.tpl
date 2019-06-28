<link href="../view/css/sb-admin-2.css" rel="stylesheet">


<div id="wrapper">
	<!-- Content Wrapper -->
	<div id="content-wrapper" class="d-flex flex-column">

		<!-- Main Content -->
		<div id="content">

			<!-- Begin Page Content -->
			<div class="container-fluid">

				<!-- Content Row -->
				<div class="row">
					<div class="col-lg-6 mb-4">
						<div class="card shadow mb-4">
							<div class="card-body">
								<label>Ano</label> <select class="form-control" id="busca_ano">
									<option value="">Selecione um ano</option> {foreach $anos as
									$ano}
									<option value="{$ano.lan_ano}">{$ano.lan_ano}</option>
									{/foreach}
								</select>
							</div>
						</div>
					</div>
					<div class="col-lg-6 mb-4">
						<div class="card shadow mb-4">
							<div class="card-body">
								<label>Mes</label> <select class="form-control" id="busca_mes">
									<option value="">Selecione um Mes</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div id="hide">
					<div class="row">

						<!-- Earnings (Monthly) Card Example -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div
												class="text-xs font-weight-bold text-primary text-uppercase mb-1">Receita
												Mensal</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">
												<table class="table table-bordered" boder="2">
													<tr align="center">
														<td>Bruta</td>
														<td id="receitabrut"></td>
													</tr>
													<tr align="center">
														<td>Líquida</td>
														<td id="receitaliquita"></td>
													</tr>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Earnings (Monthly) Card Example -->
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-success shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div
												class="text-xs font-weight-bold text-success text-uppercase mb-1">Receita
												Total (acumulado)</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">
												<table class="table table-bordered" boder="2">
													<tr align="center">
														<td id="receitatotal1"></td>
													</tr>
													<tr align="center">
														<td id="receitatotal2"></td>
													</tr>
												</table>
											</div>
										</div>
										<div class="col-auto">
											<i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-info shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div
												class="text-xs font-weight-bold text-primary text-uppercase mb-1">Despesa
												Total com recursos livres</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">
												<table class="table table-bordered" boder="2">
													<tr align="center">
														<td>Acumulado</td>
														<td id="despesaacumulo"></td>
													</tr>
													<tr align="center">
														<td>Mês</td>
														<td id="despesames"></td>
													</tr>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-md-6 mb-4">
							<div class="card border-left-warning shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div
												class="text-xs font-weight-bold text-primary text-uppercase mb-1">%
												de comprometimento da receita</div>
											<div class="h5 mb-0 font-weight-bold text-gray-800">
												<table class="table table-bordered" boder="2">
													<tr align="center">
														<td id="despesa1"></td>
													</tr>
													<tr align="center">
														<td id="despesa2"></td>
													</tr>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-6 mb-4">
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<h6 class="m-0 font-weight-bold text-primary">5 Maiores
										Receitas - Recursos Livres</h6>
								</div>
								<div class="card-body">
									<table class="table" id="maiorReceita" align="center">
										<tr>
											<th>Origem</th>
											<th>Posição</th>
											<th>Entrada Mensal</th>
											<th>Acumulado no ano</th>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<div class="col-lg-6 mb-4">
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<h6 class="m-0 font-weight-bold text-primary">5 Maiores
										Despesas - Recursos Livres</h6>
								</div>
								<div class="card-body">
									<table class="table" id="maiorDespesas" align="center">
										<tr>
											<th>Origem</th>
											<th>Posição</th>
											<th>Saída Mensal</th>
											<th>Acumulado no ano</th>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
					<!-- Content Row -->

					
					<!-- 					observação -->
					<div class="row">
						<!-- 					div para o grafico 1 -->
						<div class="col-lg-6 mb-4">
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<h6 class="m-0 font-weight-bold text-primary">Por Receita</h6>
								</div>
								<div class="card-body">
									<div class="text-center">
										<!-- 									grafico 1 -->
										<div id="chart_div1" style="height: 300px; width: 100%;"></div>

									</div>
								</div>
							</div>
						</div>
						<!-- 					fim div para o grafico 1 -->
						<!-- 					div para o grafico 2 -->
						<div class="col-lg-6 mb-4">
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<h6 class="m-0 font-weight-bold text-primary">Por Despesas</h6>
								</div>
								<div class="card-body">
									<div class="text-center">
										<!-- 									grafico 2 -->
										<div id="chart_div2" style="height: 300px; width: 100%;"></div>

									</div>
								</div>
							</div>
						</div>
						<!-- 					fim div para o grafico 2 -->
					</div>

					<div class="row">
						<!-- 					div para o grafico 3 -->
						<div class="col-lg-6 mb-4">
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<h6 class="m-0 font-weight-bold text-primary">Receita X
										Despesas</h6>
								</div>
								<div class="card-body">
									<div class="text-center">
										<!-- 									grafico 3 -->
										<div id="chart_div3" style="height: 300px; width: 100%;"></div>


									</div>
								</div>
							</div>
						</div>
						<!-- Pie Chart -->
						<div class="col-lg-6 mb-4"">
							<div class="card shadow mb-4">
								<!-- Card Header - Dropdown -->
								<div
									class="card-header py-3">
									<h6 class="m-0 font-weight-bold text-primary">por Despesa
										(acumulado)</h6>
								</div>
								<!-- Card Body -->
								<div class="card-body">
									<div class="chart-pie pt-4 pb-2">
										<canvas id="myPieChart"></canvas>
									</div>
									<div class="mt-4 text-center small" id='legenta' style="margin: 5px;">
									</div>
								</div>
							</div>
						</div>
						
					</div>
					<div class="row">

						<!-- Area Chart -->
						<div class="col-lg-6 mb-4"">
							<div class="card shadow mb-4">
								<!-- Card Header - Dropdown -->
								<div
									class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
									<h6 class="m-0 font-weight-bold text-primary">IPCA
										(acumulado 12 meses)</h6>
								</div>
								<!-- Card Body -->
								<div class="card-body">
									<div class="chart-area">
										<canvas id="myAreaChart"></canvas>
									</div>
								</div>
							</div>
						</div>
						<!-- 				fim div para o grafico 3 -->
						<div class="col-lg-6 mb-4">
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<h6 class="m-0 font-weight-bold text-primary">Observação</h6>
								</div>
								<div class="card-body">
									<div class="text-center">
										<p>O saldo final dessa Dashboard
											expressa a simples relação entre o saldo arrecadado e as
											despesas do mês não considerando, portanto, o saldo inicial em
											caixa.
										</p>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			<!-- /.container-fluid -->

		</div>
		<!-- End of Main Content -->

	</div>
	<!-- End of Content Wrapper -->
</div>
<!-- Page level plugins -->
<script src="../view/js/Chart.min.js"></script>

<!-- Page level custom scripts -->
<script src="../view/js/jquery.canvasjs.min.js"></script>

<script src="../view/js/dashboard_tela.js"></script>
<!-- Custom fonts for this template-->


