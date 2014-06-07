'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var xiaozhao_services = angular.module('myApp.services', []);
xiaozhao_services.value('version', '0.1');

var rootAddress = "Common/";
var ApiPix = "index.php/";

var APIs = {

	UserCount:ApiPix + "Index/count",

	UserLogin: ApiPix +'Login/login',
	UserLogoff: ApiPix +'Login/logoff',
	CompanyRegister:ApiPix +'Register/CompanyRegister',
	CompanyUserNameCheck:ApiPix +'Register/checkCompanyUsername',
	StudentRegister:ApiPix +'Register/StudentRegister',
	StudentUserNameCheck:ApiPix +'Register/checkStudentUsername',

	CreateJob:ApiPix +'Job/createjob',
	JobList:ApiPix +'Job/joblist',
	JobCount:ApiPix +'Job/jobCount',
	SingleJob:ApiPix +'Job/singlejob',
	deleteSinglejob:ApiPix +'Job/deletejob',
	changeJobInfo:ApiPix +'Job/changejob',
	TopJob:ApiPix + 'Job/TopJob',

	UpdateResumeBasicInfo:ApiPix +'Resume/updateBasicInfo',
	StudentBasicInfo:ApiPix +'Resume/getStudentResume',
	PersonalExp:ApiPix +'Resume/getStudentResume',
	getStudentAvtor:ApiPix +'Resume/getStudentAvtor',
	getStudentName:ApiPix +'Resume/getStudentName',
	getGP:ApiPix +'Resume/gp',

	AddPersonalExp:ApiPix +'PersonalExp/add',
	DeletePersonalExp:ApiPix +'PersonalExp/delete',
	ChangePersonalExp:ApiPix +'PersonalExp/change',

	AddEducationExp:ApiPix +'EducationExp/add',
	DeleteEducationExp:ApiPix +'EducationExp/delete',
	ChangeEducationExp:ApiPix +'EducationExp/change',

	CompanyChange:ApiPix +'Company/change',
	CompanyBasicInfo:ApiPix +'Company/getCompanyBasicInfo',
	CompanyJoblist:ApiPix +'Company/joblist',
	CompanyName:ApiPix +'Company/companyName',
	CompanyLogo:ApiPix +'Company/getCompanyLogo',
	getCompanyStatus:ApiPix +'Company/getCompanyStatus',
	ChangeCompanyStatus:ApiPix +'Company/ChangeCompanyStatus',
	TopCompany: ApiPix + 'Company/TopCompany',

	CompanyList:ApiPix +'Company/companyList',
	CompanyPageNum:ApiPix +'Company/companyPageCount',
	companyUncheckedList:ApiPix +'Company/companyUncheckedList',

	UserEnroll:ApiPix +'PostResume/enroll',
	PostResume:ApiPix +'PostResume/post',
	PostHistory:ApiPix +'PostResume/getPostHistory',
	BackResume:ApiPix +'PostResume/back',
	getPostList:ApiPix +'PostResume/getlist',
	ChangeStatus:ApiPix +'PostResume/changeStatus',
	getSingleResume:ApiPix +'Resume/getSingleResume',

	getCompanyPhoto:ApiPix +'Photo/getCompanyPhoto',
	ChangeCompanyPhotoStatement:ApiPix +'Photo/ChangeCompanyPhotoStatement',

	adminList: ApiPix +"Admin/getList",
	deleteAdmin:ApiPix +"Admin/delete",
	addAdmin: ApiPix +"Admin/add",
	checkAdminUsername: ApiPix +"Admin/checkAdminUsername"
};

