<!DOCTYPE html>
<html lang="en">
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Admin panel">
    <meta name="author" content="ulight Vlad">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link href="css/reset.css" rel="stylesheet" type="text/css"/>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <script src="js/libs/jquery-2.1.0.min.js"> </script>'

    <script src="js/libs/require.js"> </script>
    <script>
        requirejs.config({
            paths:{
               // 'easel' :'js/libs/tweenjs-0.6.1.min',
                //'tween':'js/libs/easeljs-0.8.1.min'
            }
        });

    </script>
</head>
<body ng-app ="mainapp">
<nav ng-controller="Navcontroller">
    <a class="btn" class="active" href="#/">Home</a>
    <a class="btn" href="#/Puzzle">Puzzle</a>
    <a class="btn" href="#/ImageGallery">Image Gallery</a>
</nav>
<br/>
<section id="Content" ng-view>


</section>

<script src=" https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0-rc.0/angular.min.js"></script>
<script src="https://code.angularjs.org/1.5.0-rc.0/angular-route.min.js"></script>
<script src="js/libs/easeljs-0.8.2.min.js"></script>
<script src="js/libs/tweenjs-0.6.2.min.js"></script>
<script src="js/libs/webgl-0.8.1.min.js"></script>




<!--<script src="js/RoutingApp.js"></script>
<script src="js/HomeController.js"></script>-->
<script src="js/Navigation.js"></script>


</body>

</html>