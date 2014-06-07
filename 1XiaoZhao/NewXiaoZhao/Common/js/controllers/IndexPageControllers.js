  function FrontPageHeader($scope,$cookieStore,$rootScope,$location,StaticResource,UserManager,IndexManager){
      $scope.ResourceURLs = StaticResource.getResourceURLs('FrontPageHeader');

      $scope.flush = function(){
          $scope.admin = false;
          $scope.login = true;
          $scope.manage = "";
          $scope.enrolled = false;
          if($cookieStore.get('role') == 0){
              $scope.manage = "student";
              $scope.loginName = "亲爱的求职者"
          }else if($cookieStore.get('role') == 1){
              $scope.manage = "company";
              $scope.loginName = "亲爱的企业代表";
          }else if($cookieStore.get('role') == 2){
              $scope.admin = true;
              $scope.loginName = "可爱的管理员"
          }else{
              $scope.login = false;
          }
          if($cookieStore.get('enrolled') == 1 || $cookieStore.get('enrolled') == 3)
              $scope.enrolled = true;
      }

      $scope.logoff = function(){
          $rootScope.$broadcast("Click");
          UserManager.logoff(function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              $cookieStore.remove('role');
              $cookieStore.remove('ID');
              $cookieStore.remove('enrolled');
              $scope.flush();
          });
      }

      $scope.enroll = function(user){
          $rootScope.$broadcast("Click");
          UserManager.enroll(function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              $cookieStore.put('enrolled',result.status);
              $scope.flush();
          });
      }

      $scope.PageToIndex = {"/index":0,"/CompanyList":1,"/NewsList":2,"/about":3};
      $scope.selectedRow = $scope.PageToIndex[$location.path()];

      IndexManager.UserCount(function(result){
          $scope.studentNum = result.data.student;
          $scope.companyNum = result.data.company;
      });

      $scope.flush();
  }

  function FrontPageFooter($scope,StaticResource){
      $scope.ResourceURLs = StaticResource.getResourceURLs('FrontPageFooter');
  }

  function alertController($scope,$timeout,StaticResource){
      $scope.ResourceURLs = StaticResource.getResourceURLs('alertController');
      $scope.loading = false;
      $scope.TipsShow = false;
      $scope.$on("Click",function(event,attr){
          $scope.loading = true;
          $scope.TipsShow = true;
          $scope.changeResult = "";
      });
      $scope.$on("loadingFinish",function(event,message){
          $scope.loading = false;
          $scope.changeResult = message;
          $timeout(function(){
              $scope.TipsShow = false;
          },1000);
      });
  }

  //This is the controller for static/index_page.html 
  //mainly for dispaly the index page(the first page you can see on this website)
  function IndexMain ($scope,StaticResource,CompanyInfo,JobData) {
      $scope.ResourceURLs = StaticResource.getResourceURLs('index_page');

      CompanyInfo.TopCompany(function(result){
          $scope.TOPcompanys = result.data;
          if(result.data != null){
            for(var i = 0 ; i < result.data.length; i++){
                $scope.TOPcompanys[i].href = "#/Cpage/" + $scope.TOPcompanys[i].cid;
            }
          }
      });

      JobData.TopJob(function(result){
          $scope.TopJobs = result.data;
      });
  }

  //This is the controller for static/NewsList.html
  //mainly for showing the news list
  function newsList($scope,StaticResource){
      $scope.ResourceURLs = StaticResource.getResourceURLs('newsList');

  }

  //This is the controller for companyList/CompanyList.html
  //mainly for showing the company list
  //for students to look for their dream works
  function companyList($scope,StaticResource,CompanyInfo){
      $scope.ResourceURLs = StaticResource.getResourceURLs('companyList');

      $scope.getComListCallBack = function(result){
          $scope.companys = result.data;
          for(var i = 0 ; i < $scope.companys.length ; i++){
              $scope.companys[i].href = "#/Cpage/" + $scope.companys[i].cid;
          }
      }
      CompanyInfo.CompanyList(1,$scope.getComListCallBack);
      CompanyInfo.CompanyPageNum(function(result){
          $scope.pages = [];
          for(var i = 1 ; i <= result.data ; i++){
              $scope.pages.push(i);
          }
          if(result.data == 1 || result.data == 0){
              $scope.LastPage = true;
          }else{
              $scope.LastPage = false;
          }
      });

    $scope.FirstPage = true;
    $scope.currentPage = 1 ;

    $scope.PrePage = function(){
        $scope.currentPage ++ ;
        $scope.FirstPage = false;
        if($scope.currentPage == $scope.pageView.length){
            $scope.LastPage = true;
        }
        CompanyInfo.CompanyList(1,$scope.getComListCallBack);
    }

    $scope.NextPage = function(){
        $scope.currentPage -- ;
        $scope.LastPage = false;
        if($scope.currentPage == 1){
            $scope.FirstPage = true;
        }
        CompanyInfo.CompanyList(1,$scope.getComListCallBack);
    }

    $scope.setPage = function(page){
        $scope.currentPage = page;
        CompanyInfo.CompanyList(1,$scope.getComListCallBack);
    }
  }

  //This is the controller for companyList/Cpage.html
  //mainly for company to dispalay their infomation
  function Cpage($scope,$routeParams,StaticResource,CompanyInfo,ResumePostManager){
      $scope.ResourceURLs = StaticResource.getResourceURLs('Cpage');
      CompanyInfo.CompanyBasicInfo($routeParams['cid'],function(result){
          $scope.company = result.data;
      });
      CompanyInfo.CompanyJoblist($routeParams['cid'],function(result){
          $scope.jobs = result.data;
          for(var i = 0 ; i < $scope.jobs.length ; i++){
              $scope.jobs[i].href = "#/Job/" + $scope.jobs[i].jid;
          }
      });
  }

  function Job($scope,$routeParams,$rootScope,$cookieStore,JobData,StaticResource,CompanyInfo,ResumePostManager){
      $scope.ResourceURLs = StaticResource.getResourceURLs('Job');
      JobData.getSingleJob($routeParams['jid'],function(result){
          $scope.job = result.data;
          CompanyInfo.CompanyBasicInfo($scope.job.cid,function(result){
            $scope.company = result.data;
        });
      });
      $scope.companyLogin = ($cookieStore.get('role') == 1);
      
      $scope.postResume = function(jid){
          $rootScope.$broadcast("Click");
          ResumePostManager.PostResume(jid,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
          });
      }
  }

  function about($scope,StaticResource){
      $scope.ResourceURLs = StaticResource.getResourceURLs('about');
  }