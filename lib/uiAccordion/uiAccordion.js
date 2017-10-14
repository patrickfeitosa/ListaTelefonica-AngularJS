//Utilização de diretivas para tratamento de multiplos componentes via Controller Pai

angular.module("uiAccordion", []);


//Implementação da funcionalidade modularizada com inicialização em bloco de template
angular.module("uiAccordion").run(function($templateCache){
	$templateCache.put("view/accordion.html",'<div class="ui-accordion-title" ng-click="open()"> {{title}} </div><div class="ui-accordion-content" ng-show="isOpened" ng-transclude> </div>')
});

angular.module("uiAccordion").directive("uiAccordions", function(){
	return {
		controller: function ($scope, $element, $attrs){
			var accordions = [];

			this.registerAccordion = function(accordion){
				accordions.push(accordion);
			};

			this.closeAll = function(){
				accordions.forEach(function(accordion){
					accordion.isOpened = false;
				});
			}
		}
	}
});

angular.module("uiAccordion").directive("uiAccordion", function(){
	return {
		templateUrl:"view/accordion.html",
		transclude: true,
		scope:{
			title:"@"
		},
		require:"^uiAccordions",
		link: function(scope, element, attrs, ctrl){
			ctrl.registerAccordion(scope);
			scope.open = function(){
				ctrl.closeAll();
				scope.isOpened = true;
			};
		}
	};
});