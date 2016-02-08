/**
 * Created by VladHome on 1/7/2016.
 */
(function(){
    var app = angular.module('RoutingApp',['ngRoute']);
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider
            .when('/',{
                controller:'HomeController',
              //  controllerAs:'home2',
                templateUrl:'htms/home.html'
            })
            .when('/Puzzle',{
                //controller:'HomeController',
                //  controllerAs:'home2',
                templateUrl:'js/videopuzzle/videopuzzle.htm'
            })
    }])
}())