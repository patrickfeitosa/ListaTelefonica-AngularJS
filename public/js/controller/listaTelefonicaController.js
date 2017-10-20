angular.module("listaTelefonica").controller("listaTelefonicaController", function($scope, contatos, operadoras, operadorasAPI, serialGenerator){
	$scope.app = "Lista Telefonica !";
	$scope.contatos = contatos.data;
	$scope.operadoras = operadoras.data;

	var serialGenerate = function(contatos){	
		var i = 1;	
		contatos.forEach(function (item) {
			item.id = i++;
			item.serial = serialGenerator.generate();
		});
	};

	var carregarOperadoras = function () {
		operadorasAPI.getOperadoras().then(function (data){
			$scope.operadoras = data.data;
		});
	};

	$scope.adicionarContato = function(contato){
		contato.serial = serialGenerator.generate();
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

	serialGenerate($scope.contatos);

});