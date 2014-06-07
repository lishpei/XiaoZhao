function PageHeader($scope,StaticResource){
	$scope.ResourceURLs = StaticResource.getResourceURLs('PageHeader');
}

function PageFooter($scope,StaticResource){
	$scope.ResourceURLs = StaticResource.getResourceURLs('PageFooter');
}

function Amanagement($scope,$rootScope,$location,$cookieStore,UserManager,templateName,StaticResource){
	
	$scope.pageTag = "后台管理";
	$scope.date = (new Date()).valueOf();
	$scope.template = templateName.getTemplateURL('checkCompany');
	$scope.username = "管理员";

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
    
    $scope.adminManagement = false;
    if($cookieStore.get('ID') == 1){
    	$scope.adminManagement = true;
	}

	$scope.ResourceURLs = StaticResource.getResourceURLs('Amanagement');
}

function companyDetail($scope,StaticResource,CompanyInfo){
	$scope.ResourceURLs = StaticResource.getResourceURLs('companyDetail');

	$scope.loading = true;
	this.loadCompany = function(cid){
		CompanyInfo.CompanyBasicInfo(cid,function(result){
			$scope.loading = false;
			$scope.company = result.data;
		});
	}
}

function checkCompany($scope,$rootScope,CompanyInfo,PhotoManager){
	$scope.selected = -1;
	$scope.empty = false;

	CompanyInfo.companyUncheckedList(function(result){
		$scope.UncheckedCList = result.data;
		$scope.length = 0;
		$scope.ID = [];
		for(var i in result.data){
			$scope.length ++;
			$scope.ID.push(i);
		}
	});

	$scope.getID = function(){
		if($scope.selected == -1){
			return -1;
		}else{
			return $scope.ID[$scope.selected];
		}
	}

	$scope.approve = function(){
		$rootScope.$broadcast('Click');
		delete $scope.UncheckedCList[$scope.ID[$scope.selected]];
		CompanyInfo.ChangeCompanyStatus($scope.ID[$scope.selected],1,function(result){
			$rootScope.$broadcast("loadingFinish",result.info);
			$scope.ID.splice($scope.selected,1);
		});
		$scope.next();
	}

	$scope.select = function(cid,index){
		$scope.selected = index;
		$scope.selectedname = $scope.UncheckedCList[cid];
		PhotoManager.getCompanyPhoto(cid,function(result){
          if (! result.data) {
          		$scope.empty = true;
          		$scope.photos = [];
          }else{
          		$scope.empty = false;
          		$scope.photos = result.data;
          }
      });
	}

	$scope.next = function(){
		$scope.selected ++;
		$scope.selected = $scope.selected % $scope.length;
		$scope.selectedname = $scope.UncheckedCList[$scope.ID[$scope.selected]];
		PhotoManager.getCompanyPhoto($scope.ID[$scope.selected],function(result){
          if (! result.data) {
          		$scope.empty = true;
          		$scope.photos = [];
          }else{
          		$scope.empty = false;
          		$scope.photos = result.data;
          }
      });
	}
}

function adminList($scope,$rootScope,AdminManager){
	AdminManager.getList(function(result){
		$scope.admins = result.data;
	});

	$scope._delete = function(aid){
		$rootScope.$broadcast('Click');
		AdminManager._delete(aid,function(result){
			$rootScope.$broadcast("loadingFinish",result.info);
			if(result.status == 1){
				AdminManager.getList(function(result){
					$scope.admins = result.data;
				});
			}
		});
	}

	$scope.check = function(username){
		AdminManager.checkAdminUsername(username,function(result){
			$scope.result = result.info;
		});
	}

	$scope._edit = false;
	$scope.edit = function(){
		$scope._edit = true;
	}
	$scope.add = function(admin){
		$scope._edit = false;
		$rootScope.$broadcast('Click');
		AdminManager.addAdmin(admin,function(result){
			$rootScope.$broadcast("loadingFinish",result.info);
			if(result.status == 1){
				AdminManager.getList(function(result){
					$scope.admins = result.data;
				});
			}
		});
	}
	
}