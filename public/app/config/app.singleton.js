(function(){
	var factory = function(){
        return { path: 'http://localhost:2000/v0/'};
	};
	angular.module('app').factory('$singleton',factory);
})();