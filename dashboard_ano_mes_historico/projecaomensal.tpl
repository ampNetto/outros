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
													<th></th>
													<th>FPM</th>
													<th>ICMS</th>
													<th>IPVA</th>
													<th>T. Mun.</th>
													<th></th>
												</tr>
												<tr id="saldosInicial" align="center"
													style="background-color: #8B8989; color: #f5f5f0;">
													<th>Saldo Inicial (A)</th>

												</tr>
												<tr align="center" id="arrecatacaoTabela">
													<td>Arrecadação projetada</td>

												</tr>
												<tr align="center">
													<td><b>Educações</td>
												</tr>
												<tr id="educacaoCalculo" align="center">
													<td>Educação</td>
												</tr>
												<tr id="saudeCalculo" align="center">
													<td>Saude</td>
												</tr>
												<tr id="totalCalculo" align="center">
													<td><b>Todal Proj. Arrecadação</td>
												</tr>
											</table>
										</div>
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
											<table id="despesasFixas" class="table table-bordered"
												id="proDespecaFixa" boder="2">
												<tr align="center"
													style="background-color: #8B8989; color: #f5f5f0;">
													<th>PROJEÇÃO DE DESPESAS FIXAS- Recursos livres</th>
													<th></th>
												</tr>
											</table>
										</div>
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
											<table class="table table-bordered" id="despesasVariaveis"
												boder="2">
												<tr align="center"
													style="background-color: #8B8989; color: #f5f5f0;">
													<th>PROJEÇÃO DE DESPESAS VARIÀVEIS- Recursos livres</th>
													<th></th>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="card-body">
							<div class="chart-area">
								<table class="table table-bordered" boder="2">
									<tr align="center"
										style="background-color: #2F4F4F; color: #f5f5f0;">
										<th>SALDO PROJETADO LÍQUIDO DO MÊS (B)</th>
										<th id="totalSub">Valor</th>
									</tr>
									<tr align="center"
										style="background-color: #0000CD; color: #f5f5f0;">
										<th>SALDO PROJETADO LÍQUIDO TOTAL (A+B)</th>
										<th id="totalSoma">Valor</th>
									</tr>
								</table>
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

<script src="../view/js/projecaomensal_tela.js"></script>
<!-- Custom fonts for this template-->


