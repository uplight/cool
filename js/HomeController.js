/**
 * Created by VladHome on 1/7/2016.
 */
(function () {

    angular.module('RoutingApp')
       // .controller('HomeController', ['dataService', 'notifier', '$route', '$log', HomeController]);
    .controller('HomeController', ['$scope','$route', '$log', HomeController]);

    function HomeController($scope,$route, $log) {
        var vm = this;



        $scope.name = 'Welcome to School'

        vm.message = 'Welcome to School Buddy!';
        vm.refresh = function() {
            $log.debug($route.current);
            $log.debug($route.routes);
            $route.reload();
        };

     /*   dataService.getAllSchools()
            .then(function(schools) {
                vm.allSchools = schools;
                vm.schoolCount = schools.length;
            })
            .catch(showError);

        dataService.getAllClassrooms()
            .then(function(classrooms) {
                vm.allClassrooms = classrooms;
                vm.classroomCount = classrooms.length;
            })
            .catch(showError);

        dataService.getAllActivities()
            .then(function(activities) {
                vm.allActivities = activities;
                vm.activityCount = activities.length;
            })
            .catch(showError);

        function showError(message) {
            notifier.error(message);
        }
*/
    }

}());