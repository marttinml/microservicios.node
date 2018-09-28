angular.
	  module('app').
		 config(['$resourceProvider', function ($resourceProvider) {
		    $resourceProvider.defaults.actions = {
		      save: 	{method: 'POST'},
		      get:    	{method: 'GET'},
		      getAll: 	{method: 'GET', isArray:true},
		      update: 	{method: 'PUT'},
		      delete: 	{method: 'DELETE'}
		    };
		  }]);