angular.module("listaTelefonica").controller("listaTelefonicaController", function($scope, contatosAPI, operadorasAPI, serialGenerator){
	$scope.app = "Lista Telefonica !";
	$scope.contatos = [];
	$scope.operadoras = [];

	var carregarContatos = function(){
		contatosAPI.getContatos().then(function (data){
			$scope.contatos = data.data;
		}).catch(function(data,status){
			$scope.error = "Não foi possivel carregar os dados";
		});
	};

	var carregarOperadoras = function () {
		operadorasAPI.getOperadoras().then(function (data){
			$scope.operadoras = data.data;
		});
	};

	$scope.adicionarContato = function(contato){
		contato.serial = serialGenerator.generate();
		//contato.data = new Date();
		contatosAPI.salvaContatos(contato).then(function (data){
			delete $scope.contato;
			$scope.formContato.$setPristine();
			carregarContatos();
		});
	};

	$scope.apagarContatos = function(contatos){
		$scope.contatos = contatos.filter(function(contato){
			if (!contato.selecionado) return contato;
		});
	};

	$scope.isContatoSelecionado = function (contatos){
		return contatos.some(function(contato){
			return contato.selecionado;
		});
	};

	$scope.ordernarPor = function(campo){
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoOrdenacao = ! $scope.direcaoOrdenacao;
	};

	carregarContatos();
	carregarOperadoras();

});