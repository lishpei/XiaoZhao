
  function PageHeader($scope,StaticResource){
      $scope.ResourceURLs = StaticResource.getResourceURLs('PageHeader');
  }

  function PageFooter($scope,StaticResource){
      $scope.ResourceURLs = StaticResource.getResourceURLs('PageFooter');
  }

  //This is the controller for management/Student-management/Smanagement.html
  //mainly for switch pages
  function Smanagement($scope,$rootScope,$location,$cookieStore,UserManager,StudentResumeManager,templateName,StaticResource){

    if($cookieStore.get('role') != 0){
        $location.path('/index');
    }

    $scope.pageTag = "学生管理";
    $scope.date = (new Date()).valueOf();
    $scope.template = templateName.getTemplateURL('StudentResume');

    StudentResumeManager.getStudentName($cookieStore.get('ID'),function(result){
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

    $scope.ResourceURLs = StaticResource.getResourceURLs('Smanagement');
  }


  //This is the controller for management/Student-management/resume_personal.html
  //mainly for switch pages and personal infomation in student resume
  function resumeCtrl($scope,templateName,StudentResumeManager,StudentResumeParts,StaticResource){

    $scope.parts = StudentResumeParts.getResumePartName();
    StudentResumeManager.getGP(function(result){
        $scope.count = result.info;
    });
    $scope.$on("change",function(event,data){
        StudentResumeManager.getGP(function(result){
            $scope.count = result.info;
        });
    });
    $scope.template = templateName.getTemplateURL('personalinfo');

    $scope.setTemplate = function(Name){
        $scope.template = templateName.getTemplateURL(Name);
    }
    $scope.ResourceURLs = StaticResource.getResourceURLs('resumeCtrl');
  }


  //This is the controller for management/Student-management/resume_personalexperience.html
  //mainly for switch pages
  function PersonalExperience($scope,$timeout,$rootScope,StaticResource,StudentResumeManager){

    $scope.ResourceURLs = StaticResource.getResourceURLs('PersonalExperience');
    
    $scope.status = true;
    $scope._change = false;
    $scope._save = false;

    $scope.add = function(){
        $scope.status = false;
        $scope._save = true;
        $scope._change = false;
    }


    $scope.save = function(Exp){
        $scope.status = true;
        $scope._save = false;
        $scope._change = false;
        $rootScope.$broadcast('Click');
        var d = Exp.startDate;
        Exp.startDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        var d = Exp.endDate;
        Exp.endDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        StudentResumeManager.addPersonalExp(Exp,function(result){
            $rootScope.$broadcast("loadingFinish",result.info);
            $rootScope.$broadcast('change');
            StudentResumeManager.getExpList(function(result){
                $scope.experiences = result.data;
            });
        });
    }

    $scope._delete = function(pid){
        $rootScope.$broadcast('Click');
        StudentResumeManager.deletePersonalExp(pid,function(result){
            $rootScope.$broadcast("loadingFinish",result.info);
            $rootScope.$broadcast('change');
            StudentResumeManager.getExpList(function(result){
                $scope.experiences = result.data;
            });
        });
        $rootScope.$broadcast('Click');
    }

    $scope.change = function(_Exp){
        $scope.Exp = _Exp;
        $scope.status = false;
        $scope._change = true;
        $scope._save = false;
    }

    $scope.UpLoadChange = function(Exp){
        $scope.status = true;
        $scope._change = false;
        $scope._save = false;
        $rootScope.$broadcast('Click');
        StudentResumeManager.changePersonalExp(Exp,function(result){
           $rootScope.$broadcast("loadingFinish",result.info);
            StudentResumeManager.getExpList(function(result){
                $scope.experiences = result.data;
            });
        });
    }

    StudentResumeManager.getExpList(function(result){
        $scope.experiences = result.data;
    });
  }


  //This is the controller for management/Student-management/resume_educationinfo.html
  //mainly for edication infomation in student resume
  function ResumeEducation($scope,$timeout,$rootScope,StudentResumeManager){

      $scope.status = true;
      $scope._change = false;
      $scope._save = false;

      StudentResumeManager.getEducationList(function(result){
          $scope.educationRecord = result.data;
      });

      $scope.add = function(){
          $scope.status = false;
          $scope._save = true;
          $scope._change = false;
      }

      $scope.save = function(Exp){
          $scope.status = true;
          $scope._save = false;
          $scope._change = false;
          var d = Exp.startDate;
          Exp.startDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          $rootScope.$broadcast('Click');
          StudentResumeManager.addEducationExp(Exp,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              $rootScope.$broadcast('change');
              StudentResumeManager.getEducationList(function(result){
                  $scope.educationRecord = result.data;
              });
          });
      }

      $scope._delete = function(pid){
          $rootScope.$broadcast('Click');
          StudentResumeManager.deleteEducationExp(pid,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              $rootScope.$broadcast('change');
              StudentResumeManager.getEducationList(function(result){
                  $scope.educationRecord = result.data;
              });
          });
          
      }

      $scope.change = function(_Exp){
          $scope.Exp = _Exp;
          if(_Exp.startDate == "0000-00-00"){
              $scope.Exp.startDate = new Date();
              $scope.Exp.startDate.setFullYear(2010,0,1);
          }
          $scope.status = false;
          $scope._change = true;
          $scope._save = false;
      }

      $scope.UpLoadChange = function(Exp){
          $scope.status = true;
          $scope._change = false;
          $scope._save = false;
          var d = Exp.startDate;
          Exp.startDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          $rootScope.$broadcast('Click');
          StudentResumeManager.changeEducationExp(Exp,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              StudentResumeManager.getEducationList(function(result){
                  $scope.educationRecord = result.data;
              });
          });
      }

  }


  //This is the controller for management/Student-management/resume_personal.html
  //mainly for personal experience in student resume
  function personalInfo($scope,$timeout,$cookieStore,$rootScope,$upload,StudentResumeManager){

      StudentResumeManager.getStudentBasicInfo(function(result){
          $scope.StudentInfo = result.data;
          if(result.data.birth == "0000-00-00"){
              $scope.StudentInfo.birth = new Date();
              $scope.StudentInfo.birth.setFullYear(1991,1,1);
          }
          $scope.avtor = result.data.avtor;
      });

      $scope.fileCount = "0%";
      $scope.onFileSelect = function($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
          var file = $files[i];
          $scope.upload = $upload.upload({
            url: 'index.php/Photo/sload', //upload.php script, node.js route, or servlet url
            method: 'POST',
            data: {},
            file: file,
          }).progress(function(evt) {
            $scope.fileCount = parseInt(100.0 * evt.loaded / evt.total) + "%";
          }).success(function(data, status, headers, config) {
              $rootScope.$broadcast("Click");
              $rootScope.$broadcast("loadingFinish","成功上传图片");
              StudentResumeManager.getStudentAvtor($cookieStore.get('ID'),function(result){
                  $scope.avtor = result.data;
              });
          }).error(function(data, status, headers, config) {
              $rootScope.$broadcast("Click");
              $rootScope.$broadcast("loadingFinish","图片上传失败");
          });
        }
      };

      $scope.status = "normal";

      $scope.setStatus = function(_status){
          $scope.status = _status;
      }
      
      $scope.save = function(student){
          var d = student.birth;
          student.birth = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
          $scope.status = "normal";
          $rootScope.$broadcast('Click');
          StudentResumeManager.updateStudentBasicInfo(student,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              $rootScope.$broadcast('change');
          });
          
      }
  }

  //This is the controller for management/Student-management/Studentsendhistory.html
  //mainly for the history record of students' choice on sending their own resume.
  function historyRecord($scope,$rootScope,ResumePostManager,StaticResource){

      ResumePostManager.getHistoryRecord(function(result){
          $scope.historyRecords = result.data;
      });

      $scope.back = function(rid){
          $rootScope.$broadcast("Click");
          ResumePostManager.BackResume(rid,function(result){
              $rootScope.$broadcast("loadingFinish",result.info);
              if(result.status == 1){
                  ResumePostManager.getHistoryRecord(function(result){
                      $scope.historyRecords = result.data;
                  });
              }
          });
      }

      $scope.ResourceURLs = StaticResource.getResourceURLs('historyRecord');
  }