  //This is the controller for LoginAndRegister
  //mainly manage all the page related to login and register
  function LRCtrl($scope,$location,StaticResource) {
      $scope.$on('CompanyRegister', function(event, data) {
          $location.path('/login');
      });
      $scope.$on('StudentRegister', function(event, data) {
          $location.path('/login');
      });
      $scope.ResourceURLs = StaticResource.getResourceURLs('LR');
  }

  //This is the controller for LoginAndRegister/login.html
  //mainly manage login
  function LoginCtrl($scope,$cookieStore,$rootScope,$timeout,$location,UserManager){

      $scope.Login = function(user){
          $rootScope.$broadcast('Click');
          UserManager.login(user,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              if(result.status == 1){
                  $cookieStore.put('role',result.data.role);  
                  $cookieStore.put('ID',result.data.id);
                  $timeout(function(){
                    $location.path('/index');
                  },1000);
              }
          });
      }
  }

  //This is the controller for LoginAndRegister/register.html
  //mainly manage company register
  function CompanyCtrl($scope,$timeout,$rootScope,UserManager,StaticResource){

      $scope.PasswordError = false;
      $scope.registerTipsShow = false;
      $scope.CheckPassword =function(){
          if($scope.company.Rpassword != $scope.company.password){
              $scope.PasswordError = true;
          }else{
              $scope.PasswordError = false;
          }
      }
      
      $scope.CheckCompanyUsername = function(){
        if($scope.company.username.length > 1 && $scope.company.username.length < 21){
          UserManager.CheckCompanyUsername($scope.company.username,function(result){
              $scope.UsernameInfo = result.info;
          });
        }
      }

      $scope.CompanyRegister = function(company){
          $rootScope.$broadcast('Click');
          UserManager.CompanyRegister(company,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              $timeout(function(){
                  if (result.status == 1) {
                      $rootScope.$broadcast('CompanyRegister');
                  }
              },1000);
          });
      }

      $scope.ResourceURLs = StaticResource.getResourceURLs('CompanyCtrl');
  }

  //This is the controller for LoginAndRegister/register.html
  //mainly manage student register
  function StudentCtrl($scope,$timeout,$rootScope,UserManager){
      $scope.StudentRegister = function(student){
          $rootScope.$broadcast('Click');
          UserManager.StudentRegister(student,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              $timeout(function(){
                  if (result.status == 1) {
                      $rootScope.$broadcast('StudentRegister');
                  }
              },1000);
          });
      }

      $scope.PasswordError = false;
      $scope.CheckPassword =function(){
          if($scope.student.Rpassword != $scope.student.password){
              $scope.PasswordError = true;
          }else{
              $scope.PasswordError = false;
          }
      }

      $scope.CheckStudentUsername = function(){
        if($scope.student.username.length > 1 && $scope.student.username.length < 21){
          UserManager.CheckStudentUsername($scope.student.username,function(result){
              $scope.UsernameInfo = result.info;
              $scope.UserError = (result.status == 0);
          });
        }
      }
  }