xiaozhao_services.factory('templateName',function(){
	var templateName = {};
	var templates = {
    		  jobList      :{ name: 'jobList', url:  rootAddress  + 'partials/management/Company-management/jobList.html',CHname:"职位列表"}, 
    		  singlejob    :{ name: 'singlejob', url: rootAddress + 'partials/management/Company-management/singlejob.html',CHname:"职位详情"},
        	  createjob    :{ name: 'createjob', url: rootAddress + 'partials/management/Company-management/createjob.html',CHname:"创建职位"},
        	  resumeList   :{ name: 'resumeList',url: rootAddress + 'partials/management/Company-management/resumeList.html',CHname:"简历列表"},
        	  companyAuth  :{ name: 'companyAuth', url: rootAddress  + 'partials/management/Company-management/companyAuth.html',CHname:"企业认证"},
        	  companyPage  :{ name: 'companyPage', url: rootAddress  + 'partials/management/Company-management/companyPage.html',CHname:"企业主页"},
              companyList  :{ name: "companyList",    url: rootAddress + "partials/companylist/CompanyList.html", CHname: "企业列表"},
              StudentResume:{ name: 'StudentResume', url: rootAddress + 'partials/management/Student-management/StudentResume.html', CHname:"学生简历"},
        	  Studentsendhistory: { name: 'Studentsendhistory', url: rootAddress + 'partials/management/Student-management/Studentsendhistory.html', CHname:"投递历史"},
        	  StudentAuth:   { name: 'StudentAuth', url:rootAddress + 'partials/management/Student-management/StudentAuth.html',CHname:"学生认证"},
        	  singleResume:  { name: 'singleresume', url: rootAddress + "partials/management/Company-management/singleResume.html",CHname:"简历详情"},
        	  personalinfo :{ name: 'personalinfo', url: rootAddress + 'partials/management/Student-management/resume_personal.html',CHname:"个人信息",status:1},
        	  educationinfo:{ name: 'educationinfo', url: rootAddress + 'partials/management/Student-management/resume_educationinfo.html',CHname:"教育信息",status:1},
              personalexperience:{ name: 'personalexperience', url: rootAddress + 'partials/management/Student-management/resume_personalexperience.html',CHname:"个人经历",status:1},
              Amanagement  :{ name: 'Amanagement' , url: rootAddress + 'partials/management/admin-management/Amanagement.html',CHname:"管理员"},
              checkCompany :{ name: 'checkCompany' , url: rootAddress + 'partials/management/admin-management/checkCompany.html',CHname:"企业审核"},
              adminManage  :{ name: 'adminManage'  , url: rootAddress + 'partials/management/admin-management/adminManagement.html',CHname:"管理员管理"}
    		};

    templateName.getTemplateURL = function(name){
    	return templates[name];
    }

    return templateName;
});

