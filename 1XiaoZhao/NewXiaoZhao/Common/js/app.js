'use strict';


// Declare app level module which depends on filters, and services
var xiaozhao = angular.module('myApp', [
                  'ngRoute',
                  'ngCookies',
                  'ngSanitize',
                  'myApp.filters',
                  'myApp.services',
                  'myApp.directives',
                  'ngCkeditor',
                  'ngQuickDate',
                  'angularFileUpload'
                ],function($httpProvider){
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data)
  {
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */ 
    var param = function(obj)
    {
      var query = '';
      var name, value, fullSubName, subName, subValue, innerObj, i;
      
      for(name in obj)
      {
        value = obj[name];
        
        if(value instanceof Array)
        {
          for(i=0; i<value.length; ++i)
          {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value instanceof Object)
        {
          for(subName in value)
          {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value !== undefined && value !== null)
        {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
      
      return query.length ? query.substr(0, query.length - 1) : query;
    };
    
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
});


xiaozhao.config(['$routeProvider', function($routeProvider) {
  var rootAddress = "Common/"

  $routeProvider.when('/login', {templateUrl: rootAddress + 'partials/LoginAndRegister/login.html', controller: 'LRCtrl'});
  $routeProvider.when('/register', {templateUrl: rootAddress + 'partials/LoginAndRegister/register.html', controller: 'LRCtrl'});
  $routeProvider.when('/index', {templateUrl: rootAddress  + "partials/static/index_page.html", controller: 'IndexMain'});
  $routeProvider.when('/about', {templateUrl: rootAddress + "partials/static/about.html", controller: 'about'});
  $routeProvider.when('/NewsList', {templateUrl: rootAddress + "partials/newslist/NewsList.html", controller: 'newsList'});
  $routeProvider.when('/Job/:jid', {templateUrl: rootAddress + 'partials/companylist/Job.html', controller: 'Job'});
  $routeProvider.when('/Cpage/:cid', {templateUrl: rootAddress + "partials/companylist/Cpage.html", controller: 'Cpage'});
  $routeProvider.when('/CompanyList', {templateUrl: rootAddress + "partials/companylist/CompanyList.html", controller: 'companyList'});
  $routeProvider.when('/Cmanagement', {templateUrl: rootAddress + 'partials/management/Company-management/Cmanagement.html', controller: 'Cmanagement'});
  $routeProvider.when('/Smanagement', {templateUrl: rootAddress + 'partials/management/Student-management/Smanagement.html', controller: 'Smanagement'});
  $routeProvider.when('/Amanagement', {templateUrl: rootAddress + 'partials/management/admin-management/Amanagement.html', controller: 'Amanagement'});
  $routeProvider.otherwise({redirectTo:'/index'});
}]);

xiaozhao.config(function(ngQuickDateDefaultsProvider) {
    return ngQuickDateDefaultsProvider.set({
  });
});


xiaozhao.run(['$q', '$timeout', function($q, $timeout) {
    $defer = $q.defer();

    if (angular.isUndefined(CKEDITOR)) {
        throw new Error('CKEDITOR not found');
    }
    CKEDITOR.disableAutoInline = true;
    function checkLoaded() {
        if (CKEDITOR.status == 'loaded') {
            loaded = true;
            $defer.resolve();
        } else {
            checkLoaded();
        }
    }
    CKEDITOR.on('loaded', checkLoaded);
    $timeout(checkLoaded, 100);
}]);


