angular.module("listaTelefonica").controller("novoContatoController", function($scope, contatosAPI, operadoras, serialGenerator, $location){
	$scope.operadoras = operadoras.data;

	$scope.adicionarContato = function(contato){
		var i;
		contato.id = i++;
		contato.serial = serialGenerator.generate();
		contatosAPI.salvaContatos(contato).then(function (data){
			delete $scope.contato;
			$scope.formContato.$setPristine();
			$location.path("/contatos");
		});
	};	
});