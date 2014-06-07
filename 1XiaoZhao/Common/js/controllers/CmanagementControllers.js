
  function PageHeader($scope,StaticResource){
      $scope.ResourceURLs = StaticResource.getResourceURLs('PageHeader');
  }

  function PageFooter($scope,StaticResource){
      $scope.ResourceURLs = StaticResource.getResourceURLs('PageFooter');
  }

  //This is the controller for management/Company-management/companyAuth.html 
  //mainly for companys to submit their identification
  //upload photos
  function companyAuth($scope,$timeout,$cookieStore,$rootScope,$upload,CompanyInfo,PhotoManager){

      CompanyInfo.getCompanyLogo($cookieStore.get('ID'),function(result){
          $scope.logo = result.data;
      });

      PhotoManager.getCompanyPhoto($cookieStore.get('ID'),function(result){
          $scope.photos = result.data;
          if($scope.photos != null){
            $scope.normal = [];
            for(var i = 0 ; i < $scope.photos.length ; i++){
                $scope.normal.push(true);
            }
          }
      });

      $scope.edit = function(index){
          $scope.normal[index] = ! $scope.normal[index];
      }

      $scope.save = function(index){
          $rootScope.$broadcast("Click");
          $scope.normal[index] = ! $scope.normal[index];
          PhotoManager.ChangeCompanyPhotoStatement($scope.photos[index].cpid,$scope.photos[index].statement,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
          });
      }

      $scope.UpdateFinished = function(_data){
          var data = eval('(' + _data + ')');
          alert(data.info);
          
      }

      $scope.fileCount = "0%";
      $scope.onFileSelect = function($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
          var file = $files[i];
          $scope.upload = $upload.upload({
            url: 'index.php/Photo/ccload', //upload.php script, node.js route, or servlet url
            method: 'POST',
            data: {},
            file: file,
          }).progress(function(evt) {
            $scope.fileCount = parseInt(100.0 * evt.loaded / evt.total) + "%";
          }).success(function(data, status, headers, config) {
              $rootScope.$broadcast("Click");
              $rootScope.$broadcast("loadingFinish","成功上传图片");
              PhotoManager.getCompanyPhoto($cookieStore.get('ID'),function(result){
                $scope.photos = result.data;
                if($scope.photos != null){
                    $scope.normal = [];
                    for(var i = 0 ; i < $scope.photos.length ; i++){
                        $scope.normal.push(true);
                    }
                }
              });
          }).error(function(data, status, headers, config) {
              $rootScope.$broadcast("Click");
              $rootScope.$broadcast("loadingFinish","图片上传失败");
          });
        }
      };
  }

  
  //This is the controller for management/Company-management/Cmanagement.html
  //mainly for switch page
  function Cmanagement($scope,$rootScope,$location,$cookieStore,UserManager,CompanyInfo,templateName,StaticResource){

    if($cookieStore.get('role') != 1){
        $location.path('/index');
    }

    $scope.pageTag = "企业管理";
    $scope.date = (new Date()).valueOf();
    $scope.template = templateName.getTemplateURL("companyPage");

    CompanyInfo.getCompanyStatus($cookieStore.get('ID'),function(result){
          $scope.unAuth = (result.data == 0);
      });

    CompanyInfo.getCompanyName(function(result){
        $scope.username = result.data;
    });

    $scope.setTemplate = function(Name){
       $scope.template = templateName.getTemplateURL(Name);
    }

    $scope.logoff = function(){
        $rootScope.$broadcast("Click");
        UserManager.logoff(function(result){
            $rootScope.$broadcast("loadingFinish",result.info);
            $cookieStore.remove('role');
            $cookieStore.remove('ID');
            $cookieStore.remove('enrolled');
            $location.path('/index');
        });
    }

    $scope.$on('createjob', function(event, mass) {
        $scope.template = templateName.getTemplateURL("jobList");
    });

    $scope.status = "list";
    $scope.$on("JobDetail",function(event,jid){
        $scope.template = templateName.getTemplateURL('singlejob');
        $scope.status = "single";
    });

    $scope.backToList = function(){
        $scope.template = templateName.getTemplateURL("jobList");
        $scope.status = "list";
    }

    $scope.ResourceURLs = StaticResource.getResourceURLs('Cmanagement');
  }

  //This is the controller for management/Company-management/jobList.html
  //mainly for companys to manage their jobs infomation
  //to delete, update job infomation 
  function jobList($scope,$rootScope,$timeout,JobData,PassData){

    $scope.currentPage = 1 ;
    $scope.FirstPage = true;

    $scope.detail = function(jid){
        PassData.JID = jid;
        $scope.$emit("JobDetail", jid);
    }

    $scope.getJobListCallBack = function(result){$scope.jobs = result.data;};

    JobData.getJobList(1,$scope.getJobListCallBack);

    JobData.getPageNum(function(result){
        var page = result.data;
        if(page == 1){
            $scope.LastPage = true;
        }else{
            $scope.LastPage = false;
        }
        $scope.pageView = [];
        for(var i = 1 ; i <= page ; i++){
            $scope.pageView.push(i);
        }
    });

    $scope.NextPage = function(){
        $scope.currentPage ++ ;
        $scope.FirstPage = false;
        if($scope.currentPage == $scope.pageView.length){
            $scope.LastPage = true;
        }
        JobData.getJobList($scope.currentPage,$scope.getJobListCallBack);
    }

    $scope.PrePage = function(){
        $scope.currentPage -- ;
        $scope.LastPage = false;
        if($scope.currentPage == 1){
            $scope.FirstPage = true;
        }
        JobData.getJobList($scope.currentPage,$scope.getJobListCallBack);
    }

    $scope.setPage = function(page){
        $scope.currentPage = page;
        JobData.getJobList(page,$scope.getJobListCallBack);
    }

    $scope.$on("deletejob",function(event,attrs){
        JobData.getJobList(page,$scope.getJobListCallBack);
    });

  }


  //This is the controller for management/Company-management/jobList.html
  //it controlls the small tips in that page
  //when people click delete job button, it will be shown
  function modelView($scope,$rootScope,JobData){

      this.setAttrs = function(jid,name){
          $scope.jid = jid;
          $scope.name = name;
          $scope.$apply();
      }

      this._delete = function(){
          JobData.deleteSinglejob($scope.jid,function(result){
              $rootScope.$broadcast('deletejob');
          });
      }
  }

  function BigPictureView($scope){
      this.setPhoto = function(src){
          $scope.photo = src;
          $scope.$apply();
      }
  }


  //This is the controller for management/Company-management/singlejob.html
  //when people want to change or read job detail, it will be shown
  function singlejob($scope,$timeout,$rootScope,JobData,StaticResource,PassData){

      JobData.getSingleJob(PassData.JID,function(result){
          $scope.items = result.data;
      });

      $scope.status = "normal";

      $scope.save = function(job){
          $scope.status = "normal";
          $rootScope.$broadcast('Click');
          JobData.changeJobInfo(job,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
          });
      }

      $scope.edit = function(){
          $scope.status = "edit";
      }

      $scope.ResourceURLs = StaticResource.getResourceURLs('singlejob');
  }

  //This is the controller for management/Company-management/createjob.html
  //when people want to create job, it will be shown
  function createJob($scope,$rootScope,$timeout,StaticResource,JobData){
      $scope.ResourceURLs = StaticResource.getResourceURLs('createJob');

      $scope.createjob = function(job){
          $rootScope.$broadcast('Click');
          JobData.createSingleJob(job,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              $timeout(function(){
                  $rootScope.$broadcast('createjob');
              },1000);
          });
      }
      
  }

  //This is the controller for management/Company-management/companyPage.html
  //if people want to change their companys' basic infomation, it will be useful
  function companyInfo($scope,$cookieStore,$rootScope,$upload,CompanyInfo,StaticResource){

    CompanyInfo.CompanyBasicInfo($cookieStore.get('ID'),function(result){
        $scope.cInfo = result.data;
    });

    $scope.ResourceURLs = StaticResource.getResourceURLs('CompanyInfo');

    $scope.status = "normal";

    $scope.change = function(){
        $scope.status = "edit";
    }

    $scope.save = function(info){
        $scope.status = "normal";
        $rootScope.$broadcast('Click');
        CompanyInfo.CompanyChange(info,function(result){
            $rootScope.$broadcast("loadingFinish",result.info);
        });
    }

    CompanyInfo.getCompanyLogo($cookieStore.get('ID'),function(result){
        $scope.logo = result.data;
    });

    $scope.fileCount = "0%";
      $scope.onFileSelect = function($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
          var file = $files[i];
          $scope.upload = $upload.upload({
            url: 'index.php/Photo/cload', //upload.php script, node.js route, or servlet url
            method: 'POST',
            data: {},
            file: file,
          }).progress(function(evt) {
            $scope.fileCount = parseInt(100.0 * evt.loaded / evt.total) + "%";
          }).success(function(data, status, headers, config) {
              $rootScope.$broadcast("Click");
              $rootScope.$broadcast("loadingFinish","成功上传图片");
              CompanyInfo.getCompanyLogo($cookieStore.get('ID'),function(result){
                  $scope.logo = result.data;
              });
          }).error(function(data, status, headers, config) {
              $rootScope.$broadcast("Click");
              $rootScope.$broadcast("loadingFinish","图片上传失败");
          });
        }
      };


  }

  //This is the controller for management/Company-management/resumeList.html
  //mainly for company to read the resumes which are sent to them
  function resumeList($scope,templateName,ResumePostManager,StaticResource){

      $scope.template = templateName.getTemplateURL('singleResume');

      $scope.ResourceURLs = StaticResource.getResourceURLs('resumeList');

      $scope.getSingleResumeCallBack = function(result){
                                            result.data.certification = result.data.certificationNum + "(" + result.data.certificationNum + ")";
                                            $scope.BasicInfo = result.data;
                                            $scope.BasicInfo.jname = $scope.List[$scope.selected].name;
                                        };

      ResumePostManager.PostList(function(result){
          if(result.data != null){
              $scope.List = result.data;
              $scope.length = result.data.length;
              ResumePostManager.getSingleResume($scope.List[0].sid,1,$scope.getSingleResumeCallBack);
              $scope.tips = false;
          }else{
              $scope.tips = true;
          }
      });

      $scope.selected = -1;

      $scope.select = function(index){
          $scope.selected = index;
          ResumePostManager.getSingleResume($scope.List[$scope.selected].sid,1,$scope.getSingleResumeCallBack);
          if($scope.List[index].status == 0){
              $scope.List[index].status = 1;
              ResumePostManager.ChangeStatus($scope.List[index].rid,1);
          }
      }

      $scope.next = function(){
          $scope.selected ++ ;
          $scope.selected = $scope.selected % $scope.length;
          ResumePostManager.getSingleResume($scope.List[$scope.selected].sid,1,$scope.getSingleResumeCallBack);
          if($scope.List[$scope.selected].status == 0){
              $scope.List[$scope.selected].status = 1;
              ResumePostManager.ChangeStatus($scope.List[$scope.selected].rid,1);
          }
      }

      $scope.EDUloading = true;
      $scope.readEduInfo = function(){
          ResumePostManager.getSingleResume($scope.List[$scope.selected].sid,2,function(result){
              $scope.EDUInfo = result.data;
              $scope.EDUloading = false;
          });
      }

      $scope.EXPloading = true;
      $scope.readExpInfo = function(){
          ResumePostManager.getSingleResume($scope.List[0].sid,3,function(result){
              $scope.experiences = {};
              for(var item in result.data){
                  if(!$scope.experiences.hasOwnProperty(result.data[item].Type)){
                      $scope.experiences[result.data[item].Type] = [];
                  }
                  $scope.experiences[result.data[item].Type].push(result.data[item]);
              }
              $scope.EXPloading = false;
          });
      }
  }