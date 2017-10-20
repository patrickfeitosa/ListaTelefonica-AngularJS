angular.module("listaTelefonica").config(function($routeProvider){
	$routeProvider.when("/contatos", {
		templateUrl: "view/contatos.html",
		controller: "listaTelefonicaController",
		resolve:{
			operadoras: function(operadorasAPI){
				return operadorasAPI.getOperadoras();
			},
			contatos: function(contatosAPI){
				return contatosAPI.getContatos();
			}
		}
	});

	$routeProvider.when("/novoContato", {
		templateUrl: "view/novoContato.html",
		controller: "novoContatoController",
		resolve:{
			operadoras: function(operadorasAPI){
				return operadorasAPI.getOperadoras();
			}
		}
	});

	$routeProvider.when("/detalhesContato/:id", {
		templateUrl: "view/detalhesContato.html",
		controller: "detalhesContatoController",
		resolve:{
			contato: function(contatosAPI, $route){
				return contatosAPI.getContato($route.current.params.id);
			}
		}
	});

	$routeProvider.otherwise({ redirectTo:"/contatos"});
});

//Parte do código para manter o / no navegador
angular.module("listaTelefonica").config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
}]);