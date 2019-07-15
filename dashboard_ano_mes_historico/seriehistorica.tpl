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
					<div class="col-sm">
						<div class="card shadow mb-4">
							<div class="card-body">
								<label>Tipo Lançamento</label> <select class="form-control"
									id="busca_tipo">
									<option value="">Selecione um Tipo</option> {foreach $tipos as
									$tipo}
									<option value="{$tipo.tla_id}">{$tipo.tla_descricao}</option>
									{/foreach}
								</select>
							</div>
						</div>
					</div>
					<div class="col-sm">
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
					<div class="col-sm">
						<div class="card shadow mb-4">
							<div class="card-body">
								<label>Mes</label> <select class="form-control" id="busca_mes">
									<option value="">Selecione um Mes</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div id="hideCarregando">
					<div class="spinner-border" role="status">
						<span class="sr-only">Loading...</span> <label><h3>
					</div>
					Carregando ......
					</h3>
					</label>
				</div>
				<div id="hide">

					<div class="row">
						<div class="col-12">
							<div class="card shadow">
								<a href="#" id="hideGrafico1" data-toggle="tooltip"
									data-placement="right"
									title="Clique para exibir/ocultar o gráfico"
									class="glyphicon glyphicon-menu-right">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary" id="anoAnterior">-</h6>
									</div>
								</a>
								<div id="grafico1" class="card-body">
									<div class="chart-area">
										<canvas id="myAreaChart"></canvas>
									</div>
								</div>

							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<div class="card shadow">
								<a href="#" id="hideGrafico2" data-toggle="tooltip"
									data-placement="right"
									title="Clique para exibir/ocultar o gráfico"
									class="glyphicon glyphicon-menu-right">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary "
											id="anoSelecionado">-</h6>
									</div>
								</a>
								<div id="grafico2" class="card-body">
									<div class="chart-area">
										<canvas id="myAreaChart2"></canvas>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-6 mb-4">
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<h6 class="m-0 font-weight-bold text-primary">Indice</h6>
								</div>
								<div class="card-body">
									<div class="text-center">
										<table class="table table-bordered" id="tabelaIndice"
											boder="2">
											<tr align="center"
												style="background-color: #8B8989; color: #f5f5f0;">
												<th>Mês</th>
												<th id='anoAntText'>Ano Anterior</th>
												<th id='anoSelec'>Ano Selecionado</th>
												<th>Diferença</th>
												<th></th>
											</tr>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<div class="card shadow mb-4">
								<div class="card-header py-3">
									<h6 class="m-0 font-weight-bold text-primary"></h6>
								</div>
								<div class="card shadow">
									<div class="card-body">
										<div class="text-center">
											<table class="table table-bordered" boder="2">
												<tr align="center"
													style="background-color: #8B8989; color: #f5f5f0;">
													<th>Série Histórica</th>
												</tr>
											</table>
											<table class="table table-bordered" id="tabelHistfpm"
												boder="2">
												<tr align="center"
													style="background-color: #8B8989; color: #f5f5f0;">
													<th>Ano</th>
													<th>Mês</th>
													<th>Repasse</th>
													<th>%</th>
												</tr>
											</table>
										</div>
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

<script src="../view/js/seriehistorica_tela.js"></script>
<!-- Custom fonts for this template-->


