'use strict';

/* Directives */


var xiaozhao_directives = angular.module('myApp.directives', []);
						 

xiaozhao_directives.directive('appVersion', ['version', function(version) {
						    	return function(scope, elm, attrs) {
						      		elm.text(version);
						    	};
						  	}]);


var $defer, loaded = false;

xiaozhao_directives.directive('makesure',[function(){
        return {
            link:function (scope, element, attrs){
                function openModel(){
                    var model = angular.element('#myModal');
                    var controller = model.controller();
                    controller.setAttrs(attrs['jid'],attrs['name']);
                    model.modal('show');
                }
                element.bind('click', openModel);
            }
        };
}]);

xiaozhao_directives.directive('detail',[function(){
        return {
            link:function (scope, element, attrs){
                function openModel(){
                    var model = angular.element('#Detail');
                    var controller = model.controller();
                    var ID = scope.getID();
                    if(ID == -1){
                        return;
                    }
                    controller.loadCompany(ID);
                    model.modal('show');
                }
                element.bind('click', openModel);
            }
        };
}]);

xiaozhao_directives.directive('nailthumb',[function(){
    return {
        link:function (scope,element,attrs){
            element.nailthumb();
        }
    };
}]);

xiaozhao_directives.directive('showbigpicture',[function(){
    return {
        link:function (scope,element,attrs){
            function open(){
                var model = angular.element("#myModal");
                var controller = model.controller();
                controller.setPhoto(attrs['imgsrc']);
                model.modal('show');
            }
            element.bind('click', open);
        }
    };
}]);

xiaozhao_directives.directive('close',[function(){
        return {
            link:function (scope, element, attrs){
                function openModel(){
                    var model = angular.element("#education-body");
                    model.collapse('hide');

                    var model1 = angular.element("#personalExp-body");
                    model1.collapse('hide');
                }
                element.bind('click', openModel);
            }
        };
}]);

xiaozhao_directives.directive('hoverpulse',[function(){
        return {
            link:function (scope, element, attrs){
                element.hoverpulse();
            }
        };
}]);


xiaozhao_directives.directive('uploadfile',['$timeout',function($timeout){
        return {
            link:function (scope, element, attrs){
                function upload(){
                    var frameName = 'upload_frame_';
                    var iframe = angular.element('<iframe style="position:absolute;top:-9999px" />').attr('name', frameName);
                    var form = angular.element('<form method="post" style="display:none;" enctype="multipart/form-data" />').attr('name', 'form_' + frameName);
                    form.attr("target", frameName).attr('action', attrs['url']);
                    var formHtml = '<input type="file" name="photo" onchange="onchoosefile(this)">';
                    var fun = "<script>function onchoosefile(dom) {var form = angular.element(dom).parent();form.submit();}</script>";
                    form.append(formHtml);
                    form.append(fun);
                    iframe.appendTo(attrs['element']);
                    form.appendTo(attrs['element']);
                    iframe.load(function() {
                        var contents = angular.element(this).contents().get(0);
                        var data = angular.element(contents).find('body').text();
                        //data = window.eval('(' + data + ')');
                        scope.UpdateFinished(data);
                        $timeout(function() {
                            iframe.remove();
                            form.remove();
                        }, 5000);
                    });
                    // 文件框
                    var fileInput = angular.element('input[type=file][name=photo]', form);
                    fileInput.click();
                }
                angular.element("#uploadBtn").bind('click',upload);
            }
        };
}]);       

xiaozhao_directives.directive('open',[function(){
        return {
            link:function (scope, element, attrs){
                function open(){
                    var model = angular.element(attrs['target']);
                    model.collapse('show');
                    scope.readEduInfo();
                }
                element.bind('click', open);
            }
        };
}]);

xiaozhao_directives.directive('shut',[function(){
        return {
            link:function (scope, element, attrs){
                function closeModel(){
                    var model = angular.element(attrs['shutelement']);
                    model.modal('hide');
                }
                element.bind('click', closeModel);
            }
        };
}]);

xiaozhao_directives.directive('deleted',[function(){
        return {
            link:function (scope, element, attrs){
                function closeModel(){
                    var model = angular.element('#myModal');
                    model.modal('hide');
                    var controller = model.controller();
                    controller._delete();

                }
                element.bind('click', closeModel);
            }
        };
}]);

xiaozhao_directives.directive('ckeditor', ['$timeout', '$q', function ($timeout, $q) {
    'use strict';

    return {
        restrict: 'AC',
        require: 'ngModel',
        scope: false,
        link: function (scope, element, attrs, ngModel) {
            var EMPTY_HTML = '<p></p>',
                isTextarea = element[0].tagName.toLowerCase() == 'textarea',
                data = [],
                isReady = false;

            if (!isTextarea) {
                element.attr('contenteditable', true);
            }

            var onLoad = function () {
                var options = {
                    toolbar: 'full',
                    toolbar_full: [
                        { name: 'basicstyles',
                            items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
                        { name: 'paragraph', items: [ 'BulletedList', 'NumberedList', 'Blockquote' ] },
                        { name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
                        { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
                        { name: 'tools', items: [ 'SpellChecker', 'Maximize' ] },
                        '/',
                        { name: 'styles', items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat' ] },
                        { name: 'insert', items: [ 'Image', 'Table', 'SpecialChar' ] },
                        { name: 'forms', items: [ 'Outdent', 'Indent' ] },
                        { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                        { name: 'document', items: [ 'PageBreak', 'Source' ] }
                    ],
                    disableNativeSpellChecker: false,
                    uiColor: '#FAFAFA',
                    height: '400px',
                    width: '100%'
                };
                options = angular.extend(options, scope[attrs.ckeditor]);

                var instance = (isTextarea) ? CKEDITOR.replace(element[0], options) : CKEDITOR.inline(element[0], options),
                    configLoaderDef = $q.defer();

                element.bind('$destroy', function () {
                    instance.destroy(
                        false //If the instance is replacing a DOM element, this parameter indicates whether or not to update the element with the instance contents.
                    );
                });
                var setModelData = function() {
                    var data = instance.getData();
                    if (data == EMPTY_HTML) {
                        data = null;
                    }
                    $timeout(function () { // for key up event
                        ngModel.$setViewValue(data);
                    }, 0);
                }, onUpdateModelData = function() {
                    if (!data.length) { return; }

                    var item = data.pop() || EMPTY_HTML;
                    isReady = false;
                    instance.setData(item, function () {
                        setModelData();
                        isReady = true;
                    });
                }

                instance.on('pasteState',   setModelData);
                instance.on('change',       setModelData);
                instance.on('blur',         setModelData);
                instance.on('key',          setModelData); // for source view

                instance.on('instanceReady', function() {
                    scope.$apply(function() {
                        onUpdateModelData()
                    });
                });
                instance.on('customConfigLoaded', function() {
                    configLoaderDef.resolve();
                });

                ngModel.$render = function() {
                    if (ngModel.$viewValue === undefined) {
                        ngModel.$setViewValue(null);
                        ngModel.$viewValue = null;
                    }

                    data.push(ngModel.$viewValue);
                    if (isReady) {
                        onUpdateModelData();
                    }
                };
            };

            if (CKEDITOR.status == 'loaded') {
                loaded = true;
            }
            if (loaded) {
                onLoad();
            } else {
                $defer.promise.then(onLoad);
            }
        }
    };
}]);

