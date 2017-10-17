angular.module("listaTelefonica").config(function($routeProvider){
	$routeProvider.when("/contatos", {
		templateUrl: "view/contatos.html"
	});
});

angular.module("listaTelefonica").config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
}]);