sportoholic.factory('authInterceptor', function ($rootScope, $q, $window) {
	return {
		request: function (config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {			
				config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
			}
			
			return config;
		},
		response: function (response) {
			if (response.status === 401) {
				alert('Not authenticated');
			}
			
			return response || $q.when(response);
		}
	};
});

sportoholic.config(function ($httpProvider) {
	$httpProvider.interceptors.push('authInterceptor');
});