xiaozhao_services.factory("StaticResource",function(){
	var StaticPic = {};
	var Resource = {
		index_page:{
			_Carousel: [{
							url:rootAddress + "img/Carousel/1.jpg",
							statement: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi lit.",
							mode:true
						},{ 
							url:rootAddress + "img/Carousel/2.jpg", 
							statement: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi lit.",
							mode:false
						},{
							url:rootAddress + "img/Carousel/3.jpg",
							statement: "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi lit.",
							mode:false
						}],
			GoodCompanyPartA: [
						  rootAddress + "img/GoodC/11.jpg",
						  rootAddress + "img/GoodC/12.jpg",
						  rootAddress + "img/GoodC/13.jpg",
						  rootAddress + "img/GoodC/14.jpg",
						  rootAddress + "img/GoodC/15.jpg",
						  rootAddress + "img/GoodC/16.jpg"
						 ],
			GoodCompanyPartB: [
						  rootAddress + "img/GoodC/21.jpg",
						  rootAddress + "img/GoodC/22.jpg",
						  rootAddress + "img/GoodC/23.jpg",
						  rootAddress + "img/GoodC/24.jpg",
						  rootAddress + "img/GoodC/25.jpg",
						  rootAddress + "img/GoodC/26.jpg"
						 ],
			header: rootAddress + "partials/static/FrontPageHeader.html",
			footer: rootAddress + "partials/static/FrontPageFooter.html",
			css: rootAddress + "css/index.css"
		},
		LR:{
			css : rootAddress + "css/LR.css",
			TopLogo: rootAddress + "img/top-logo.jpg",
			DreamLogo: rootAddress + "img/dream.png"
		},
		CompanyCtrl:{
			companyScale:["0-10人","10-50人","50-100人","100-300人","300人以上"],
			companyType:["国有企业","私人企业","外资企业"]
		},
		Smanagement:{
			footer: rootAddress + "partials/management/Managementfooter.html",
			backlogo: rootAddress + "img/studentbacklogo.jpg",
			css: rootAddress + "css/Smanagement.css"
		},
		Cmanagement:{
			footer: rootAddress + "partials/management/Managementfooter.html",
			backlogo : rootAddress + "img/backlogo.jpg",
			css: rootAddress + "css/Cmanagement.css"
		},
		Amanagement:{
			footer: rootAddress + "partials/management/Managementfooter.html",
			backlogo : rootAddress + "img/adminbacklogo.jpg",
			css: rootAddress + "css/Amanagement.css"
		},
		Cpage:{
			company_pic : rootAddress + "img/4.jpg",
			css: rootAddress + "css/Cpage.css",
			CompanyInfo:{
				name:"公司名称",
				kind:"公司类型",
				size:"公司规模",
				create_time:"注册时间"
			},
			jobRequest:{
				name:"工作名称",
				money:"薪酬范围",
				size:"招聘人数",
				location:"工作地点"
			},
			footer: rootAddress + "partials/static/FrontPageFooter.html",
			header: rootAddress + "partials/static/FrontPageHeader.html"
		},
		Managermentfooter:{
			css: rootAddress + "css/footer.css"
		},
		createJob:{
			money:["5000-8000元","8000-10000元","10000-15000元"]
		},
		CompanyInfo:{
			companyScale:["0-10人","10-50人","50-100人","100-300人","300人以上"],
			companyType:["国有企业","私人企业","外资企业"]
		},
		singlejob:{
			items:{
				name:"工作名称",
				money:"薪酬范围",
				size:"招聘人数",
				location:"工作地点",
				statement:"企业说明"
			},
			money:["5000-8000元","8000-10000元","10000-15000元"],
			wordList :['name','size','location']
		},
		historyRecord:{
			status:{
				0:"投递成功",
				1:"已查阅"
			}
		},
		resumeList:{
			studentInfo:{
				name:"学生姓名",
				sex:"性别",
				birth:"出生日期",
				certification:"证件号",
				location:"所在地",
				email:"电子邮箱",
				phone:"联系电话"
			},
			loading:rootAddress + "img/loading.gif"
		},
		PersonalExperience:{
			ExpType:["项目经历","实习经历","在校奖励","任职经历"]
		},
		companyList:{
			css: rootAddress + "css/companyList.css",
			img: rootAddress + "img/4.jpg",
			wx:  rootAddress + "img/wx.jpg",
			footer: rootAddress + "partials/static/FrontPageFooter.html",
			header: rootAddress + "partials/static/FrontPageHeader.html"
		},
		companyDetail:{
			words:
			[
				{CH:"公司名称",EN:"name"},
				{CH:"公司规模",EN:"size"},
				{CH:"公司联系人",EN:"connectman"},
				{CH:"公司联系方式",EN:"connect"},
				{CH:"公司性质",EN:"kind"}
			]
		},
		newsList:{
			css: rootAddress + "css/newsList.css",
			footer: rootAddress + "partials/static/FrontPageFooter.html",
			header: rootAddress + "partials/static/FrontPageHeader.html"
		},
		about:{
			css: rootAddress + "css/about.css",
			we: rootAddress + "img/we.jpg",
			footer: rootAddress + "partials/static/FrontPageFooter.html",
			header: rootAddress + "partials/static/FrontPageHeader.html"
		},
		FrontPageHeader:{
			TopLogo: rootAddress + "img/top-logo.jpg",
			WX: rootAddress + "img/wx.jpg",
			css: rootAddress + "css/FrontPageHeader.css"
		},
		FrontPageFooter:{
			LogoMini: rootAddress + "img/logo_mini.png",
			WX: rootAddress + "img/wx.jpg",
			css: rootAddress + "css/FrontPageFooter.css"
		},
		Job:{
			footer: rootAddress + "partials/static/FrontPageFooter.html",
			header: rootAddress + "partials/static/FrontPageHeader.html",
			css: rootAddress + "css/Job.css",
			img: rootAddress + "img/logo.jpg"
		},
		alertController:{
			loading:rootAddress + "img/loading.gif"
		}
	};

	StaticPic.getResourceURLs = function (templateName) {
		return Resource[templateName];
	}

	return StaticPic;
});

xiaozhao_services.factory("IndexManager",["$http",function($http){
	var IndexManager = {};

	IndexManager.UserCount = function(callback){
		$http.get(APIs['UserCount']).success(callback);
	}

	return IndexManager;
}]);

xiaozhao_services.factory("StudentResumeParts",function(){
	var StudentResumeParts = {};

	StudentResumeParts.getResumePartName = function(){
		return  {
			"personalinfo":"个人信息",
			"educationinfo":"教育信息",
			"personalexperience":"个人经历"
		};
	};

	return StudentResumeParts;
});

