(function(){
	angular.module('app').factory('Home',function($resource, $singleton){
		var path = $singleton.path;
		
		return $resource(path+'test/:testId');
	});
})();