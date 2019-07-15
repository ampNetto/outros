<link href="../view/css/sb-admin-2.css" rel="stylesheet">

<div id="wrapper">
	<!-- Content Wrapper -->
	<div id="content-wrapper" class="d-flex flex-column">

		<!-- Main Content -->
		<div id="content">
			<div id="hideCarregando">
				<div class="spinner-border" role="status">
					<span class="sr-only">Loading...</span> <label><h3>
							
				</div>
				Carregando ......</h3></label>
			</div>
			<div id="hidefull">
				<!-- Begin Page Content -->
				<div class="container-fluid">

					<!-- Content Row -->


					<div class="row">
						<div class="col-12">
							<div class="card shadow mb-4">
								<a href="#" id="hideFPM" data-toggle="tooltip"
									data-placement="right"
									title="Clique para exibir/ocultar o gráfico"
									class="glyphicon glyphicon-menu-right">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary">FPM</h6>
									</div>
								</a>

								<div class="card shadow" id="projecaoFPM">
									<div class="card-body">
										<div class="text-center">
											<table id="tabelaAnualFPM" class="table table-bordered"
												boder="2">
												<tr align="center" id="anoFPM">
												</tr>
											</table>
											<table id="tabelaAnualTotalFPM" class="table table-bordered"
												boder="2">
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
								<a href="#" id="hideICMS" data-toggle="tooltip"
									data-placement="right"
									title="Clique para exibir/ocultar o gráfico"
									class="glyphicon glyphicon-menu-right">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary">ICMS</h6>
									</div>
								</a>
								<div class="card shadow" id="projecaoICMS">
									<div class="card-body">
										<div class="text-center">
											<table id="tabelaAnualICMS" class="table table-bordered"
												boder="2">
												<tr align="center" id="anoICMS">
												</tr>
											</table>
											<table id="tabelaAnualTotalICMS" class="table table-bordered"
												boder="2">
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
								<a href="#" id="hideIPVA" data-toggle="tooltip"
									data-placement="right"
									title="Clique para exibir/ocultar o gráfico"
									class="glyphicon glyphicon-menu-right">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary">IPVA</h6>
									</div>
								</a>
								<div class="card shadow" id="projecaoIPVA">
									<div class="card-body">
										<div class="text-center">
											<table id="tabelaAnualIPVA" class="table table-bordered"
												boder="2">
												<tr align="center" id="anoIPVA">

												</tr>
											</table>
											<table id="tabelaAnualTotalIPVA" class="table table-bordered"
												boder="2">
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
								<a href="#" id="hideTM" data-toggle="tooltip"
									data-placement="right"
									title="Clique para exibir/ocultar o gráfico"
									class="glyphicon glyphicon-menu-right">
									<div class="card-header py-3">
										<h6 class="m-0 font-weight-bold text-primary">Tributos
											Municipais</h6>
									</div>
								</a>
								<div class="card shadow" id="projecaoTM">
									<div class="card-body">
										<div class="text-center">
											<table id="tabelaAnualTM" class="table table-bordered"
												boder="2">
												<tr align="center" id="anoTM">

												</tr>
											</table>
											<table id="tabelaAnualTotalTM" class="table table-bordered"
												boder="2">
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- /.container-fluid -->
			</div>
			<!-- End of Content Wrapper -->
		</div>


		<script src="../view/js/projecaoanual_tela.js"></script>
		<!-- Custom fonts for this template-->