xiaozhao_services.factory("StudentResumeManager",["$http",function($http){
	var StudentResumeManager = {};

	StudentResumeManager.getStudentBasicInfo = function(callback){
		$http.post(APIs['StudentBasicInfo'],{
			'part':1
		}).success(callback);
	}

	StudentResumeManager.getGP = function(callback){
		$http.post(APIs['getGP']).success(callback);
	}

	StudentResumeManager.getStudentName = function(sid,callback){
		$http.post(APIs['getStudentName'],{
			'sid':sid
		}).success(callback);
	}

	StudentResumeManager.updateStudentBasicInfo = function(student,callback){
		$http.post(APIs['UpdateResumeBasicInfo'],student).success(callback);
	}

	StudentResumeManager.getExpList = function(callback){
		$http.post(APIs['PersonalExp'],{
			'part':3
		}).success(callback);
	};

	StudentResumeManager.addPersonalExp = function(Exp,callback){
		$http.post(APIs['AddPersonalExp'],Exp).success(callback);
	}

	StudentResumeManager.deletePersonalExp = function(pid,callback){
		$http.post(APIs['DeletePersonalExp'],{
			'pid':pid
		}).success(callback);
	}

	StudentResumeManager.changePersonalExp = function(Exp,callback){
		$http.post(APIs['ChangePersonalExp'],Exp).success(callback);
	}

	StudentResumeManager.getEducationList = function(callback){
		$http.post(APIs['PersonalExp'],{
			'part':2
		}).success(callback);
	}

	StudentResumeManager.addEducationExp = function(EduExp,callback){
		$http.post(APIs['AddEducationExp'],EduExp).success(callback);
	}

	StudentResumeManager.deleteEducationExp = function(eid,callback){
		$http.post(APIs['DeleteEducationExp'],{
			'eid':eid
		}).success(callback);
	}

	StudentResumeManager.changeEducationExp = function(EduExp,callback){
		$http.post(APIs['ChangeEducationExp'],EduExp).success(callback);
	}

	
	StudentResumeManager.getStudentAvtor = function(sid,callback){
		$http.post(APIs['getStudentAvtor'],{
			'sid':sid
		}).success(callback);
	}

	StudentResumeManager.getTypeCodeCH = function(name){
		return staticDic[name];
	}

	return StudentResumeManager;
}]);


xiaozhao_services.factory("ResumePostManager",["$http",function($http){
	var ResumePostManager = {};

	ResumePostManager.getHistoryRecord = function(callback){
		$http.post(APIs['PostHistory']).success(callback);
	}

	ResumePostManager.PostResume = function(jid,callback){
		$http.post(APIs['PostResume'],{
			'jid':jid
		}).success(callback);
	}
	
	ResumePostManager.BackResume = function(rid,callback){
		$http.post(APIs['BackResume'],{
			'rid':rid
		}).success(callback);
	}

	ResumePostManager.PostList = function(callback){
		$http.post(APIs['getPostList']).success(callback);
	}

	ResumePostManager.getSingleResume = function(sid,part,callback){
		$http.post(APIs['getSingleResume'],{
			'sid':sid,
			'part':part
		}).success(callback);
	}

	ResumePostManager.ChangeStatus = function(rid,status){
		$http.post(APIs['ChangeStatus'],{
			'status':status,
			'rid':rid
		});
	}

	return ResumePostManager;
}]);


xiaozhao_services.factory('JobData',['$http',function($http) {
	var JobData = {} ;

	JobData.getJobList = function(page,callback){
		$http.post(APIs['JobList'],{
			'pageindex':page
		}).success(callback);
	};

	JobData.TopJob = function(callback){
		$http.get(APIs['TopJob']).success(callback);
	}

	JobData.getPageNum = function(callback){
		$http.get(APIs['JobCount']).success(callback);
	};

	JobData.getSingleJob = function(jid,callback){
		$http.post(APIs['SingleJob'],{
			'jid':jid
		}).success(callback);
	};

	JobData.createSingleJob = function(job,callback){
		$http.post(APIs['CreateJob'],{
			'name':job.name,
			'money':job.money,
			'size':job.size,
			'location':job.location,
			'statement':job.statement
		}).success(callback);
	}

	JobData.deleteSinglejob = function(jid,callback){
		$http.post(APIs['deleteSinglejob'],{
			"jid":jid
		}).success(callback);
	}

	JobData.changeJobInfo = function(job,callback){
		$http.post(APIs['changeJobInfo'],job).success(callback);
	}

	return JobData;
}]);

