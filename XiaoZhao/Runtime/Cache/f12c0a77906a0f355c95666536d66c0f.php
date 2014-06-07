<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cn" xmlns:ng="http://angularjs.org">
<head>
  <meta charset="utf-8">
  <title>壹校招</title>
  
  <link href="http://libs.baidu.com/bootstrap/2.3.2/css/bootstrap.min.css" rel="stylesheet">
  <link href="__ROOT__/Common/css/alert.css" rel="stylesheet" media="screen">
  <link href="__ROOT__/Common/css/ng-quick-date.css" rel="stylesheet" media="screen">
  <link href="__ROOT__/Common/css/ng-quick-date-default-theme.css" rel="stylesheet" media="screen">
  <link href="__ROOT__/Common/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="__ROOT__/Common/css/jquery.nailthumb.css" rel="stylesheet">
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>
</head>
<body id="ng-app" ng-app="myApp" class="ng-app:myApp">

  <div ng-view></div>

  <div id="tipsShow" class="alert alert-info tips" ng-show="TipsShow" ng-controller="alertController">
      <span ng-show="loading"><img ng-src={{ResourceURLs.loading}} /></span>
      <p class="text-center"><strong>{{changeResult}}</strong></p>
  </div>

  <div id="loadingBar" class="loadingCSS">
      <div class="row-fluid">
        <div class="span8">
          <img src="Common/img/logo.png">
        </div>
        <div class="span4">
          <img src="Common/img/loading.gif" />
        </div>
      </div>
  </div>

  <script>
    $("#tipsShow").hide();
    $("#loadingBar").show();
    $( document ).ready(function() {
        $("#tipsShow").show();
        $("#loadingBar").hide();
    });
  </script>

  <script src="http://libs.baidu.com/bootstrap/2.3.2/js/bootstrap.min.js"></script>
  <script src="__ROOT__/Common/lib/html5.js"></script>
  <script src=" http://libs.baidu.com/json/json2/json2.js"></script>
  <script src="__ROOT__/Common/lib/angular-file-upload-shim.min.js"></script> 
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular.min.js"></script>
  <script src="__ROOT__/Common/lib/angular-file-upload.min.js"></script> 
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular-route.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular-sanitize.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular-cookies.min.js"></script>
  <script src="__ROOT__/Common/lib/ckeditor/ckeditor.js"></script>
  <script src="__ROOT__/Common/lib/ckeditor/ng-ckeditor.js"></script>
  <script src="__ROOT__/Common/lib/ng-quick-date.min.js"></script>
  <script src="__ROOT__/Common/lib/jquery.nailthumb.js"></script>
  <script src="__ROOT__/Common/lib/hoverpulse.js"></script>
  <script src="__ROOT__/Common/js/app.js"></script>
  <script src="__ROOT__/Common/js/services.js"></script>
  <script src="__ROOT__/Common/js/controllers/LoginAndRegisterControllers.js"></script>
  <script src="__ROOT__/Common/js/controllers/CmanagementControllers.js"></script>
  <script src="__ROOT__/Common/js/controllers/SmanagementControllers.js"></script>
  <script src="__ROOT__/Common/js/controllers/AmanagementControllers.js"></script>
  <script src="__ROOT__/Common/js/controllers/IndexPageControllers.js"></script>
  <script src="__ROOT__/Common/js/filters.js"></script>
  <script src="__ROOT__/Common/js/directives.js"></script>
</body>
</html>