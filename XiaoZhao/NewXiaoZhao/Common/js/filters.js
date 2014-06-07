'use strict';

/* Filters */

var xiaozhao_filters = angular.module('myApp.filters', []);

xiaozhao_filters.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);

xiaozhao_filters.filter('shortStatement',[function(){
	var len = 40;

	var filterfun = function(text) {
		if(text.length < len){
			return text;
		}
        return text.substr(0, len) + "..." ;
    };
    return filterfun;
}]);

xiaozhao_filters.filter('path',[function(){

  var filterfun = function(text) {
      return "." + text;  
  };
    return filterfun;
}]);