xiaozhao_services.factory('AdminManager',['$http',function($http){
	var AdminManager = {};

	AdminManager.getList = function(callback){
		$http.post(APIs['adminList']).success(callback);
	}
	
	AdminManager._delete = function(aid,callback){
		$http.post(APIs['deleteAdmin'],{
			"aid":aid
		}).success(callback);
	}

	AdminManager.addAdmin = function(admin,callback){
		$http.post(APIs['addAdmin'],admin).success(callback);
	}

	AdminManager.checkAdminUsername = function(username,callback){
		$http.post(APIs['checkAdminUsername'],{
			"username":username
		}).success(callback);
	}

	return AdminManager;
}]);

xiaozhao_services.factory('UserManager',['$http',function($http){
	var UserManager = {};

	UserManager.login = function(user,callback){
		$http.post(APIs['UserLogin'],{
			'username':user.username,
			'password':user.password
		}).success(callback);
	}

	UserManager.logoff = function(callback){
		$http.post(APIs['UserLogoff']).success(callback);
	}

	UserManager.enroll = function(callback){
		$http.post(APIs['UserEnroll']).success(callback);
	}

	UserManager.CheckCompanyUsername = function(username,callback){
		$http.post(APIs['CompanyUserNameCheck'],{
			'username':username
		}).success(callback);
	}

	UserManager.CompanyRegister = function(company,callback){
		$http.post(APIs['CompanyRegister'],{
			'username':company.username,
			'password':company.password,
			'name':company.name,
			'kind':company.type,
			'size':company.scale,
			'connect':company.connect,
			'connectman':company.connectman
		}).success(callback);
	}

	UserManager.StudentRegister = function(student,callback){
		$http.post(APIs['StudentRegister'],{
			'username':student.username,
			'password':student.password
		}).success(callback);
	}

	UserManager.CheckStudentUsername = function(username,callback){
		$http.post(APIs['StudentUserNameCheck'],{
			'username':username
		}).success(callback);
	}

	return UserManager;
}]);

xiaozhao_services.factory('PhotoManager',['$http',function($http){
	var PhotoManager = {};

	PhotoManager.getCompanyPhoto = function(cid,callback){
		$http.post(APIs['getCompanyPhoto'],{
			"cid":cid
		}).success(callback);
	}

	PhotoManager.ChangeCompanyPhotoStatement = function(cpid,statement,callback){
		$http.post(APIs['ChangeCompanyPhotoStatement'],{
			"cpid":cpid,
			"statement":statement
		}).success(callback);
	}

	return PhotoManager;
}]);

xiaozhao_services.factory('CompanyInfo',['$http',function($http){
	var CompanyInfo = {};

	CompanyInfo.CompanyChange = function(company,callback){
		$http.post(APIs['CompanyChange'],company).success(callback);
	}

	CompanyInfo.CompanyBasicInfo = function(cid,callback){
		$http.post(APIs['CompanyBasicInfo'],{
			'cid':cid
		}).success(callback);
	}

	CompanyInfo.CompanyJoblist = function(cid,callback){
		$http.post(APIs['CompanyJoblist'],{
			'cid':cid
		}).success(callback);
	}

	CompanyInfo.getCompanyName = function(callback){
		$http.get(APIs['CompanyName']).success(callback);
	}
	
	CompanyInfo.getCompanyLogo = function(cid,callback){
		$http.post(APIs['CompanyLogo'],{
			"cid":cid
		}).success(callback);
	}

	CompanyInfo.TopCompany = function(callback){
		$http.get(APIs['TopCompany']).success(callback);
	}

	CompanyInfo.CompanyList = function(page,callback){
		$http.post(APIs['CompanyList'],{
			'pageindex':page
		}).success(callback);
	}

	CompanyInfo.CompanyPageNum = function(callback){
		$http.post(APIs['CompanyPageNum']).success(callback);
	}
	
	
	CompanyInfo.getCompanyStatus = function(cid,callback){
		$http.post(APIs['getCompanyStatus'],{
			"cid":cid
		}).success(callback);
	}

	CompanyInfo.ChangeCompanyStatus = function(cid,status,callback){
		$http.post(APIs['ChangeCompanyStatus'],{
			"cid":cid,
			"status":status
		}).success(callback);
	}
	
	CompanyInfo.companyUncheckedList = function(callback){
		$http.post(APIs['companyUncheckedList']).success(callback);
	}

	return CompanyInfo;
}]);

xiaozhao_services.factory('PassData',function(){
	return {
		JID:0
	};
});
