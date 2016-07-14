angular.module("MathQuillDirective", [])
    .directive("mathScope", function(){
	return {
	    restrict: "E",
	    transclude: true,
	    scope: {},
	    controller:["$scope", function($scope) {
		this.getLatex = $scope.getLatex = function() {
		    if ($scope.field)
			return $scope.field.latex();
		    return "";
		};
		$scope.setLatex = function(text) {
		    if ($scope.field)
			$scope.field.latex(text);
		};
		this.setField = function(field) {
		    $scope.field = field;
		};
		this.keystroke = function(stroke) {
		    $scope.field.keystroke(stroke);
		}
		this.write = $scope.write = function(write) {
		    this.inProc = true;
		    if ($scope.field)
			$scope.field.write(write);
		    this.inProc = false;
		};
		this.MQ = $scope.MQ = MathQuill.getInterface(2);
		this.focus = $scope.focus = function(){
		    console.log("focus");
		    $scope.field.focus();
		};
	    }],
	    template: "<ng-transclude></ng-transclude>"
	};
    })
    .directive("mathField", function() {
	return {
	    restrict: "E",
	    require: "^^mathScope",
	    controller: ["$scope", function($scope) {

	    }],
	    template: "<span class='math-field'></span>",
	    link: function(scope, element, attrs, scopeCtrl) {
		console.log(element.children(".math-field"));
		console.log(scopeCtrl);
		console.log(scope.$parent.MQ);
		var field = scopeCtrl.MQ.MathField(
		    element.children(".math-field")[0], {
			handlers:{
			    edit: function() {
				if (!scopeCtrl.inProc)
				    scope.$digest();
			    }
			}
		    });
		scopeCtrl.setField(field);
	    }
	};
    })
    .directive("mathButton", function() {
	return {
	    restrict: "E",
	    require: "^^mathScope",
	    scope: {},
	    controller: ["$scope", function($scope) {
	    }],
	    template: "<button ng-click='insert()'><span></span></button>",
	    link: function(scope, element, attrs, scopeCtrl){
		var span = element.find("span");
		span.text(attrs.latex);
		console.log(span);
		scopeCtrl.MQ.StaticMath(span[0]);
		scope.insert = function (){
		    scopeCtrl.write(attrs.write);
		    scopeCtrl.focus();
		    if ("movement" in attrs){
			var mov = attrs.movement;
			for (var i = 0; i < mov.length; i ++)
			    switch (mov[i]){
			    case 'L':
				scopeCtrl.keystroke("Left");
				break;
			    case 'R':
				scopeCtrl.keystroke("Right");
				break;
			    case 'U':
				scopeCtrl.keystroke("Up");
				break;
			    case 'D':
				scopeCtrl.keystroke("Down");
			    }
		    }
		}
	    }
	};
    })
    .directive("latexField", function() {
	return {
	    restrict: "E",
	    require: "^^mathScope",
	    template: "<span ng-bind='getLatex()'></span>",
	    controller: ["$scope", function($scope) {
		console.log($scope);
	    }],
	    link: function(scope, element, attrs, scopeCtrl){
		console.log(scope.$parent.getLatex);
		scope.getLatex = function(){
		    return scopeCtrl.getLatex();
		};
	    }
	};
    });
