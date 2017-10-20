angular.module("listaTelefonica").controller("detalhesContatoController", function($scope, $routeParams, contato){
	
		$scope.contato = contato.data;

});