var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
    	}
    	if(window.StatusBar) {
			StatusBar.styleDefault();
    	}
    });
});

app.controller('mainController', function($scope, $ionicPopup, $ionicListDelegate) {
	var tasks = new getTasks();
	$scope.lista = tasks.items;
	$scope.showMarked = false;
	$scope.removeStatus = false;
	function getItem(item, novo){
		$scope.data = {};
		$scope.data.newTask = item.nome;
		$ionicPopup.show({
			title: 'Nova Tarefa',
			scope: $scope,
			buttons: [
				{
					text: 'Ok',
					onTap: function(e) {
						item.nome = $scope.data.newTask;
						if (novo) {
							tasks.add(item);
						}
						tasks.save();
					}
				},
				{
					text: 'Cancel'
				}
			],
			template: '<input type="text" placeholder="Tarefa" autofocus="true" ng-model="data.newTask">'
		});
		//$ionicListDelegate.closeOptionsButtons();
	};
	$scope.onMarkTask = function(item) {
		item.finalizada = !item.finalizada;
		tasks.save();
	};
	$scope.onHideItem = function(item) {
		return item.finalizada && !$scope.showMarked;
	};
	$scope.onItemRemove = function(item) {
		tasks.remove(item);
		tasks.save();
	};
	$scope.onClickRemove = function() {
		$scope.removeStatus = !$scope.removeStatus;
	};
	$scope.onItemAdd = function(item) {
		var item = {
			nome: '',
			finalizada: false
		};
		getItem(item, true);
	};
	$scope.onItemEdit = function(item) {
		getItem(item);
		tasks.save();
	};
});