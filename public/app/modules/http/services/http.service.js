(function(){
	angular.module('app').factory('$test',function($resource, $singleton){
		return $resource($singleton.path + 'test/:testId');
	});
})();