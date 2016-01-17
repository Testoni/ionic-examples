function getTasks() {
	this.items = [];
	var lista = localStorage.getItem("tasklist");
	if (lista !== null) {
		this.items = angular.fromJson(lista);
	}
	this.save = function() {
		var lista = angular.toJson(this.items);
		localStorage.setItem("tasklist", lista);
	};
	this.remove = function(item) {
		var pos = this.items.indexOf(item);
		this.items.splice(pos, 1);
	};
	this.add = function(item) {
		this.items.push(item);
	};
}