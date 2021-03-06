
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
    "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<!-- Headers html -->

<!-- /Header html -->

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Sistema</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

<!-- codigo añadido -->
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>

    <!-- Lineas agragadas -->
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />

        <?php include '_include_heads.html'; ?>
        
    </head>
    <body ng-app="Hydroid" ng-controller="myCtrl">
        <div class="container">
            <div class="header">
                <nav>
                    <ul class="nav pull-right nav-menu">
                        <li class="blue"><a href="#" class="large-button">Home</a></li>
                        <li class="active grey"><a href="biblioteca.php" class="large-button">Biblioteca</a></li>
                    </ul>
                </nav>
                <h2 class="text-muted">Sistema Hydroid</h2>
                <h4 class="text-muted" style="padding-left: 90px;">Mar Dinámica</h4>
            </div>

            <div class="row">
                <div class="col-md-3 ng-cloak" style="margin-top: 55px; z-index: 3;">
                        <div class="alert active col-sm-6 col-md-12" style="border: 1px solid #444;">
                            <h3 style="margin-top: 0px;">Luces <a class="btn btn-primary" ng-click="changeLights()">{{light}}</a></h3>
                            <div>
                                <a style="margin: 0px 3px; padding: 5px 12px; border-radius: 50%; border: 1px solid #fff;" ng-class="{'btn-default': light > 0}"></a>
                                <a style="margin: 0px 3px; padding: 5px 12px; border-radius: 50%; border: 1px solid #fff;" ng-class="{'btn-default': light > 1}"></a>
                                <a style="margin: 0px 3px; padding: 5px 12px; border-radius: 50%; border: 1px solid #fff;" ng-class="{'btn-default': light > 2}"></a>
                            </div>
                        </div>
                        <div class="alert active col-sm-6 col-md-12" ng-show="!error" style="border: 1px solid #444;">
                            <h3 style="margin-top: 0px;">Indicadores</h3>
                            <table>
                                <tr><td>Temperatura </td><td>: {{temperatura}}</td></tr>
                                <tr><td>Brújula</td><td>: {{brujula}}</td></tr>
                                <tr><td>Presión</td><td>: {{presion}}</td></tr>
                            </table>
                        </div>
                        <div class="alert active col-xs-12 alert-danger" ng-show="error">
                            Error: {{error}}
                        </div>
                </div>
                <div class="col-md-9">
                    <div id="container">
                        <div id="status">
                            <ul>
                                <li id="statusConnection" class="grey">No Conectado</li>
                                <li id="statusStream" class="red" style="display:none;">Grabando</li>
                            </ul>
                        </div>
                        <!--contenerdor de Streaming -->
                        <div id="stream_container" class="player-container grey">
                            <div id="prontusPlayer"></div>
                        </div>
                        <!-- ./Contenedor de Streaming -->
                        <button id="recButton" type="button" class="btn btn-danger btn-lg pull-right" style="display:none;">
                            <span class="glyphicon glyphicon-record" aria-hidden="true"></span>
                            Iniciar grabación
                        </button>
                        <button id="stopButton" type="button" class="btn btn-danger btn-lg pull-right" style="display:none;">
                            <span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
                            Detener grabación
                        </button>
                        <button id="hourButton" type="button" class="btn btn-danger btn-lg pull-right" disabled style="display:none;">
                            <span class="glyphicon glyphicon-hourglass" aria-hidden="true"></span>
                            Procesando...
                        </button>
                    </div>
                </div>
            <!-- agregado sensor -->
			<div id="Medidores" ></div>

            </div>

            <footer class="footer">
                <p style="text-align: right;">Mardinamica © Company 2015</p>
            </footer>
        </div>
        <div class="container Datos"></div>
        
        <script>
            $(document).ready(function () {
                mainStream.init();
            });
        </script>

        <script>
        var app = angular.module('Hydroid', []);
        app.controller('myCtrl', function($scope, $http, $sce) {

            $scope.inRequest = false;
            $scope.sourceURL = 'add.php';
            $scope.lightsURL = 'lights.php';
            $scope.light     = 0;

            $scope.myTimer = function(){
                $http.get($sce.trustAsResourceUrl($scope.sourceURL))
                .then(function(response) {
                    if(response.data){
                        if (response.data.error){
                            $scope.error = response.data.error;
                        }else{
                            $scope.error        = undefined;
                            $scope.temperatura  = response.data.temperatura;
                            $scope.presion      = response.data.presion;
                            $scope.brujula      = response.data.brujula;
                        }
                    }else{
                            $scope.error        = 'No hay valores en la base de datos!';
                            $scope.temperatura  = null;
                            $scope.presion      = null;
                            $scope.brujula      = null;
                    }
                }, function(response) {
                    $scope.error = "Error de conexión";
                });
            };
            setInterval($scope.myTimer, 500);


            $scope.changeLights = function(){
                $scope.light = $scope.light >= 3? 0: $scope.light+1;
                $http.get($sce.trustAsResourceUrl($scope.lightsURL+'?LED='+$scope.light))
                .then(function(response) {
                    console.log(response.data);
                }, function(response) {
                    console.log("Error de conexión");
                });
            };


        });
        </script>


    </body>
</html>
