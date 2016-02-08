/// <reference path="libs/typings/angular.d.ts" />
/// <reference path="libs/typings/angular-route.d.ts" />
var mainapp;
(function (mainapp) {
    "use strict";
    var app = angular.module("mainapp", ["ngRoute"]);
    app.controller('HomeController', ['$scope', function ($scope) {
            // console.log($scope);
            $scope.name = 'Hola!';
        }]);
    app.controller('Navcontroller', ['$scope', '$element', function ($scope, $element) {
            $scope.$on('$locationChangeSuccess', function (evt, next, current) {
                //  console.log(next,current);
                var h = window.location.hash;
                console.log(h);
                $element.children().each(function (i, el) {
                    // console.log(el,i);
                    if (el.getAttribute('href') == h)
                        el.classList.add('btn-primary');
                    else
                        el.classList.remove('btn-primary');
                });
            });
            //  $scope.name = 'Hola!';
        }]);
})(mainapp || (mainapp = {}));
var mainapp;
(function (mainapp) {
    function routes($routeProvider) {
        $routeProvider
            .when('/', {
            // controller:'HomeController',
            //  controllerAs:'home2',
            templateUrl: 'htms/home.html'
        })
            .when("/ImageGallery", {
            templateUrl: "hallmark/ImageGallery4.html"
        })
            .when('/Puzzle', {
            //controller:'HomeController',
            //  controllerAs:'home2',
            templateUrl: 'js/videopuzzle/videopuzzle.htm'
        })
            .otherwise({
            redirectTo: "/Puzzle"
        });
    }
    routes.$inject = ["$routeProvider"];
    angular
        .module("mainapp")
        .config(routes);
})(mainapp || (mainapp = {}));
//var myApp = angular.module('mainapp',[]);
/*
myApp.controller('HomeController', ['$scope', function($scope) {
    $scope.nane = 'Hola!';
}]);
*/
//# sourceMappingURL=Navigation.js.map